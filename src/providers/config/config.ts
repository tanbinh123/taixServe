// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {

  //api请求地址39.106.173.211
  public apiUrl : string = "http://39.106.173.211:8888/v1/api";

  //登陆请求地址111.207.174.227
  public loginUrl : string = "http://39.106.173.211:8888/v1";

  //本地数据测试
  // public apiUrl = '../../assets/json'
  
  //测试跨域api接口
  // public apiUrl = "http://39.108.159.135/api";

  constructor() {
    console.log('Hello ConfigProvider Provider');
  }

}
