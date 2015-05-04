/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var Legislator = require("../Legislator/Legislator.jsx");
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
       shouldYearExpand:{},
       currentTab: 'vote'
    }
  },

  _onSetTab(i, event){
    this.setState({
        currentTab: i
    });

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
    var {shouldYearExpand, currentTab} = this.state;
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
            if(item.name !== '尤美女'){
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
                        <span className="Records-more">more</span>
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

    /////////////////////////////////////////////////////////
    /* 依照票數排序 */
    ////////////////////////////////////////////////////////

    
    var {indexedData} = this.props;
    var orderByVote = [];
    for(var key in indexedData){
        if(indexedData[key].name === '尤美女'){
          orderByVote.push(indexedData[key]);
        }
    }
    orderByVote.sort(function(a,b){
      return b.trustVote-a.trustVote;
    });
    console.log(orderByVote);

    var records = orderByVote.map((item,key)=>{
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
                    <span className="Records-more">more</span>
                  </div>
                  
                </div>
                
            </div>
        )
    })

    var content = (currentTab === 'vote') ? {records} : {year_entries};
    var tabs = [{title:"依票數",id:"vote"},{title:"時間軸",id:"timeline"}];
    var tabsItem = tabs.map((item,key)=>{
      var tabClass = "Records-tab";
      if(currentTab===item.id){
        tabClass += " is-active"
      }
      var boundClick = this._onSetTab.bind(null, item.id);
      return (
        <div className={tabClass}
             onClick={boundClick}>{item.title}</div>
      )
    });
    
    return (
        <div className="Records">
          
          <a className="Records-name"
             href="index.html#profile?name=尤美女"
             target="_blank"><Legislator data={"尤美女"} /></a>

          <select className="Records-title">
              <option>儘速修法將同性婚姻合法化</option>
              <option>每週 40 工時</option>
              <option>分廠分照  </option>
          </select> 

          <div className="Records-description">
              在過去四年中，尤美女有 <span className="Records-voteNumbers">{entriesCount.all}</span> 筆相關的立場表達事件：<br/>
              <span className="Records-voteNumbers is-for">{entriesCount.for}</span>  筆贊成； 
              <span className="Records-voteNumbers is-against">{entriesCount.against}</span> 筆反對；
              <span className="Records-voteNumbers is-unclear">{entriesCount.unclear}</span> 筆立場不明確。
          </div>
          {tabsItem}
          {content}
          <div>看所有議題</div>
        </div>
    );


    
  }
});


module.exports = Records;


