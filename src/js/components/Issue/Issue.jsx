/** @jsx React.DOM */
var React = require('react/addons');
require('./Issue.css');

var LegislatorAvatar = require('../LegislatorAvatar/LegislatorAvatar.jsx');

var  Issue = React.createClass({
  
  getInitialState(){
    return {
       currentIndex: 0
    }
  },

  _onSetIndex(diff, event){
    var current = this.state.currentIndex + diff;

    if(current >= 2) current = 0;
    if(current<0) current=0;

    this.setState({
        currentIndex: current
    });

  },
  
  render () {
     var sub = ["是否自設實驗室","分廠分照","吹哨者條款","電子發票","提高罰鍰"];
    var subItem = sub.map((item,key)=>{
        var boundClick = this.props.subIssueTitleHander.bind(null, item);
        return (
          <a className="Issue-subIssueItem"
             href="#overview"
             target="_blank"
             onClick={boundClick}>
            <div className="Issue-subIssueText">{item}</div>
            <div className="Issue-relatedCount">{Math.round(88/(key+1))}</div>
          </a>
        )
    });
    

    return (
      <div className="Issue">
          
        <div className="Issue-issueTitle">食品安全</div>
        <div className="Issue-subIssueTitle">最相關的立委：</div>
        <a className="Issue-subIssueItem"
           href="index.html#profile?name=尤美女"
           target="_blank"><LegislatorAvatar data={"尤美女"}/><div className="Issue-relatedCount">123</div></a>
        <a className="Issue-subIssueItem"
           href="index.html#profile?name=王育敏"
           target="_blank"><LegislatorAvatar data={"王育敏"}/><div className="Issue-relatedCount">31</div></a>
        <a className="Issue-subIssueItem"
           href="index.html#profile?name=江惠貞"
           target="_blank"><LegislatorAvatar data={"江惠貞"}/><div className="Issue-relatedCount">22</div></a>
        <a className="Issue-subIssueItem"
           href="index.html#profile?name=蘇清泉"
           target="_blank"><LegislatorAvatar data={"蘇清泉"}/><div className="Issue-relatedCount">1</div></a>
        
        <div className="Issue-subIssueTitle">相關子議題：</div>
          {subItem}
      </div>
          
    );
  }
});

module.exports =  Issue;


