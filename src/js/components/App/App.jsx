/** @jsx React.DOM */
var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

var React = require('react/addons');
var Records = require('../Records/Records.jsx');
var OverviewWall = require('../OverviewWall/OverviewWall.jsx');
var SinglePost = require('../SinglePost/SinglePost.jsx');
var Profile = require('../Profile/Profile.jsx');

require('./App.css');

var hash = window.location.hash.substring(1); // remove #
if(hash.indexOf('?')!==-1){
   hash = hash.split("?")[0];
}
console.log(hash);

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
      indexedData: {}
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

  render () {
    var { data, position, positionObj, indexedData } = this.state;
    var content = <Records data={data} />;
    var head = (
        <div className="App-header">
            <div className="App-title">立院表態</div>
        </div>);

    if(hash === 'overview')
        content = <OverviewWall data={position} />;

      
    if(hash === 'post')
        content = <SinglePost data={indexedData} />;

    if(hash === 'profile'){
        head = "";
        content = <Profile data={positionObj} />;
    }

    return (
      <div className="App">
          {head}
          {content}
          
      </div>
    );
  }
});

module.exports = App;


