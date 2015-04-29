var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;

// 讓 store 繼承 EventEmitter 一樣有幾種不同寫法，merge, assign 或是 jQuery 的 .$extend
var merge = require('react/lib/merge');
// var assign = require('object-assign');

// store 改變之後廣播出去的內容
var CHANGE_EVENT = 'change';
var request = require('superagent');

// Store 分成三個大部分：private, public, register self

//========================================================================
//
// Private vars & method

// 定義 store 需要的變數和 method，外界看不到
var _legiData = {};

var lyInfo = require("../../data/ly-info").data;
lyInfo.map((value, key)=>{
    _legiData[value.name] = value;
    
});
console.log(_legiData);

var _data = [];

//========================================================================
//
// Public API 外界可以呼叫的方法

var AppStore = merge(EventEmitter.prototype, {
// assign 的寫法
// var TodoStore = assign({}, EventEmitter.prototype, {

  getData: function() {
    return _data;
  },

  getPosition: function() {
    return _legiData;
  },

  //為什麼這個要定義成 public ?
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  
});

//========================================================================
//
// Load Data
function parseData (argument) {
  
  // GET Position Data from Google Spreadsheets
  
  // REF
  var keyPath = "1M_Yp1iwqLfE2j6v4CYODLJcB6DlwtihmylGqdd7gTF0";
  var jsonPath = "https://spreadsheets.google.com/feeds/list/"+keyPath+"/od6/public/values?alt=json";
  
  var request = require('superagent');
  request
    .get(jsonPath)
    .end(function(err, res){
        var data = res.body;
        var _temp = {};
      
        data.feed.entry.map((value, key)=>{
            //console.log(value);

            var anEntry = {};
            var name = value.gsx$name.$t;
            anEntry.name = name;
            anEntry.id = value.gsx$id.$t;
            var date = value.gsx$date.$t;;
            anEntry.date = date;
            //split date to : year, month, data, original format: yyyy-mm-dd
            anEntry.year  = date.split("-")[0];
            anEntry.month = date.split("-")[1];
            anEntry.day   = date.split("-")[2];

            anEntry.type = value.gsx$type.$t;
            anEntry.quote = value.gsx$quote.$t;
            anEntry.opinion = value.gsx$opinion.$t;
            anEntry.link = value.gsx$link.$t;
           
            anEntry.trustVote = value.gsx$trustvote.$t;

            //紀錄到立法委員的資料中
            if(!_legiData[name].entries){
                _legiData[name].entries = [];
                _legiData[name].forTotal = 0;
                _legiData[name].againstTotal = 0;
                _legiData[name].unclearTotal = 0;
            }
            _legiData[name].entries.push(anEntry);
            switch(anEntry.opinion){
                case '贊成':
                     _legiData[name].forTotal++;
                     break;
                case '反對':
                     _legiData[name].againstTotal++;
                     break;
                case '不明確':
                     _legiData[name].unclearTotal++;
                     break;
            }

            // group by year
            if(!_temp[anEntry.year])
                _temp[anEntry.year] = [];
            _temp[anEntry.year].push(anEntry);

         
        });
        //year to array
        for(var key in _temp){
            _data.push(
              {
                "year":key,
                "entries":_temp[key]
              });
        }

        //統計每個立委的 entry 決定立場
        for(var name in _legiData){

            if(!_legiData[name].entries){
                _legiData[name].position = '未表態';
            }else{
                var {forTotal, againstTotal, unclearTotal} = _legiData[name];
                
                if(forTotal >= Math.max(againstTotal, unclearTotal)){
                    _legiData[name].position = '贊成';
                    _legiData[name].positionCount = forTotal;

                }else if(againstTotal >= Math.max(forTotal, unclearTotal)){
                    _legiData[name].position = '反對';
                    _legiData[name].positionCount = againstTotal;

                }else{
                    _legiData[name].position = '不明確';
                    _legiData[name].positionCount = unclearTotal;

                }

            }
            console.log(name+":"+_legiData[name].position);

        }
       

        //console.log(_data);
        AppStore.emitChange();
    
         
    });

}
parseData();

///////////////////////////////////////////////////////////////////////////

//========================================================================
//
// event handlers

/**
 * 向 Dispatcher 註冊自已，才能偵聽到系統發出的事件
 */

AppDispatcher.register(function(action) {
  
  switch(action.actionType) {
    
    case AppConstants.LEGI_UPDATE:
      // _update(action.item);
      // AppStore.emitChange();
      break;
    
    default:
      // no op
  }
});

module.exports = AppStore;
