import { Component } from '@angular/core';
import { NavController,ActionSheetController, LoadingController } from 'ionic-angular';
import { CreatePage } from '../create/create';
import { LoginPage } from '../login/login';
// import {Http,Jsonp} from "@angular/http";
import { DetailsPage } from '../details/details';
import { SpellPage } from '../spell/spell';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { ToolsProvider } from '../../providers/tools/tools';
// import { ErrorPage } from '../error/error';

/**
 * 订单状态state
 * 0:预约单
 * 1:未指派
 * 2:未接单
 * 3:已接单
 * 4:执行中
 * 5:已完成
 */
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //定义集合
  public items = []

  //详情页面引入，用于传参
  public DetailsPage : DetailsPage;

  //显示条数
  public limit : number = 10;

  //数据初始位置
  public offset : number = 0;

  //下一个数据位置
  public page : number =0;

  //提示信息
  public message :string = "";

  public flag = true;

  constructor(public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public httpServers:HttpServicesProvider,
    public tools: ToolsProvider) {
  
      // this.httpServers.post();
    this.requestData(null);
    // this.loading()
  }

  loading(){

    // let loading = this.loadingCtrl.create({
    //   content: '订单正在加载中...'
    // });

    // loading.present();
   
    this.requestData(null);
    
    // loading.dismiss();
   
  }

  //订单数据请求
  requestData(infiniteScroll){

    var that=this;

    //拼接分页数据
    var api = '/orders/?limit='+that.limit+'&offset='+that.offset+"&sortby=AppointDate&order=desc";

    this.httpServers.requestData(that.flag,api,that.tools.getUserInfo(),function(data){
      
      // console.log(data+"---------");
      if(data=="401"){
        that.tools.removeUserinfo();
        that.navCtrl.setRoot(LoginPage);
      }
      // 判读是否存在
      if(data){
        //拼接数据结果集
        that.items=that.items.concat(data);
        
      }

      //下一个起始位置
      that.offset=that.limit+that.page;

      //下一个起始位置
      that.page=that.offset;

      console.log(infiniteScroll);
      
      //上拉刷新
      if(infiniteScroll){

        infiniteScroll.complete();

        if(data==null){

          that.message = "我是有底线的";
          infiniteScroll.enable(false);

        }
      }
    });
  }

  //进入详情页面传递参数
  inDetails(item){

    this.navCtrl.push(DetailsPage,{
      item:item
    })

  }

  goSpell(item){
    this.navCtrl.push(SpellPage,{
      item:item
    })
  }

  //进入订单新建页面
  goCreate(){
    this.navCtrl.push(CreatePage);
  }

  //下拉刷新
  doRefresh(refresher) {
    this.offset=0;
    this.page = 0;
    this.items=[];
    this.requestData(null)
    refresher.complete();
  }

  //上拉分页
  doInfinite(infiniteScroll) {
    this.requestData(infiniteScroll);
  }

  loginOut() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '退出后不会删除任何历史数据，下次登录依然可以使用本帐号',
      buttons: [
        {
          text: '退出登录',
          role: 'destructive',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: '正在注销用户信息...'
            });
            loading.present();
            setTimeout(() => {
              this.tools.removeUserinfo()//注销用户storage信息
            }, 1000);
            setTimeout(() => {
              this.navCtrl.setRoot(LoginPage);//注销后跳转到登录页面
              loading.dismiss();
            }, 1100);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  //订单状态
  getState(state){

    return this.tools.getState(state)

  }
  
}
