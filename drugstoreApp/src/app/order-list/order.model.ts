export class OrderModel{
    constructor(
        public userId:String,
        public name : string,
        public age : number,
        public place : string,
        public phoneNumber : number,
        public medicineName : string,
        public doctorsName : string,
        public prescription : string){}
}