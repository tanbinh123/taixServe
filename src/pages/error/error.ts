import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { LoginPage } from '../../pages/login/login';

/**
 * Generated class for the ErrorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-error',
  templateUrl: 'error.html',
})
export class ErrorPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ErrorPage');
  }

  goLogin(){
    // this.navCtrl.push(LoginPage);
    console.log("error gologin");
    
  }
}
