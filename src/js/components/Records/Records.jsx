/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var LegislatorAvatar = require("../LegislatorAvatar/LegislatorAvatar.jsx");
var Icon = require("../Icon/Icon.jsx");

require("./Records.css");
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    console.log(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var Records = React.createClass({
  

  getInitialState(){
    return {
       shouldYearExpand:{}
    }
  },

  _onTogggleYearData(i, event){
    console.log(i);
    var currentYearExpand = this.state.shouldYearExpand;
    
    if(!currentYearExpand[i])
        currentYearExpand[i] = true;
    else
        currentYearExpand[i] = !currentYearExpand;

    this.setState({
        currentYearExpand: currentYearExpand
    });
  },

  render() {
    var qText = getParameterByName('q');
    

    var {data} = this.props;
    var {shouldYearExpand} = this.state;
    var classSet = React.addons.classSet;
    
    var entriesCount = {};
        entriesCount.all = 0;
        entriesCount.yearAll = 0;
        entriesCount.for = 0;
        entriesCount.against = 0;
        entriesCount.unclear = 0;


    //console.log(data);
    //每一年
    var year_entries = data.map((year, year_index)=>{
        entriesCount.yearAll = 0;
        var entries = year.entries
        .filter((item)=>{
            var shouldReturn = true;
            if(qText !== "" && qText !== item.name){
              shouldReturn = false;
            }
            //console.log(item.name+": "+shouldReturn);
            if(shouldReturn){
              return item;

            }
                
          }
        )
        .map((item,key)=>{

            entriesCount.all++;
            entriesCount.yearAll++;
            
            //每一筆 entry
            switch(item.opinion){
              case '贊成':
                  entriesCount.for++;
                  break;
              case '反對':
                  entriesCount.against++;
                  break;
              case '不明確':
                  entriesCount.unclear++;
                  break;

            }
            
           
            var link = item.link;
            var opinionClasses = classSet({
              "Records-opinion": true,
              "is-for": item.opinion === '贊成',
              "is-against": item.opinion === '反對',
              "is-unclear": item.opinion === '不明確'
            });
            var singlePostURL = "#post?q="+item.id;

            return (
                <div className="Records-entry"
                     key={key}>
                    <div className="Records-entryTitle">
                      <LegislatorAvatar data={item.name}/>
                      <div className={opinionClasses}>{item.opinion}</div>
                    </div>
                    <div className="Records-quote">
                       {item.quote}
                    </div>
                    <div className="Records-info">
                        －{item.type}，{item.date}
                    </div>
                    <div className="Records-action">
                      <div className="Records-actionItem">
                        <span className="Records-star">★ {item.trustVote}</span>  
                      </div>
                      <div className="Records-actionItem">
                        <a className="Records-more">vote up</a>  
                      </div>
                      <div className="Records-actionItem">
                        <a className="Records-more">vote down</a>  
                      </div>
                    </div>
                    
                </div>
            )
        });
        
        var boundToggleYear = this._onTogggleYearData.bind(null, year.year);


        
        var voteEntries = (shouldYearExpand[year.year]===true)? 
        <div>
          {entries}
        </div> : "";
        var toggleText = (shouldYearExpand[year.year]===true)? "折疊" : "展開";
        if(entriesCount.yearAll === 0)
          toggleText = "";
        
       return (
            <div className="Records-year"
                 key={year_index}>
                <div className="Records-yearHeader"
                     onClick={boundToggleYear}>
                   <div className="Records-yearUnit"></div>
                   <div className="Records-yearTitle">{year.year}</div>
                   <div className="Records-yearSum">
                        <span className="Records-voteNumbers">{entriesCount.yearAll}</span> 個相關表態
                        <div className="Records-yearToggle">{toggleText}</div>
                   </div>
                </div>
                <div className="Records-yearEntries">
                    {voteEntries}
                </div>
            </div>
       );



    });
    
    var subject = (qText) ? qText:'立委';
    // <div className="Records-title">{subject}是否支持「儘速修法將同性婚姻合法化」？</div>  
    // 
    
    return (
        <div className="Records">
          <div className="Records-description">
              在過去四年中，{qText}有 <span className="Records-voteNumbers">{entriesCount.all}</span> 筆相關的立場表達事件：<br/>
              <span className="Records-voteNumbers is-for">{entriesCount.for}</span>  筆贊成； 
              <span className="Records-voteNumbers is-against">{entriesCount.against}</span> 筆反對；
              <span className="Records-voteNumbers is-unclear">{entriesCount.unclear}</span> 筆立場不明確。
          </div>      
              {year_entries}
        </div>
    );


    
  }
});


module.exports = Records;


