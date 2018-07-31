import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search';
//引用ionicmodule识别ion标签
import { IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CounterInputComponent } from './counter-input/counter-input';

@NgModule({
	declarations: [SearchComponent,
    CounterInputComponent],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule
	],
	exports: [SearchComponent,
    CounterInputComponent]
})
export class ComponentsModule {}
