/** @jsx React.DOM */
var React = require('react/addons');

require('./FactsCard.css');

var FactsCard = React.createClass({
  
  getInitialState(){
    return {
        currentIssue:""
    }
  },
  _onSetIssue(value,event){
    this.setState({
        currentIssue: value
    });
  },
  render () {
    var {data, menu} = this.props;
    var {currentIssue} = this.state;

    var classSet = React.addons.classSet;
    
    var menuItem = menu.map((item,key)=>{
        var menuItemStyle = {
            "height" : item.count*10 + 'px'
        };
        var boundClick = this._onSetIssue.bind(null, item.name);
        var menuItemClasses = classSet({
            "FactsCard-menuItem" : true,
            "is-active" : currentIssue === item.name
        });
        return (
          <div className={menuItemClasses}
               style={menuItemStyle}
               onClick={boundClick}>
              <div className="FactsCard-menuItemText">{item.name}
                  <div className="FactsCard-menuCount">{item.count}</div>
              </div>
          </div>
        )

    });
    var factItems = data.facts.map((item,key)=>{
        var opinionClasses = classSet({
              "FactsCard-opinion": true,
              "is-for": item.opinion === '贊成',
              "is-against": item.opinion === '反對',
              "is-unclear": item.opinion === '不明確'
            });
        return (
          <div className="FactsCard-listItem">
              <div className={opinionClasses}>{item.opinion}</div>
              {item.title}
              <div className="FactsCard-opinionCount">{item.opinionCount}</div>

          </div>
        )
    });

    var content = (currentIssue === '婚姻平權') ?
            <div className="FactsCard-content">
              <div className="FactsCard-mainTitle">{data.name}</div>
              <div>{factItems}</div>
            </div> : "";

    return (
      <div className="FactsCard">
          <div className="FactsCard-menu">{menuItem}</div>
          {content}
      </div>
          
    );
  }
});

module.exports = FactsCard;


