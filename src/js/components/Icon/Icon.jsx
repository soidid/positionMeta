/** @jsx React.DOM */

var React = require('react/addons');
require('./Icon.css');
var Icon = React.createClass({
  
  render () {
    var {icon} = this.props;
    var imgURL = require("./images/"+icon+".svg");
    return (
      <div>
         <img src={imgURL} />
      </div>
    );
  }
});

module.exports = Icon;


