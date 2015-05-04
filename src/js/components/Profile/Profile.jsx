/** @jsx React.DOM */
var React = require('react/addons');
var Legislator = require('../Legislator/Legislator.jsx');
var FactsCard = require('../FactsCard/FactsCard.jsx');


require('./Profile.css');

function getName() {

    var hash = window.location.hash.substring(1); // remove #
    var query = hash.split("?")[1];
    return query.split("=")[1];
}

var Profile = React.createClass({
  
   getInitialState(){
    return {
    }
  },
  render () {
    var name = getName();
    
    
    var data = this.props.data[name];
    var issueMenu = [
        {
          "name":"罷免",
          "count" : 4
        },
        {
          "name":"食安",
          "count" : 12
        },
        {
          "name":"勞基法",
          "count" : 7
        },
        {
          "name":"監督條例",
          "count" : 4
        },
        {
          "name":"婚姻平權",
          "count" : 1
        },
        {
          "name":"核能",
          "count" : 24
        },
        {
          "name":"兩稅合一",
          "count" : 1
        },
        {
          "name":"居住正義",
          "count" : 4
        },
        {
          "name":"政治獻金",
          "count" : 10
        },
        {
          "name":"課綱微調",
          "count" : 1
        },
        {
          "name":"中國因素",
          "count" : 8
        }
    ];


    var sameSexMarrige = {
        "name" : "食品安全",
        "facts" : [
            {
              "title":"儘速修法將同性婚姻合法化",
              "opinion": "贊成",
              "opinionCount": 12
            },
            {
              "title":"是否自設實驗室",
              "opinion": "反對",
              "opinionCount": 2
            },
            {
              "title":"是否分廠分照",
              "opinion": "反對",
              "opinionCount": 7
            },
            {
              "title":"是否訂立吹哨者條款",
              "opinion": "反對",
              "opinionCount": 8
            },
            {
              "title":"電子發票",
              "opinion": "贊成",
              "opinionCount": 8
            }
            ,
            {
              "title":"是否提高罰鍰",
              "opinion": "贊成",
              "opinionCount": 12
            }
        ]
    };

    return (
      <div className="Profile">
          <Legislator data="尤美女" />

          <FactsCard menu={issueMenu}
                     data={sameSexMarrige}/>
         
      </div>
          
    );
  }
});

module.exports = Profile;


