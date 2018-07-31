import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpellPage } from './spell';

@NgModule({
  declarations: [
    SpellPage,
  ],
  imports: [
    IonicPageModule.forChild(SpellPage),
  ],
})
export class SpellPageModule {}
