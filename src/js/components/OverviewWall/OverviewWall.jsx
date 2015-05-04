/** @jsx React.DOM */
var React = require('react/addons');
var LegislatorAvatar = require("../LegislatorAvatar/LegislatorAvatar.jsx");

require("./OverviewWall.css");
var OverviewWall = React.createClass({
  
  render() {

    var data = this.props.data;

    var forLegislators = [];
    var againstLegislators = [];
    var unclearLegislators = [];
    var noneLegislators = [];

    data.map((item,key)=>{
      if(item.position === '贊成')
         forLegislators.push(item);

      if(item.position === '反對')
         againstLegislators.push(item);

      if(item.position === '不明確')
         unclearLegislators.push(item);

      if(item.position === '未表態')
         noneLegislators.push(item);
      
    });

    // 依照強度排序, 大 -> 小
    var sortBase = function (a,b) {
      return b.positionCount - a.positionCount;
    };
    forLegislators.sort(sortBase);
    againstLegislators.sort(sortBase);
    unclearLegislators.sort(sortBase);
    noneLegislators.sort(sortBase);


  
    // 贊成
    var legiItemsFor = forLegislators

    .map((item, key)=>{

        var partyClass = "OverviewWall-avatar is-"+item.party_eng;
        var url = "index.html#profile?name="+item.name;

        return (
          <a className="OverviewWall-item"
             key={key}
             href={url}
             target="_blank">
          <div className="OverviewWall-opinionCount">{item.positionCount}</div>
          <div className={partyClass}
               key={key}>
               <LegislatorAvatar data={item.name} plain={true}/>
          </div>
          
          </a>
        )
    });

    // 反對
    var legiItemsAgainst = againstLegislators
    .map((item, key)=>{

        var partyClass = "OverviewWall-avatar is-"+item.party_eng;
        var url = "index.html#profile?name="+item.name;

        return (
          <a className="OverviewWall-item"
             key={key}
             href={url}
             target="_blank">
          <div className="OverviewWall-opinionCount">{item.positionCount}</div>
          <div className={partyClass}
               key={key}>
               <LegislatorAvatar data={item.name} plain={true}/>
          </div>
          
          </a>
        )
    });

    // 不明確
    var legiItemsUnclear = unclearLegislators
    .map((item, key)=>{

        var partyClass = "OverviewWall-avatar is-"+item.party_eng;
        var url = "index.html#profile?name="+item.name;

        return (
          <a className="OverviewWall-item"
             key={key}
             href={url}
             target="_blank">
          <div className="OverviewWall-opinionCount">{item.positionCount}</div>
          <div className={partyClass}
               key={key}>
               <LegislatorAvatar data={item.name} plain={true}/>
          </div>
          
          </a>
        )
    });

     // 未表態
    var legiItemsNone = noneLegislators
    .map((item, key)=>{

        var partyClass = "OverviewWall-avatar is-"+item.party_eng;
        return (
          <div className="OverviewWall-item">
          <div className={partyClass}
               key={key}>
               <LegislatorAvatar data={item.name} plain={true}/>
          </div>
          
          </div>
        )
    });



   
    // <div className="OverviewWall-title">立法院是否支持「婚姻平權於本會期立法通過」？</div>
    // <div className="OverviewWall-description">根據立法院過去四年的立場表態事件：<br/>
    //        有 <span className="OverviewWall-numberHighlight">{forLegislators.length}</span> 位立委傾向支持；
    //        <span className="OverviewWall-numberHighlight">{againstLegislators.length}</span> 位立委傾向反對； 
    //        <span className="OverviewWall-numberHighlight">{unclearLegislators.length}</span> 位立委表態不明確；
    //        <span className="OverviewWall-numberHighlight">{noneLegislators.length}</span> 位立委表態沒有表態。</div>
    
    var {title} = this.props;
    return (
      <div>
      <div className="OverviewWall-title">立法院是否支持「分廠分照」？</div>
      <div className="OverviewWall">
        
        <div className="OverviewWall-group">
            <div className="OverviewWall-groupTitle">支持</div>
            {legiItemsFor}
        </div>
        <div className="OverviewWall-group">
            <div className="OverviewWall-groupTitle">反對</div>
            {legiItemsAgainst}
        </div>
         <div className="OverviewWall-group">
            <div className="OverviewWall-groupTitle">不明確</div>
            {legiItemsUnclear}
        </div>
      </div>

      <div className="OverviewWall">
        <div className="OverviewWall-group">
            <div className="OverviewWall-groupTitle">未表態</div>
            {legiItemsNone}
        </div>
      </div>
      </div>
    );
  }
});


module.exports = OverviewWall;


