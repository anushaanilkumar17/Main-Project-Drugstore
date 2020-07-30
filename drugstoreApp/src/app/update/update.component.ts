import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { OrderModel } from  '../order-list/order.model';
import { Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  image:File=null;
  title:String = "Update Order List";
  orderItem = new OrderModel(null,null,null,null,null,null,null,null);
  id;
  sub;

  constructor(private orderService: OrderService, private router: Router, private activatedRoute: ActivatedRoute) { }

  // showFiles(e)
  //   {
  //     this.image=e.target.files[0];
  //     let fileReader=new FileReader;
  //     fileReader.onload=function(event)
  //     {
  //       let imageURL=fileReader.result;
  //       document.getElementById('preview').setAttribute("src",`${imageURL}`);
  //     }
  //     fileReader.readAsDataURL(this.image);
  //   }


  ngOnInit(): void {

    this.sub =
    this.activatedRoute.paramMap.subscribe((params)=>
            {
              this.id=params.get('id');
              console.log("id"+ this.id);
              this.orderService.oneOrder(this.id).subscribe((data)=>
              {
                this.orderItem = JSON.parse(JSON.stringify(data));
                switch(this.orderItem.place){
                  case 'Chittar':document.getElementById('chittar').setAttribute('selected','true');break;
                  case 'Vayyattupuzha': document.getElementById('vayyattupuzha').setAttribute('selected','true');break;
                  case 'Seethathodu':document.getElementById('seethsthodu').setAttribute('selected','true');break;
                  case 'Karikayam':document.getElementById('karikayam').setAttribute('selected','true');break;
                  case 'Maniyar':document.getElementById('maniyar').setAttribute('selected','true');break;
                  case 'Konni':document.getElementById('konni').setAttribute('selected','true');break;
                  case 'Kumbazha':document.getElementById('kumbazha').setAttribute('selected','true');break;
                  case 'Mylapra':document.getElementById('mylapra').setAttribute('selected','true');break;
                  case 'Panniyar':document.getElementById('panniyar').setAttribute('selected','true');break;
                  case 'Pambini':document.getElementById('pambini').setAttribute('selected','true');break;
                }
                console.log(this.orderItem);
              });  
              console.log(this.orderItem);
            });
          }
          
  ngOnDestroy()   
    {
      this.sub.unsubscribe();
    }     

    updateOrder()
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
      alert("Shops now available in your locality is " + message);
      console.log(this.orderItem.place);
  
      // let url;
      // this.orderService.uploadImage(this.image)
      // .subscribe((res)=>
      // {
      //   if(res['message']=="OK"){
      //     url=res['url'];
      //     this.orderItem.prescription=url;
      //     this.orderService.updateOrder(this.orderItem);
      //   }
      //   else{
          this.orderService.updateOrder(this.orderItem);

      console.log(this.orderItem);
      console.log("One order is updated successfully");
      alert("Your Order Updated Successfully!!");
      this.router.navigate(['/orders']);
    }

  }
