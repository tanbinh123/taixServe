import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { StorageProvider } from '../providers/storage/storage';

import { JPush } from '@jiguang-ionic/jpush';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = this.getVerification();

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage: StorageProvider, 
    jpush: JPush) {
      
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      jpush.init();
      jpush.setDebugMode(true);
      document.addEventListener('jpush.openNotification', (event: any) => {
        
      })

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad app');
  }

  getVerification(){
    
    if(this.storage.get("userinfo")){

      return HomePage

    }else{

      return LoginPage

    }
  }

}

