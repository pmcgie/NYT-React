import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
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

    // Initial Page
    render() {
        return (
            <Jumbotron>
              <h1 className="text-center">
                <strong>New York Times Article Scrubber</strong>
              </h1>
              <h2 className="text-center">
                Search for and save articles of interest.
              </h2>
            </Jumbotron>
        );
    }

}

export default Main;