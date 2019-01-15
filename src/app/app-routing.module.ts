import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './middle/register/register.component';
import { MiddleContentComponent } from './middle/middle-content/middle-content.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../service/auth.guard';
import { CustomerManagementComponent } from './manager/customer-management/customer-management.component';
import { ProductCategoryManagementComponent } from './manager/product-category-management/product-category-management.component';
import { ProductManagementComponent } from './manager/product-management/product-management.component';
import { SeaFoodCategoryComponent } from './middle/sea-food-category/sea-food-category.component';
import { JunkfoodPageComponent } from './middle/junkfood-page/junkfood-page.component';
import { CartComponent } from './middle/cart/cart.component';


const routes: Routes = [
  {
    path: 'homepage', component: HomePageComponent, children: [
      { path: 'main', component: MiddleContentComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'seafoodcategory', component: SeaFoodCategoryComponent },
      { path: 'junkfoodcategory', component: JunkfoodPageComponent },
      { path: 'cart', component: CartComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard],children:[
    { path: 'customer', component: CustomerManagementComponent},
    { path: 'productcategory', component: ProductCategoryManagementComponent},
    { path: 'product', component: ProductManagementComponent},
  ] },
  { path: 'admin', component: LoginComponent },
  { path: '', redirectTo: '/homepage/main', pathMatch: 'full' },

];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes),
  ],
})
export class AppRoutingModule { }