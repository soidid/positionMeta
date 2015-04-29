/** @jsx React.DOM */

var React = require('react/addons');
require('./Icon.css');
var Icon = React.createClass({
  
  render () {
    var {
      icon,
      className,
      _handleClick } = this.props;

    return (
      <div
        className={"Icon " + className}
        onClick={_handleClick}>
        <span className={ "fa " + icon}></span>
      </div>
    );
  }
});

module.exports = Icon;


