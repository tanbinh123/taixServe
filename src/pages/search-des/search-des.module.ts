import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchDesPage } from './search-des';

@NgModule({
  declarations: [
    SearchDesPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchDesPage),
  ],
})
export class SearchDesPageModule {}
