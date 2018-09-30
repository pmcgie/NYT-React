import React, { Component } from "react";

// Components for Main
import Jumbotron from "../../components/Jumbotron";
import Footer from "../../components/Footer";

// Sections for Main
import Search from "../Search";
import Results from "../Results";
import Saved from "../Saved";

// API
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

    // Keep track of what user types into topic input so that input can be grabbed later
    handleTopicChange = (event) => {
        this.setState({ topic: event.target.value });
    }

    // Keep track of what user types into topic input so that input can be grabbed later
    handleStartYearChange = (event) => {
        this.setState({ startYear: event.target.value });
    }

    // Keep track of what user types into topic input so that input can be grabbed later
    handleEndYearChange = (event) => {
        this.setState({ endYear: event.target.value });
    }

    // When the search form submits, perform NYT api search with user input
    handleFormSubmit = (event) => {
        event.preventDefault();;
        API.getArticles(this.state.topic, this.state.startYear, this.state.endYear)
        .then((res) => {
            this.setState({ articles: res.data.response.docs });
        });
    }

    // Saved article's button from API NYT Search
    handleSaveButton = id => {
        const findArticleByID = this.state.articles.find((el) => el._id === id);
        console.log("findArticleByID: ", findArticleByID);
        const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
        API.saveArticle(newSave)
        .then(this.getSavedArticles());
    }

    // Delete specific ID upon which is selected
    handleDeleteButton = (id) => {
        API.deleteArticle(id)
            .then(this.getSavedArticles())
    }


    renderArticles = () => {
        return this.state.articles.map(article => (
          <Results
            _id={article._id}
            key={article._id}
            title={article.headline.main}
            date={article.pub_date}
            url={article.web_url}
            handleSaveButton={this.handleSaveButton}
            getSavedArticles={this.getSavedArticles}
          />
        ));
    }


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
        ));
      }

    // Initial Page
    render() {
        return (
            <div>
            <Jumbotron>
              <h1 className="text-center">
                <strong>New York Times Article Grabber</strong>
              </h1>
              <h2 className="text-center">
                Search for and save articles of interest
              </h2>
            </Jumbotron>
            <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
            />
            <div className="panel-body">
            <ul className="list-group">
                {this.renderSaved()}
            </ul>
            </div>
            <Footer></Footer>
            </div>
        );
    }

}

export default Main;