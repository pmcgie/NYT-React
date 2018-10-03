import React from "react";
import { Button } from 'reactstrap';

// Components for Search
import SearchLabels from "../../components/SearchLabels";

const Search = props =>
<div className="container">
  <div className="row">
    <div className="col-lg-12">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">
            <strong>
              Search
            </strong>
          </h3>
        </div>
        <div className="panel-body">
          <form>
            <div className="form-group">
              <SearchLabels htmlFor="topic">Topic</SearchLabels>
              <input onChange={props.handleTopicChange} type="text" className="form-control" id="topic" aria-describedby="emailHelp" />
            </div>
            <div className="form-group">
              <SearchLabels htmlFor="start-year">Start Year</SearchLabels>
              <input onChange={props.handleStartYearChange} type="text" className="form-control" id="start-year" />
            </div>
            <div className="form-group">
              <SearchLabels htmlFor="end-year">End Year</SearchLabels>
              <input onChange={props.handleEndYearChange} type="text" className="form-control" id="end-year" />
            </div>
            <Button onClick={props.handleFormSubmit} type="submit" className="btn btn-primary">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  </div>

    <br/><br/>

      <div className="row">
      <div className="col-lg-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">
              <strong>
                <i className="fa fa-newspaper-o" aria-hidden="true"></i> Results
              </strong>
            </h3>
          </div>
          <div className="panel-body">
            {props.renderArticles()}
          </div>
        </div>
      </div>
    </div>
    <br/><br/>


    <div className="panel-heading">
        <h3 className="panel-title">
          <strong>
            Saved Items
          </strong>
        </h3>
    </div>
</div>


export default Search;