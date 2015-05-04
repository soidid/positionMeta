/** @jsx React.DOM */
var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');
var React = require('react/addons');

var AppBar = require('../AppBar/AppBar.jsx');
var Records = require('../Records/Records.jsx');
var OverviewWall = require('../OverviewWall/OverviewWall.jsx');

var Profile = require('../Profile/Profile.jsx');
var Issue = require('../Issue/Issue.jsx');
var LegislatorAvatar = require('../LegislatorAvatar/LegislatorAvatar.jsx');

require('./App.css');

var hash = window.location.hash.substring(1); // remove #
if(hash.indexOf('?')!==-1){
   hash = hash.split("?")[0];
}


function getData(){
  // Change from Object to Array;
  var data = AppStore.getData();
  var legiData = Object.keys(data).map((value, key)=>{
      return data[value];
  });
  return legiData;
}
function getPosition(){
  // Change from Object to Array;
  var data = AppStore.getPosition();
  var legiData = Object.keys(data).map((value, key)=>{
      return data[value];
  });
  
  return legiData;
}
function getIndexedData(){
  // Change from Object to Array;
  var data = AppStore.getIndexedData();
 
  return data;
}

var App = React.createClass({

  getInitialState(){
    return {
      data: [],
      position: [],
      positionObj: {},
      indexedData: {},
      subIssue:"",
      subIssueTitle:""
    }
  },
  
  componentWillMount () {
      this._onChange();
      React.initializeTouchEvents(true);
  },

  componentDidMount () {
      window.addEventListener("resize", this._onSetSize);
      AppStore.addChangeListener(this._onChange);
  },
  
  componentWillUnmount () {
      window.removeEventListener("resize", this._onSetSize);
      AppStore.removeChangeListener(this._onChange);
  },
  
  _onChange (){
      this.setState({
         data: getData(),
         position: getPosition(),
         positionObj: AppStore.getPosition(),
         indexedData: getIndexedData()
      });

  },

  _onSetSubIssueTitle(value, event){
    console.log(value);
    this.setState({
      subIssueTitle: value
    });
  },


  render () {
    var { data, position, positionObj, indexedData, subIssue } = this.state;
    var issueList = ["婚姻平權","勞基法","監督條例","罷免","食品安全","兩稅合一","核能"];
    var issueListItem = issueList.map((i,k)=>{
        return (
            <a className="App-issue"
               href="index.html#issue"
               target="_blank">{i}</a>
        )
    })
    var content = (
      <div>
        {issueListItem}
      </div>);

    var head = "";

    if(hash === 'issue'){
      content = (
        <Issue subIssue={subIssue}
               subIssueTitleHander={this._onSetSubIssueTitle}/>);
    }

    if(hash === 'records'){
        content = <Records data={data} 
                           indexedData={indexedData}/>; 
    }

    if(hash === 'overview'){
        head = (
        <div className="App-header">
            <div className="App-title">立法院</div>
        </div>);
        content = <OverviewWall data={position} title={this.state.subIssueTitle}/>;
    }
      
    if(hash === 'post'){
        content = <SinglePost data={indexedData} />;
    }

    if(hash === 'profile'){
        head = "";
        content = <Profile data={positionObj} />;
    }

    return (
      <div className="App">
          <AppBar />
          <div className="App-content">
          {head}
          {content}
          </div>
      </div>
    );
  }
});

module.exports = App;


