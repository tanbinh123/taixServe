// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Jsonp,Headers,RequestOptions } from '@angular/http';
// Import HttpClient class
// import { HttpClient } from '@angular/common/http';
// import { Observable } from "rxjs/Observable";
import { ConfigProvider } from '../config/config';
import { ToolsProvider } from '../../providers/tools/tools';

import { LoadingController } from 'ionic-angular';

/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

  错误码
  400 请求无效
  401 登陆失败
  403 禁止访问
  404 无法找到文件
  500 服务器内部错误
  503 服务器不可用
*/
@Injectable()
export class HttpServicesProvider {

  //设置post的格式
  // private headers = new Headers();

  constructor(public http:Http,public jsonp:Jsonp,
    public config:ConfigProvider,public tools: ToolsProvider,
    public loadingCtrl: LoadingController) {
    console.log('Hello HttpServicesProvider Provider');

    //给header添加token信息
    // this.headers = new Headers({'token': this.tools.getUserInfo})

  }

  //get方法
  requestData(flag,apiUrl,userinfo,callback){
    
    let loading = this.loadingCtrl.create({
      content: '数据正在加载中...'
    });
    if(flag){
      loading.present();
    }
    //设置请求header
    let user =new Headers({'token': userinfo});

    this.http.get(this.config.apiUrl+apiUrl,{headers:user}).subscribe(function(data){
    //callback返回方法
    
    callback(JSON.parse(data['_body']));
   
    // setTimeout(() => {
    loading.dismiss();
    // }, 5000);
  },error=>{
    callback(error.status);
      console.log(error);
      loading.dismiss();
    })
  }
  //post 提交数据
  doPost(apiUrl,json,userinfo,callback){
    let loading = this.loadingCtrl.create({
      content: '订单创建中...'
    });
    loading.present();
    //设置post请求header
    let user =new Headers({'token': userinfo});

    //api拼接
    let api=this.config.apiUrl+apiUrl;

    this.http.post(api,JSON.stringify(json),{headers:user}).subscribe(function(res){

      //callback返回方法
      callback(res);
      loading.dismiss();
    },error=>{
      callback(error);
      loading.dismiss();
    })
  }

  update(apiUrl,json,userinfo,callback){
    let loading = this.loadingCtrl.create({
      content: '订单创建中...'
    });
    loading.present();
    //put请求需要降低浏览器安全性
    //open -n /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=/Users/zhanghaifeng/Documents/mychrome
    //设置put请求header
    var headers = new Headers();
    headers.append('token', userinfo);
    //  let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    //api拼接
    let api=this.config.apiUrl+apiUrl;
    this.http.put(api,json,options).subscribe(res => {   
      // console.log(res);
       //callback返回方法
       callback(res.json());
       loading.dismiss();
    },error => {
      callback(error);
      loading.dismiss();
    })

  }

  //post 登录
  doLogin(apiUrl,json,callback){
    let loading = this.loadingCtrl.create({
      content: '登录中...'
    });
    loading.present();
    //api拼接
    let api=this.config.loginUrl+apiUrl;

    this.http.post(api,JSON.stringify(json)).subscribe(function(res){

      //callback返回方法
      callback(res);
      loading.dismiss();
    },function (error){
      callback(false);
      console.log(error);
      loading.dismiss();
    })

  }

  get(){
    this.http.get('http://114.215.190.86:8090/wcloud/task/').subscribe(data=>{
      console.log(data);
      
    })
  }
  post(){
    let json ={
      "taskCode":"0000000"
    }
    this.http.post('http://localhost:8080/task/',json).subscribe(function(res){

    })
  }
}
