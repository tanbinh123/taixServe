import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchplacePage } from './searchplace';

@NgModule({
  declarations: [
    SearchplacePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchplacePage),
  ],
})
export class SearchplacePageModule {}
