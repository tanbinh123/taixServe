import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events,LoadingController,AlertController } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';
import { SearchbarsPage } from '../searchbars/searchbars';
import { HomePage } from '../home/home';
/**
 * Generated class for the SpellPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-spell',
  templateUrl: 'spell.html',
})
export class SpellPage {

  //定义订单数据结构
  public orders = {
    "Id":null,
    "CarId": {//车辆
      "Id": null
    },
    "CompanyId": {//公司
      "Id": null,
      "Name":null
    },
    "DispatcherId": {//派车人
      "Id": 0,
      "Name": null,
      "Phone": null
    },
    "PassagerId": {//乘车人
      "Id": 0,
      "Name": null,
      "Phone": null
    },
    "DriverId": {//司机
      "Id": null
    },
    "Departure": {
      "Id": 0,
      "Location": null
    },
    "Destination": {
      "Id": 0,
      "Location": null
    },
    "Km":null,
    "Info":null,
    "Make":null,
    "DriverPrice":null,
    "Type":"拼单",
    "Number": null,//乘车人数
    "Date": null,
    "AppointDate": null,
    "Price": null//价格
  }

    public item = {};

    //公司信息
    public company = [];
    //车辆信息
    public items = [];
    //司机信息
    public persons = [];

    public flag = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public httpServers: HttpServicesProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public storage: StorageProvider,private events: Events) {
    
    this.requestData();
  }

  ionViewDidLoad() {
    this.orders=this.navParams.data.item;
    console.log(this.orders);
    

    if(this.orders.Type!="订单"){
       
      this.presentAlert("对不起，本条订单无法拼单！");
      return this.goBack();
    }
    this.orders.CompanyId.Id=null
    this.orders.DispatcherId.Name=null
    this.orders.DispatcherId.Phone=null
    // this.orders.PassagerId.Name=null
    // this.orders.PassagerId.Phone=null
    this.orders.Info=null
    this.orders.Id=null
    this.orders.Price=null
    // this.orders.DriverPrice=null
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

  // 派车人查询
dispatcherSearch(item){
  if(item.CompanyId.Id==null){
    return this.presentAlert("请选择公司！"); 
  }
  this.events.subscribe('dispatcher-events', (paramsVar) => {

        //  console.log( paramsVar);
         if(paramsVar.Id){
            this.orders.DispatcherId.Id=paramsVar.Id
            this.orders.DispatcherId.Name=paramsVar.Name
            this.orders.DispatcherId.Phone=paramsVar.Phone
         }else{
          this.orders.DispatcherId.Name=paramsVar
         }
        
        //  console.log(this.orders);
         this.events.unsubscribe('dispatcher-events'); 
     })

     item.title='派车人';
     this.navCtrl.push(SearchbarsPage,{
       item:item
     }); 

}
// 乘车人查询
passagerSearch(item){
  if(item.CompanyId.Id==null){
    return this.presentAlert("请选择公司！"); 
  }
  this.events.subscribe('passager-events', (paramsVar) => {

        //  console.log( paramsVar);
        // if(paramsVar.Id){
        //   this.orders.PassagerId.Id=paramsVar.Id
        //   this.orders.PassagerId.Name=paramsVar.Name
        //   this.orders.PassagerId.Phone=paramsVar.Phone
        // }else{
        //   this.orders.PassagerId.Name=paramsVar
        // }
        
        //  console.log(this.orders);
         this.events.unsubscribe('passager-events'); 
         
     })
     item.title='乘车人';
     this.navCtrl.push(SearchbarsPage,{
       item:item
     }); 

}


 //创建订单方法
 createServe() {
 if (this.orders.Info == null || this.orders.Info == "") {
    this.presentAlert("请输入用车路线")
    return
  }else if (this.orders.CompanyId.Id == null || this.orders.CompanyId.Id == "") {
    this.presentAlert("请选择公司信息")
    return
  } else if (this.orders.Price == null || this.orders.Price == 0) {
    this.presentAlert("请输入价格")
    return
  } else if (this.orders.DispatcherId.Name == null || this.orders.DispatcherId.Name == "") {
    this.presentAlert("请输入派车人信息")
    return
  } else if (this.orders.DispatcherId.Phone == null || this.orders.DispatcherId.Phone == "") {
    this.presentAlert("请输入派车人电话号")
    return
  }  else  {
    //字符串转换int
    this.orders.CarId.Id = parseInt(this.orders.CarId.Id);
    this.orders.CompanyId.Id = parseInt(this.orders.CompanyId.Id);
    this.orders.DriverId.Id = parseInt(this.orders.DriverId.Id);
    this.orders.Km = parseInt(this.orders.Km);
    this.orders.Number = parseInt(this.orders.Number);
    this.orders.Price = parseInt(this.orders.Price);

    console.log(this.orders);
    
    this.httpServers.doPost("/orders", this.orders, this.storage.get("userinfo"), (data) => {
      // console.log(JSON.parse(data["_body"]));
      
      if(data.status=="201"){
        let res = JSON.parse(data["_body"]);
        this.tooperator(res.Id);
        this.navCtrl.setRoot(HomePage);
      }else{
        alert("修改失败");
        return
      }
    })
  }
}
tooperator(id){
  let apiPush = "/push/todriver/"+id;
    this.httpServers.requestData(this.flag,apiPush,this.storage.get("userinfo"),data=>{
      // console.log(data);
        
      // let res = JSON.parse(data);
        if(data.Code="200"){
          this.presentAlert("推送成功");
        }else{
          this.presentAlert("推送失败");
        }
    });
}
  //弹出框
  presentAlert(content) {
    let alert = this.alertCtrl.create({
      title: "提示信息",
      subTitle: content,
      buttons: ['确定']
    });
    alert.present();
  }

  goBack(){
    this.navCtrl.setRoot(HomePage);
  }
}
