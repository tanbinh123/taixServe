import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
// import { Http,Jsonp } from "@angular/http";
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';
import { SearchbarsPage } from '../searchbars/searchbars';
import { LoginPage } from '../login/login';
import { SearchplacePage } from '../searchplace/searchplace';
import { SearchDesPage } from '../search-des/search-des';

// import { SearchComponent } from '../../components/search/search';
// import { ComponentsModule } from '../../components/components.module';
/**
 * Generated class for the CreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create',
  templateUrl: 'create.html',
})
export class CreatePage {

  public SearchbarsPage = SearchbarsPage;

  public currentTime: string = this.formatDate(new Date());
  //定义订单数据结构
  public orders = {
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
    "Number": null,//乘车人数
    "Date": null,
    "AppointDate": null,
    "Price": null,//价格
    "DriverPrice":null,
    "Type":"订单",
    "State": "待处理",
    "SendState": "待处理",
    "RecvState": "未收款"
  }
  //公司信息
  public company = [];
  //车辆信息
  public items = [];
  //司机信息
  public persons = [];

  public date : string ="现在";

  public flag=false;
  constructor(private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public httpServers: HttpServicesProvider,
    public storage: StorageProvider,private events: Events) {

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
  
  blurInput(item){
    if(item.CompanyId.Id==null){
      return this.presentAlert("请选择公司！"); 
    }
    
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
    //  console.log(item);
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
        if(paramsVar.Id){
          this.orders.PassagerId.Id=paramsVar.Id
          this.orders.PassagerId.Name=paramsVar.Name
          this.orders.PassagerId.Phone=paramsVar.Phone
        }else{
          this.orders.PassagerId.Name=paramsVar
        }
        
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
    console.log(this.orders.AppointDate );
    
    if (this.orders.AppointDate == null && this.currentTime == null) {
      this.presentAlert("请输入用车时间")
      return
    } 
    else if (this.orders.Info == null && this.orders.Info == "") {
      this.presentAlert("请输入用车形成")
      return
    } else if (this.orders.Price == null || this.orders.Price == 0) {
      this.presentAlert("请输入价格")
      return
    } else if (this.orders.CompanyId.Id == null || this.orders.CompanyId.Id == "") {
      this.presentAlert("请选择公司信息")
      return
    } else if (this.orders.DispatcherId.Name == null || this.orders.DispatcherId.Name == "") {
      this.presentAlert("请输入派车人信息")
      return
    } else if (this.orders.DispatcherId.Phone == null || this.orders.DispatcherId.Phone == "") {
      this.presentAlert("请输入派车人电话号")
      return
    }  else if (this.orders.AppointDate == null && this.orders.CarId.Id == null || this.orders.CarId.Id == "") {
      this.presentAlert("请选择车辆信息")
      return
    } else if (this.orders.AppointDate == null && this.orders.DriverId.Id == null || this.orders.DriverId.Id == "") {
      this.presentAlert("请选择司机信息")
      return
    }  else {
      if (this.orders.AppointDate == null || this.orders.AppointDate == "") {
        this.orders.AppointDate = this.currentTime;
      }
      if(this.orders.DriverId.Id==null || this.orders.DriverId.Id == ""){
        this.orders.Type="预约"
      }
      // else{
      //   this.orders.AppointDate=this.formatDate(this.orders.AppointDate);
      // }
      //字符串转换int
      this.orders.CarId.Id = parseInt(this.orders.CarId.Id);
      this.orders.CompanyId.Id = parseInt(this.orders.CompanyId.Id);
      this.orders.DriverId.Id = parseInt(this.orders.DriverId.Id);
      // this.orders.Km = parseInt(this.orders.Km);
      this.orders.Number = parseInt(this.orders.Number);
      this.orders.Price =  parseInt(this.orders.Price);
      this.orders.DispatcherId.CompanyId.Id=this.orders.CompanyId.Id;
      this.orders.PassagerId.CompanyId.Id=this.orders.CompanyId.Id;
      this.orders.DriverPrice=parseInt(this.orders.DriverPrice);
      
      
      
      // if(this.orders.DispatcherId.Id==0){
      //   this.orders.DispatcherId.Roleid.Id=0;
      // }
      // if(this.orders.PassagerId.Id==0){
      //   this.orders.PassagerId.Roleid.Id=0;
      // }
      
      // console.log(JSON.stringify(this.orders));
      this.httpServers.doPost("/orders", this.orders, this.storage.get("userinfo"), (data) => {
        // console.log(data);
        if(data.Code="201"){
          let res = JSON.parse(data["_body"]);
          this.tooperator(res.Id);
          this.navCtrl.setRoot(HomePage);
        }else if(data.Code="401"){
          this.presentAlert("登录失效，请重新登录");
          this.navCtrl.setRoot(LoginPage);
        }else{
          this.presentAlert("创建失败!");
          return
        }
        
      })
    }
  }
  tooperator(id){
    let apiPush = "/push/todriver/"+id;
      this.httpServers.requestData(this.flag,apiPush,this.storage.get("userinfo"),data=>{
        // let res = JSON.parse(data);
        if(data.Code="200"){
          this.presentAlert("推送成功");
        }else{
          this.presentAlert("推送失败");
        }
        // console.log(JSON.stringify(data) );
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

  //格式化时间戳
  formatDate(now) {
    var year = now.getFullYear(),
    month = now.getMonth() + 1,
    date = now.getDate(),
    hour = now.getHours(),
    minute = now.getMinutes()
    // second = now.getSeconds();
    return year + "-" + this.checkTime(month) + "-" + this.checkTime(date) + " " + this.checkTime(hour) + ":" + this.checkTime(minute);
  }
  checkTime(i){
  if (i<10) 
    {i="0" + i}
    return i
  }
  //时间选项卡清空
  clickClear(status) {
    if (status == 1) {
      return this.currentTime = null;
    } else if (status == 0) {
      this.currentTime = this.formatDate(new Date())
      return this.orders.AppointDate = null;
    }
  }

  // 起始地点查询
  departureSearch(){
    this.events.subscribe('departure-events', (paramsVar) => {
        console.log(paramsVar);
        if(paramsVar.Id){
          this.orders.Departure.Location=paramsVar.Departure
        }else{
          this.orders.Departure.Location=paramsVar
        }
        this.events.unsubscribe('departure-events'); 
        
    })
        this.navCtrl.push(SearchplacePage); 
  }

  // 目的地查询
  destinationSearch(){
    this.events.subscribe('destination-events', (paramsVar) => {
        console.log(paramsVar);
        if(paramsVar.Id){
          this.orders.Destination.Location=paramsVar.Destination;
        }else{
          this.orders.Destination.Location=paramsVar
        }
        this.events.unsubscribe('destination-events'); 
    })
        this.navCtrl.push(SearchDesPage); 
  }
  fill(item){
    // console.log(item);
    var that = this;
    this.httpServers.requestData(that.flag,'/trip/?query=Departure.Location:'+item.Departure.Location+
    ',Destination.Location:'+item.Destination.Location+',CompanyId.Id:'+item.CompanyId.Id, that.storage.get("userinfo"), (data) => {
      // console.log(data);
      // if(data){
      //   that.orders.Km =data[0].Km;
      //   that.orders.Price= data[0].Price;
      // }
    });
  }
  selectDriver(orders){
    var that = this;
    //获取车辆信息
    this.httpServers.requestData(that.flag,'/car_driver/?query=DriverId.Id:'+orders.DriverId.Id+'&limit=10000', this.storage.get("userinfo"), function (data) {
      // console.log(data[0].CarId.Id); 
      that.orders.CarId.Id=data[0].CarId.Id
      // that.items = data;
    });
  }
}
