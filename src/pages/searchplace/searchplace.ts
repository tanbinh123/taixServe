import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ToolsProvider } from '../../providers/tools/tools';
/**
 * Generated class for the SearchplacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchplace',
  templateUrl: 'searchplace.html',
})
export class SearchplacePage {
  
  searchQuery: string = '';

  items: string[];

  // item:string[];

  public flag=false;  /*有没有关键词、关键词开关*/

  public keywords='';  /*关键词*/

  public hasData=true;  /*是否有数据*/
  
  msg:string=null;

  constructor(public navCtrl: NavController, public navParams: NavParams ,
    public httpServers:HttpServicesProvider,
    public tools: ToolsProvider,private events: Events) {
  }

  ionViewDidLoad() {
    var that = this;
    //获取用车路线信息
    this.httpServers.requestData(true,'/trip/?limit=10000', that.tools.getUserInfo(), (data) => {
      // console.log(data); 
      that.items = that.uniqueLoad(data);
      this.flag=true;
      // console.log(that.items); 
    });
  }

  getSearchList(){
    var that = this;
    this.httpServers.requestData(true,'/trip/?query=Departure:'+that.keywords, that.tools.getUserInfo(), (data) => {
      if(data){
        
        that.items = that.unique(data);
        that.msg='';
        this.flag=true;
      }else{
        that.msg="搜索结果为空！";
        that.items = [];
        this.flag=true;
      }
    });
  }
  unique(array){
    var n = [array[0]]; //结果数组
    //从第二项开始遍历
    for(var i = 1; i < array.length; i++) {
      //如果当前数组的第i项在当前数组中第一次出现的位置不是i，
      //那么表示第i项是重复的，忽略掉。否则存入结果数组
      if (array.indexOf(array[i].Departure) == i) 
          n.push(array[i]);
    }
      // console.log(n);
    return n;
  }
    
  uniqueLoad(arr) {
    var tmp = new Array();
    var data = new Array();
      for(var i in arr){
      //该元素在tmp内部不存在才允许追加
        if(tmp.indexOf(arr[i].Departure)==-1){
          tmp.push(arr[i].Departure);
          data.push(arr[i]);
        }
      }
      return data;
   }
   
  goBack(item){
    this.navCtrl.pop().then(() => {
        this.events.publish('departure-events', item);
    });
  }
  
  addKeywords(){
    this.navCtrl.pop().then(() => {
      this.events.publish('departure-events', this.keywords);
    });
  }

}
