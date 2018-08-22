import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, JsonpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
// Import relevant http modules
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreatePage } from '../pages/create/create';
import { LoginPage } from '../pages/login/login';
import { DetailsPage } from '../pages/details/details';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { ConfigProvider } from '../providers/config/config';
import { StorageProvider } from '../providers/storage/storage';
import { ErrorPage } from '../pages/error/error';
import { ToolsProvider } from '../providers/tools/tools';
import { JPush } from '@jiguang-ionic/jpush';
import { Device } from '@ionic-native/device';
import { SpellPage } from '../pages/spell/spell';
import { SearchbarsPage } from '../pages/searchbars/searchbars';
import { SearchplacePage } from '../pages/searchplace/searchplace';
import { ComponentsModule } from '../components/components.module';
import { SearchDesPage } from '../pages/search-des/search-des';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //ionic cordova build android --prod --release 打包注释
    CreatePage,
    LoginPage,
    DetailsPage,
    ErrorPage,
    SpellPage,
    SearchbarsPage,
    SearchplacePage,
    SearchDesPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    CommonModule,
    ComponentsModule,
    // Import relevant http modules
    HttpClientModule,
    HttpClientJsonpModule,
    // SearchbarsPage,
    IonicModule.forRoot(MyApp,{
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreatePage,
    LoginPage,
    DetailsPage,
    ErrorPage,
    SpellPage,
    SearchbarsPage,
    SearchplacePage,
    SearchDesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpServicesProvider,
    ConfigProvider,
    StorageProvider,
    ToolsProvider,
    Device,
    JPush
  ]
})
export class AppModule {}
