const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const OrderData = require('../models/Orderdata');
const path = require('path');
const multer = require('multer');
const user = require('../models/user');

const db = 'mongodb+srv://user_anusha:Anusha123@mycluster.kbbli.azure.mongodb.net/drugstoredb?retryWrites=true&w=majority';
const DIR = 'public/img'
mongoose.connect(db, function(err){
  if(err){
      console.error('Error! ' + err)
  } else {
    console.log('Connected to mongodb')      
  }
});

const storage=multer.diskStorage
({
    destination:(req,file,callack)=>
    {
      callack(null,DIR);
    },

    filename:(req,file,callback)=>
    {
      callback(null,`PRCPN_${file.originalname}`)
    }
})
var upload=multer({storage:storage});

router.post('/presImgUpload',upload.single('file'),(req,res)=>{
  console.log("file")
  let file=req.file;
  // if(file.filename==undefined){
  //   res.send({message:"Error"})
  // }
  
    const url = req.protocol + '://' + req.get('host');
    imgUrl=url+'/public/img/'+`${file.filename}`;
    res.send({message:"OK",url:imgUrl})
  
 
})

  function verifyToken(req,res,next){
    if (!req.headers.authorization){
         return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token,'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
  
  }

router.get('/allOrders',(req,res)=>
{
  res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    OrderData.find()
               .then(function(orders){
                    console.log(orders)
                res.send(orders);          
               });
})
  router.post('/orders',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const uId=req.body.userId;
    console.log("Id"+uId)
    OrderData.find({userId:uId})
               .then(function(order){
                    console.log("log"+order)
                res.send(order);          
               });
  });
  
  router.post('/insert',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    console.log(req.body.order);
    var order= {
        name : req.body.order.name,
        userId : req.body.order.userId,
        age : req.body.order.age,
        place : req.body.order.place,
        phoneNumber : req.body.order.phoneNumber,
        medicineName : req.body.order.medicineName,
        doctorsName : req.body.order.doctorsName,
        prescription : req.body.order.prescription,
    }
    
    var order = new OrderData(order);
    order.save((err,order)=>
  {
      if(err)
      {
          console.log("errrrorrrr:"+err);
      }
      else
      {
          res.send({order})
      }
  });
  });

  router.post('/edit',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.body.id;
    console.log(id);
    OrderData.find()
    .then(function(orders){
         res.send(orders);        
    });
});

router.post('/oneOrder',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.body.id;
   OrderData.findOne({_id:id})
               .then(function(order){
                    res.send(order);          
               });
});

router.post('/update',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    OrderData.updateOne({_id:req.body.order._id},{$set:{ 
      name : req.body.order.name,
      age : req.body.order.age,
      place : req.body.order.place,
      phoneNumber : req.body.order.phoneNumber,
      medicineName : req.body.order.medicineName,
      doctorsName : req.body.order.doctorsName
      // prescription : req.body.order.prescription
    }})
        .then(function(orders){
            res.send(orders);
        });
});
    
router.post('/deleteOrder',verifyToken,function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
    const id = req.body.id;
    console.log(id);
    OrderData.deleteOne({_id:id})
               .then((data)=>{
                res.send({message:"Deleted Your order!"})          
               });
});

  
  router.get('/home', (req,res) => {
    console.log(req.body);
  });
  
  
  router.get('/contact',(req, res) => {
  })
  
  router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)      
    } else {
      // let payload = {subject: registeredUser._id}
      // let token = jwt.sign(payload, 'secretKey')
      // res.status(200).send({token})                  will coz login action
    
      res.send({message:"Successfully Signed Up!"})
    }
  })
  })
  
  router.post('/login', (req, res) => {
  let userData = req.body
  console.log(userData)
  User.findOne({email: userData.email,password:userData.password}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Credentials')
      }  
     else {
        let payload = {subject: user._id,type:user.type}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
  })
   
  module.exports = router;
  
