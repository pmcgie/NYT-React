import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../../utils/API";

class Main extends Component {
    state = {
        topic:"",
        yearStart: "",
        yearEnd: "",
        articles: [],
        saved: []
    };

    componentDidMount() {
        this.getSavedArticles()
    }

    // Get all Saved Articles from MongoDB
    getSavedArticles = () => {
        API.getSavedArticles()
          .then((res) => {
              this.setState({saved: res.data})
          });
    }

    // All queried API Articles with Data & Format
    renderArticles = () => {
        return this.state.articles.map(article => (
            // <Results
            //     _id={article._id}
            //     key={article._id}
            //     title={article.headline.main}
            //     date={article.pub_date}
            //     url={article.web_url}
            //     handleSaveButton={this.handleSaveButton}
            //     getSavedArticles={this.getSavedArticles}
            // />
        ))
    }

    // All Saved Articles with Data & Format
    renderSaved = () => {
        return this.state.saved.map(save => (
            <Saved
            _id={save._id}
            key={save._id}
            title={save.title}
            date={save.date}
            url={save.url}
            handleDeleteButton={this.handleDeleteButton}
            getSavedArticles={this.getSavedArticles}
            />
        ))
    }


    handleTopicChange = (event) => {
        this.setState({topic: event.target.value})
    }

    // Start Year Entry
    handYearStartChange = (event) => {
        this.setState({yearStart: event.target.value})
    }

    // End Year Entry
    handleYearEndChange = (event) => {
        this.setState({yearEnd: event.target.value})
    }

    // Upon submission API NYT Query
    handleFormSubmit = (event) => {
        event.preventDefault()
        API.getArticles(this.state.topic, this.yearStart,this.state.yearEnd)
            .then((res) => {
                this.setState({articles: res.data.response.docs});
        })
    }

    // Saved article's button from API NYT Search
    handleSaveButton = (id) => {
        const findArticle = this.state.articles.find((element) => element._id === id);
        const newArticle = {title: findArticle.headline.main,date: findArticle.pub_date, url: findArticle.web_url};
        API.saveArticle(newArticle)
            .then(this.getSavedArticles())
    }

    // Delete specific ID upon which is selected
    handleDeleteButton = (id) => {
        API.deleteArticle(id)
            .then(this.getSavedArticles())
    }


    // dInitial Page
    render() {
        return (

            <div className="jumbotron">
            <h1 className="Title"><strong>New York Times Article Search</strong></h1>
            <h2 className="Subtitle">Search for and save articles of interest.</h2>
            </div>
    
        );
    }

}

export default Main;