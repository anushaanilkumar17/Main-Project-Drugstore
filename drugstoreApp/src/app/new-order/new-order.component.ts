import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderModel } from  '../order-list/order.model';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {
  title:String = "Add Your Order";
  image:File=null;
  constructor(private orderService: OrderService, private router:Router,private auth:AuthService) { }
  orderItem = new OrderModel(null,null,null,null,null,null,null,null);

  ngOnInit(): void {
  }

  showFiles(e)
  {
    this.image=e.target.files[0];
    let fileReader=new FileReader;
    fileReader.onload=function(event)
    {
      let imageURL=fileReader.result;
      document.getElementById('preview').setAttribute("src",`${imageURL}`);
    }
    fileReader.readAsDataURL(this.image);
  }

// changePlace(e){
//   let place=e.target.value;
//   this.orderItem.place=place;
//   console.log(place);
//   switch(place){
//     case 'Chittar':document.getElementById('locality') ['value']="AMS Medicals"; document.getElementById('chittar').setAttribute("selected","True");break
//     case 'Vayyattupuzha':document.getElementById('locality') ['value']="TBR Medicals";document.getElementById('vayyattupuzha').setAttribute("selected","True");break
//     case 'Seethathodu':document.getElementById('locality') ['value']="ASK Medicals";document.getElementById('seethathodu').setAttribute("selected","True");break
//     case 'Karikayam':document.getElementById('locality') ['value']="LMJ Medicals";document.getElementById('karikayam').setAttribute("selected","True");break
//     case 'Maniyar':document.getElementById('locality') ['value']="TLM Medicals";document.getElementById('maniyar').setAttribute("selected","True");break
//   }
// }

  AddOrder()
  {

   let message;
    this.orderItem.place=document.getElementById('locality') ['value'];
    switch(this.orderItem.place){
      case 'Chittar': message="Life Pharmaseuticals";break;
      case 'Vayyattupuzha': message="Med-X Drug";break;
      case 'Seethathodu':message="All Healthy Pharmacy";break;
      case 'Karikayam':message="City Drug";break;
      case 'Maniyar':message="Pharma Best";break;
      case 'Konni':message="Medical Hub";break;
      case 'Kumbazha':message="Mediserve";break;
      case 'Mylapra':message="Central Medicals";break;
      case 'Kumbazha':message="Mediserve";break;
      case 'Panniyar':message="Medicare";break;
      case 'Pambini':message="Pharma First Medicals";break;
    }
    alert("Shop now available in your locality is " + message);
    console.log(this.orderItem.place);
   
    let id=  this.auth.userId();
    console.log(id)
    this.orderItem.userId=id;
    
    let url;
    this.orderService.uploadImage(this.image)
    .subscribe((res)=>
    {
      url=res['url'];
      this.orderItem.prescription=url;

      this.orderService.newOrder(this.orderItem);
    })

    console.log("Called");
    alert("Your order added Successfully!!");
    this.router.navigate(['/contact']); 
    return
  }

}


