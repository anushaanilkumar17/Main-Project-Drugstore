import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { AuthGuard } from './auth.guard';
import { ContactComponent } from './contact/contact.component';
import { UpdateComponent } from './update/update.component';
import { UpdateAndDeleteComponent } from './update-and-delete/update-and-delete.component';
import { OrderListComponent } from './order-list/order-list.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent

  },
  {
    path: 'addorder',
    component:NewOrderComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'update/:id',
    component: UpdateComponent
  },

  {
    path:'orders',
    component: OrderListComponent,
    canActivate: [AuthGuard]
  },

  {
    path:'delete',
    component: UpdateAndDeleteComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
