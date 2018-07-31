import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchbarsPage } from './searchbars';

@NgModule({
  declarations: [
    SearchbarsPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchbarsPage),
  ],
})
export class SearchbarsPageModule {}
