/** @jsx React.DOM */
var React = require('react/addons');
require('./AppBar.css');

var AppBar= React.createClass({
  
   getInitialState(){
    return {
    }
  },
  render () {
    

    return (
      <div className="AppBar">
           <a className="AppBar-home"
              href="index.html">Home</a>
      </div>
          
    );
  }
});

module.exports = AppBar;


