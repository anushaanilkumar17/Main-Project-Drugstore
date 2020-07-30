import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../order-list/order.model';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-update-and-delete',
  templateUrl: './update-and-delete.component.html',
  styleUrls: ['./update-and-delete.component.css']
})
export class UpdateAndDeleteComponent implements OnInit {
  title:String = "Update or Cancel Your Orders";
  orders: OrderModel[];
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

deleteOrder(id){
  console.log("deleted" + id);
  this.orderService.deleteOrder(id);
  alert("Are you sure to delete this item?");
  this.router.navigate(['/orders']);

}

constructor(private orderService: OrderService, private router: Router,private auth:AuthService) {}

  ngOnInit(): void {
    let id = this.auth.userId();
    this.orderService.getOrder(id).subscribe((data)=>{
      this.orders=JSON.parse(JSON.stringify(data));
    })
  }

}
