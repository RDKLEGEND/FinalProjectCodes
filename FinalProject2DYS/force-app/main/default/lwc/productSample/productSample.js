import { LightningElement,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import getOrd from '@salesforce/apex/OrderCreation.methodName';
import LaptopImage from'@salesforce/resourceUrl/LaptopImage';
//import LightningAlert from 'lightning/alert';
import getPro from '@salesforce/apex/ProductDetails.methodName';
//import cartValue from '@salesforce/apex/CartDataClass.methodName';
import { CurrentPageReference } from 'lightning/navigation'; 
import { fireEvent } from 'c/pubSub';
import incQuan from '@salesforce/apex/ProductDetails.increaseQuantity';
import decQuan from '@salesforce/apex/ProductDetails.decreaseQuantity';
import fetchQuant from '@salesforce/apex/ProductDetails.fetchQuantity';
import { refreshApex } from '@salesforce/apex';

export default class ProductSample extends LightningElement {
    @wire(CurrentPageReference)pageref;
    pname;
    pprice;
    pdescription;
    proData;
    proId;
    pquant;
    pstock;
    isSelected=false;

    @wire(fetchQuant, {pId: '$proId'})getQuant({data, error}){     //{ inputParams: '$parameterObject' }
        if(data){
            this.cartprop = parseInt(data.Quantity__c);
            console.log(data.Quantity__c);
        }
        else if(error){
            console.log(error);
        }
    };

    @wire(getPro)proList({data,error}){
        if(data){
            console.log(data[9].Name);
            this.pname=data[9].Name;
            this.pprice=data[9].price__c;
            this.pdescription=data[9].Description__c;
            this.proId=data[9].prod_id__c;
            this.pstock=data[9].StockAvailable__c;
        }
        else if(error){
            console.log(error);
        }
    };
    //productName='';
    //lprice=50000;
    tocart=0;
    cartprop=0;
    tamnt=0;
    imageurl=LaptopImage;
    openOrClose=false;
    orderName='';
    addrs='';
    phoneNo='';
    eml='';
    namechange(event){
        this.orderName=event.target.value;
    }
    addresschange(event){
        this.addrs=event.target.value;
    }
    phonechange(event){
        this.phoneNo=event.target.value;
    }
    emailchange(event){
        this.eml=event.target.value;
    }
    cartchange(){
        if(parseInt(this.pstock)>parseInt(this.cartprop))
        {
        this.isSelected=true;
        //alert('Your product added to cart');
        this.cartprop=parseInt(this.cartprop)+1;
        this.tocart=1;
        let newobj={
            proname:this.pname,
            proprice:this.pprice,
            cart :this.tocart
        }
        fireEvent(this.pageref,'mobile1',newobj);
        incQuan({
            pId:this.proId,
            quant:this.cartprop
        }).then(result=>{
        const event = new ShowToastEvent({
            title: 'Success',
            message:'Your product is added to cart',
            variant:'success'
        });
        refreshApex(this.getQuant);
        this.dispatchEvent(event);
    }).catch(error=>{
        console.log('error');
    })
    }else{
        const event = new ShowToastEvent({
            title: 'Not Available',
            message:'Item out of stock',
            variant:'Error'
        });
        this.dispatchEvent(event);
    }
}
    cartremove(){
        refreshApex(this.getQuant);
        //alert('Your product added to cart');
        if(parseInt(this.cartprop)>0){
        this.cartprop=parseInt(this.cartprop)-1;
        this.tocart=0;
        
        let newobj={
            proname:'',
            proprice:this.pprice,
            cart :this.tocart
        }
        fireEvent(this.pageref,'mobile1',newobj);
        decQuan({
            pId:this.proId,
            quant:this.cartprop
        }).then(result=>{
        const event = new ShowToastEvent({
            title: 'Sad',
            message:'Your product is remove from cart',
            variant:'info'
        });
        refreshApex(this.getQuant);
        this.dispatchEvent(event);
    }).catch(error=>{
        console.log('error');
    })
}else{
    this.isSelected=false;
}
        
}
}
    // buychange(){
    //     if(parseInt(this.cartprop)!=0){
            
    //         this.openOrClose=true;
    //     }
    //     else
    //     {
    //         alert('Add items in your cart before buying');
    //         return;
    //     }
    // }
    // confirmchange(){
    //     this.tamnt=parseInt(this.pprice)*parseInt(this.cartprop)
    //     getOrd({oname: this.orderName,
    //         quants: this.cartprop,
    //         amnt: this.tamnt,
    //         adrs:this.addrs,
    //         phn:this.phoneNo,
    //         mail:this.eml}).then(result=>{
    //         const evt=new ShowToastEvent({
    //             title:'Success',
    //             message:'Order created successfully',
    //             variant:'success'
    //         })
    //         this.cartprop=0;
    //         this.dispatchEvent(evt);
            
    //     })
    //     .catch(error=>{
    //         const evt=new ShowToastEvent({
    //             title:'Error',
    //             message:'Order creation failed',
    //             variant:'Error'
    //         })
    //         this.dispatchEvent(evt);
    //     });
    //     this.openOrClose=false;
    // }
    // cancelchange(){
    //     this.openOrClose=false;
    // }
