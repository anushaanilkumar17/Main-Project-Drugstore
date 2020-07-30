import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderModel } from './order.model';
import { OrderService } from '../order.service';
import {AuthService} from '../auth.service';
import { Lexer } from '@angular/compiler';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  title:String = "Order List";
  orders: OrderModel[];
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  // sub;
  constructor(private orderService: OrderService,private auth:AuthService) { 
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  // ngOnDestroy(){this.sub.unSubscribe()}
  ngOnInit(): void {
    // this.sub=
    if(this.auth.userRole()=='user')
    {
      let id=  this.auth.userId();
      this.orderService.getOrder(id).subscribe((data)=>{
      this.orders=JSON.parse(JSON.stringify(data));
      if(this.orders==null)
      {
        alert("Order List is Empty!")
      }
    })
    }
    else
    {
      if(this.auth.userRole()=='admin')
      {
        this.orderService.getAllOrders().subscribe((data)=>{
          this.orders=JSON.parse(JSON.stringify(data));
          if(this.orders==null)
          {
            alert("Order List is Empty!!")
          }
        })
      }
      else
      {
        alert("Login with Some valid Credentials!!")
      }
    }
    
   
   
  }

}

