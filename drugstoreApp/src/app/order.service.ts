import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  
  private _deleteOrderUrl ="http://localhost:3000/api/deleteOrder"

  constructor(private http:HttpClient) { }

  getAllOrders()
  {
    return this.http.get("http://localhost:3000/api/allOrders");
  }

  getOrder(id){
    return this.http.post("http://localhost:3000/api/orders",{"userId":id});
  }

  newOrder(item){
    return this.http.post("http://localhost:3000/api/insert",{"order":item})
    .subscribe(data =>{console.log(data)})
  }

  uploadImage(profileImage:File){
    var formData=new FormData();
    formData.append("file", profileImage);
    return this.http.post("http://localhost:3000/api/presImgUpload", formData);
  }

  updateOrder(item){
    return this.http.post("http://localhost:3000/api/update",{"order":item})
    .subscribe(data =>{console.log(data)})
  }

  oneOrder(id){
    return this.http.post("http://localhost:3000/api/oneOrder",{"id":id})
  }

  deleteOrder(id){
    console.log(id);
    return this.http.post(this._deleteOrderUrl,{"id":id}).subscribe((status)=>{
    console.log(status);

    })
    
  }
}



