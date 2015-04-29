/** @jsx React.DOM */
"use strict";
var React = require('react/addons');
var LegislatorAvatar = require("../LegislatorAvatar/LegislatorAvatar.jsx");

require("./SinglePost.css");

function getID() {

    var hash = window.location.hash.substring(1); // remove #
    var query = hash.split("?")[1];
    return query.split("=")[1];
}

var SinglePost = React.createClass({

  getInitialState(){
    return {
       
    }
  },

  render() {
    var classSet = React.addons.classSet;
    var id = getID();
    if(!this.props.data[id])
       return <div></div>;

    var data = this.props.data[id];
    
    var opinionClasses = classSet({
          "Records-opinion": true,
          "is-for": data.opinion === '贊成',
          "is-against": data.opinion === '反對',
          "is-unclear": data.opinion === '不明確'
        });

    return (
        <div className="SinplePost">
            <div className="SinplePost-entry">
                <div className="SinplePost-entryTitle">
                  <LegislatorAvatar data={data.name}/>
                  <div className={opinionClasses}>{data.opinion}</div>
                </div>
                <div className="SinplePost-quote">
                   {data.quote}
                </div>
                <div className="SinplePost-info">
                    －{data.type}，{data.date}
                </div>
                <div className="SinplePost-action">
                  <div className="SinplePost-actionItem">
                    <span className="SinplePost-star">★ {data.trustVote}</span>  
                  </div>
                  <div className="SinplePost-actionItem">
                    <a className="SinplePost-pdf"
                       href={data.link}
                       target="_blank"> 原始公報 </a>  
                  </div>
                </div>
                
            </div>
            <div className="SinplePost-alternative"> 
                <div>覺得 quote 不夠有代表性？或是立場標示錯誤嗎？</div>
                
            </div>
            
                  <div className="SinplePost-button">投給其他選項</div>
                  <div className="SinplePost-button">自己建立一個</div>
           

            <div className="SinplePost-entry">
                <div className="SinplePost-entryTitle">
                  <LegislatorAvatar data={data.name}/>
                  <div className="Records-opinion is-for">贊成</div>
                </div>
                <div className="SinplePost-quote">
                   {data.quote}
                </div>
                <div className="SinplePost-info">
                    －{data.type}，{data.date}
                </div>
                <div className="SinplePost-action">
                  <div className="SinplePost-actionItem">
                    <span className="SinplePost-star">★ {data.trustVote-1}</span>  
                  </div>
                  <div className="SinplePost-actionItem">
                    <a className="SinplePost-pdf"
                       href={data.link}
                       target="_blank"> 原始公報 </a>  
                  </div>
                </div>
                
            </div>
            <div className="SinplePost-entry">
                <div className="SinplePost-entryTitle">
                  <LegislatorAvatar data={data.name}/>
                  <div className="Records-opinion is-against">反對</div>
                </div>
                <div className="SinplePost-quote">
                   {data.quote}
                </div>
                <div className="SinplePost-info">
                    －{data.type}，{data.date}
                </div>
                <div className="SinplePost-action">
                  <div className="SinplePost-actionItem">
                    <span className="SinplePost-star">★ {data.trustVote-3}</span>  
                  </div>
                  <div className="SinplePost-actionItem">
                    <a className="SinplePost-pdf"
                       href={data.link}
                       target="_blank"> 原始公報 </a>  
                  </div>
                </div>
                
            </div>

          
        </div>
    );


    
  }
});


module.exports = SinglePost;


