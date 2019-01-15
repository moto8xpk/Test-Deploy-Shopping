import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiddleContentComponent } from './middle-content/middle-content.component';
import { TopMiddleContentComponent } from './top-middle-content/top-middle-content.component';
import { BotMiddleContentComponent } from './bot-middle-content/bot-middle-content.component';
import { RegisterComponent } from './register/register.component';
import { CompareValidatorDirective } from '../../shared/compare-validator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JunkfoodPageComponent } from './junkfood-page/junkfood-page.component';
import { SeaFoodCategoryComponent } from './sea-food-category/sea-food-category.component';
import { CartComponent } from './cart/cart.component';
import { AppRoutingModule } from '../app-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  declarations: [
    MiddleContentComponent,
    TopMiddleContentComponent,
    BotMiddleContentComponent,
    RegisterComponent,
    CompareValidatorDirective,
    JunkfoodPageComponent,
    SeaFoodCategoryComponent,
    CartComponent,
  ],
  exports:[
    MiddleContentComponent,
    RegisterComponent
  ]
})
export class MiddleModule { }
