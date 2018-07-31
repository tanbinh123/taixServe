import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ToolsProvider } from '../../providers/tools/tools';
/**
 * Generated class for the SearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent {

  text: string;


  searchQuery: string = '';

  items: string[];

  // item:string[];

  public flag=false;  /*有没有关键词、关键词开关*/

  public keywords='';  /*关键词*/

  public hasData=true;  /*是否有数据*/
  
  msg:string=null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams ,
    public httpServers:HttpServicesProvider,
    public tools: ToolsProvider,
    public events: Events) {

    // console.log('Hello SearchComponent Component');
    this.text = 'Hello World';
  }
  initializeItems(val) {
    var that = this;
    //获取公司信息
    this.httpServers.requestData(that.flag,'/persons/?query=Name:'+val, that.tools.getUserInfo(), function (data) {
      // console.log(data); 
      that.items = data;
    });
  }

  getSearchList(){
    var that = this;
     // console.log(this.keywords);
     this.httpServers.requestData(that.flag,'/persons/?query=Name:'+that.keywords, that.tools.getUserInfo(), (data) => {
      // console.log(data); 
      if(data){
        that.items = data;
        this.flag=true;
      }else{
        that.msg="搜索结果为空！";
        this.flag=true;
      }
      
    });
 } 

 goBack(item){
  this.navCtrl.pop().then(() => {
       this.events.publish('dispatcher-events', item);
       this.events.publish('passager-events', item);
       this.events.publish('departure-events', item);
       this.events.publish('destination-events', item);
   });
 }
 addKeywords(){
  this.navCtrl.pop().then(() => {
    this.events.publish('dispatcher-events', this.keywords);
    this.events.publish('passager-events', this.keywords);
    this.events.publish('departure-events', this.keywords);
    this.events.publish('destination-events', this.keywords);
  });
 }

}
