import { Component } from '@angular/core';
import { IonicPage, NavController, Events,NavParams,LoadingController } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';
import { HomePage } from '../home/home';

import { ToolsProvider } from '../../providers/tools/tools';
import { SearchplacePage } from '../searchplace/searchplace';
import { SearchDesPage } from '../search-des/search-des';
import { SearchbarsPage } from '../searchbars/searchbars';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  public item = {
    "CarId": {//车辆
      "Id": null
    },
    "CompanyId": {//公司
      "Id": null
    },
    "DispatcherId": {//派车人
      "CompanyId": {
        "Id": 0
      },
      "Id": 0,
      "Name": null,
      "Phone": null,
      "Roleid":{"Id":5}
    },
    "PassagerId": {//乘车人
      "CompanyId": {
        "Id": 0
      },
      "Id": 0,
      "Name": null,
      "Phone": null,
      "Roleid":{"Id":6}
    },
    "DriverId": {//司机
      "Id": null
    },
    "Departure": null,
    "Destination": null,
    "Km":null,
    "Number": null,//乘车人数
    "Date": null,
    "AppointDate": null,
    "Price": null//价格
  };
  //公司信息
  public company = [];
  //车辆信息
  public items = [];
  //司机信息
  public persons = [];

  public flag = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public httpServers: HttpServicesProvider,public storage: StorageProvider,
    public loadingCtrl: LoadingController,public tools:ToolsProvider,
    private events: Events) {
    
    this.item=this.navParams.data.item;
    this.requestData();
    
  } 
  
  //回显创建数据
  requestData() {
    var that = this;
    //获取公司信息
    this.httpServers.requestData(that.flag,'/company/?limit=10000', this.storage.get("userinfo"), function (data) {
      // console.log(data); 
      that.company = data;
    });
    //获取车辆信息
    this.httpServers.requestData(that.flag,'/car_driver/?limit=10000', this.storage.get("userinfo"), function (data) {
      // console.log(data); 
      that.items = data;
    });
    //获取司机信息
    this.httpServers.requestData(that.flag,'/drivers/?limit=10000', this.storage.get("userinfo"), function (data) {
      // console.log(data); 
      that.persons = data;
    });
  }

  update(entity){
    entity.CarId.Id=parseInt(entity.CarId.Id)
    entity.DriverId.Id = parseInt(entity.DriverId.Id);
    entity.Number = parseInt(entity.Number);
    entity.Km = parseInt(entity.Km);
    entity.Price = parseInt(entity.Price);
    entity.DriverPrice = parseInt(entity.DriverPrice);
    entity.CompanyId.Id = parseInt(entity.CompanyId.Id);
    if(entity.DriverId.Id!=0 || entity.DriverId.Id != "0"){
      entity.Type="订单"
    }
    var that=this;
      let api = "/orders/"+entity.Id;
      this.httpServers.update(api, entity,that.storage.get("userinfo"),(data) => {
        // console.log(data);
        
        if(data=="OK"){
          // let res = JSON.parse(data["_body"]);
          // this.tooperator(res.Id);
          this.navCtrl.setRoot(HomePage);
        }else{
          that.tools.presentAlert("修改失败");
        }
       
      })
    // this.navCtrl.push(ListinfoPage);
  }
  // tooperator(id){
  //   let apiPush = "/push/todriver/"+id;
  //     this.httpServers.requestData(this.flag,apiPush,this.storage.get("userinfo"),data=>{
        
  //       // console.log(JSON.stringify(data) );
  //     });
  // }
  pushTodriver(id){
    let apiPush = "/push/todriver/"+id;
    this.httpServers.requestData(this.flag,apiPush,this.storage.get("userinfo"),data=>{
      // console.log(data);
      
      // let res = JSON.parse(data);
        if(data.Code="200"){
          alert("推送成功");
        }else{
         alert("推送失败");
        }
    });
  }
  
  // 起始地点查询
  departureSearch(){
    this.events.subscribe('departure-events', (paramsVar) => {
        console.log(paramsVar);
        this.item.Departure=paramsVar.Departure
        this.events.unsubscribe('departure-events'); 
    })
        this.navCtrl.push(SearchplacePage); 
  }

  // 目的地查询
  destinationSearch(){
    this.events.subscribe('destination-events', (paramsVar) => {
        console.log(paramsVar);
        this.item.Destination=paramsVar.Destination;
        this.events.unsubscribe('destination-events'); 
    })
        this.navCtrl.push(SearchDesPage); 
  }

  fill(item){
    // console.log(item);
    var that = this;
    this.httpServers.requestData(that.flag,'/trip/?query=Departure:'+item.Departure+
    ',Destination:'+item.Destination+',CompanyId.Id:'+item.CompanyId.Id, that.storage.get("userinfo"), (data) => {
      console.log(data);
      if(data){
        that.item.Km =data[0].Km;
        that.item.Price= data[0].Price;
      }
    });
  }

  // 派车人查询
dispatcherSearch(item){
  this.events.subscribe('dispatcher-events', (paramsVar) => {

        //  console.log( paramsVar);
         if(paramsVar.Id){
            this.item.DispatcherId.Id=paramsVar.Id
            this.item.DispatcherId.Name=paramsVar.Name
            this.item.DispatcherId.Phone=paramsVar.Phone
         }else{
          this.item.DispatcherId.Name=paramsVar
         }
        
        //  console.log(this.orders);
         this.events.unsubscribe('dispatcher-events'); 
     })
    //  console.log(item);
    item.title='派车人';
     this.navCtrl.push(SearchbarsPage,{
       item:item
     }); 

}
// 乘车人查询
passagerSearch(item){
  this.events.subscribe('passager-events', (paramsVar) => {

        //  console.log( paramsVar);
        if(paramsVar.Id){
          this.item.PassagerId.Id=paramsVar.Id
          this.item.PassagerId.Name=paramsVar.Name
          this.item.PassagerId.Phone=paramsVar.Phone
        }else{
          this.item.PassagerId.Name=paramsVar
        }
        
        //  console.log(this.orders);
         this.events.unsubscribe('passager-events'); 
         
     })
     item.title='乘车人';
     this.navCtrl.push(SearchbarsPage,{
       item:item
     }); 

  }

  selectDriver(orders){
    var that = this;
    //获取车辆信息
    this.httpServers.requestData(that.flag,'/car_driver/?query=DriverId.Id:'+orders.DriverId.Id+'&limit=10000', this.storage.get("userinfo"), function (data) {
      // console.log(data[0].CarId.Id); 
      that.item.CarId.Id=data[0].CarId.Id
      // that.items = data;
    });
  }

  goBack(){
    this.navCtrl.setRoot(HomePage)
  }
}
