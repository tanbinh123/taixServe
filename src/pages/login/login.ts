import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';

import { ToolsProvider } from '../../providers/tools/tools';
import { JPush } from '@jiguang-ionic/jpush';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //登录结构
  public user = { "Name" : null, "Passwd" : null,"LoginDevice":"0" }
  
  //设备id
  public registrationId: string="0";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public httpServers:HttpServicesProvider,
    public storage: StorageProvider,
    public tools : ToolsProvider,
    public jpush: JPush) {

  }

  login(){

    if(this.user.Name=="" || this.user.Name==null || this.user.Passwd=="" || this.user.Passwd==null){
      this.tools.presentAlert("用户名或密码不能为空！");
      return
    }else{
      this.jpush.getRegistrationID().then(rId => {
        this.doLogin(rId);
        // alert(this.registrationId)
      });
    }

  }

  
  doLogin(rId){
    this.user.LoginDevice=rId;
    console.log(JSON.stringify(this.user));
    
    this.httpServers.doLogin("/login/user",this.user,(data)=>{

      if(data.status=="201"){
        data = data.json()
        this.storage.set('userinfo',data);
      }else{
        
        this.tools.presentAlert("用户名或密码错误！");
        
        return
      }

    this.navCtrl.setRoot(HomePage);
    })

  }

}
