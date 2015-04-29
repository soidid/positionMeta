/** @jsx React.DOM */
var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

var React = require('react/addons');
var Records = require('../Records/Records.jsx');


require('./App.css');

function getData(){
  // Change from Object to Array;
  var data = AppStore.getData();
  var legiData = Object.keys(data).map((value, key)=>{
      return data[value];
  });
  return legiData;
}

var App = React.createClass({

  getInitialState(){
    return {
      data: []
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
         data: getData()
      });

  },

  render () {
    var { data } = this.state;
    
    return (
      <div className="App">
        <div className="App-header">
            <div className="App-title">婚姻平權 x 立院表態</div>
        </div>
        <Records data={data} />
      </div>
    );
  }
});

module.exports = App;


