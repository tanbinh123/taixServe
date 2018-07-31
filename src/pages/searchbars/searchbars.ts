import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ToolsProvider } from '../../providers/tools/tools';

// import { CreatePage } from '../create/create';
/**
 * Generated class for the SearchbarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchbars',
  templateUrl: 'searchbars.html',
})
export class SearchbarsPage {

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
    var item = that.navParams.get('item')
    // console.log(item.title);
    
    //获取用车路线信息
    this.httpServers.requestData(true,'/persons/?query=CompanyId.Id:'+item.CompanyId.Id+',Roleid.Role:'+item.title+'&limit=10000', that.tools.getUserInfo(), (data) => {
      // console.log(data); 
      that.items = data;
      this.flag=true;
      // console.log(that.items); 
    });
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
    var item = that.navParams.get('item')
     // console.log(this.keywords);
     this.httpServers.requestData(true,'/persons/?query=Name:'+that.keywords+',CompanyId.Id:'+item.CompanyId.Id+',Roleid.Role:派车人', that.tools.getUserInfo(), (data) => {
      // console.log(data); 
      if(data){
        that.items = data;
        this.flag=true;
        that.msg='';
      }else{
        that.msg="搜索结果为空！";
        that.items = [];
        this.flag=true;
      }
      
    });
 } 

 goBack(item){
  this.navCtrl.pop().then(() => {
       this.events.publish('dispatcher-events', item);
       this.events.publish('passager-events', item);
   });
 }
 addKeywords(){
  this.navCtrl.pop().then(() => {
    this.events.publish('dispatcher-events', this.keywords);
    this.events.publish('passager-events', this.keywords);
  });
 }
}
