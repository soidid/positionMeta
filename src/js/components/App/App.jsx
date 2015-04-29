/** @jsx React.DOM */
var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

var React = require('react/addons');
var Records = require('../Records/Records.jsx');
var OverviewWall = require('../OverviewWall/OverviewWall.jsx');

require('./App.css');

var hash = window.location.hash.substring(1); // remove #

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

var App = React.createClass({

  getInitialState(){
    return {
      data: [],
      position: []
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
         position: getPosition()
      });

  },

  render () {
    var { data, position } = this.state;
    var content = <Records data={data} />;
    if(hash === 'overview')
        content = <OverviewWall data={position} />;
    return (
      <div className="App">
        <div className="App-header">
            <div className="App-title">婚姻平權 x 立院表態</div>
        </div>
            {content}
      </div>
    );
  }
});

module.exports = App;


