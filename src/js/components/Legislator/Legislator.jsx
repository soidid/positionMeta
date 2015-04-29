/** @jsx React.DOM */

var React = require('react/addons');
require('./Legislator.css');

var Legislator = React.createClass({
  
  render () {
    var {data} = this.props;
    var imgURL;

    try {
      imgURL = require("./images/avatar/"+data+".png");
    }catch(e){
      imgURL = require("./images/default.jpg");
    }
  
    return (
      <div className="Legislator">
          <img className="Legislator-avatar"
               src={imgURL} />
          <div className="Legislator-name">{data}</div>
      </div>
          
    );
  }
});

module.exports = Legislator;


