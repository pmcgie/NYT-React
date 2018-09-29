import React from "react";
import "./Jumbotron.css";

const Jumbotron = ({children}) => (
  <div className="jumbo">
    {children}
  </div>
);

export default Jumbotron;