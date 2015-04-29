/** @jsx React.DOM */

var React = require('react/addons');
require('./LegislatorAvatar.css');

var LegislatorAvatar = React.createClass({
  
  render () {
    var {data, plain} = this.props;
    var imgURL;

    try {
      imgURL = require("./images/avatar/"+data+".png");
    }catch(e){
      imgURL = require("./images/default.jpg");
    }

    var result = (
        <div className="LegislatorAvatar">
            <img className="LegislatorAvatar-avatar"
                 src={imgURL} />
            <div className="LegislatorAvatar-name">{data}</div>
        </div>);


    if(plain){

        result = (
        <div className="LegislatorAvatar">
            <img className="LegislatorAvatar-avatarPlain"
               src={imgURL} />
            <div className="LegislatorAvatar-namePlain">{data}</div>
        </div>);

    }
  
    return result;
  }
});

module.exports = LegislatorAvatar;


