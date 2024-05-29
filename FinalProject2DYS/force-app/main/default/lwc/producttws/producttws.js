import { LightningElement,wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPro from '@salesforce/apex/ProductDetails.methodName';
import twsElectronic from'@salesforce/resourceUrl/twsElectronic';
import { CurrentPageReference } from 'lightning/navigation'; 
import { fireEvent } from 'c/pubSub';
import incQuan from '@salesforce/apex/ProductDetails.increaseQuantity';
import decQuan from '@salesforce/apex/ProductDetails.decreaseQuantity';
import fetchQuant from '@salesforce/apex/ProductDetails.fetchQuantity';
import { refreshApex } from '@salesforce/apex';

export default class Producttws extends LightningElement {

    @wire(CurrentPageReference)pageref;
    pname;
    pprice;
    pdescription;
    proData;
    proId;
    pquant;
    pstock;
    imageurl=twsElectronic;
    cartprop=0;
    tocart=0;

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
            console.log(data[8].Name);
            this.pname=data[8].Name;
            this.pprice=data[8].price__c;
            this.pdescription=data[8].Description__c;
            this.proId=data[8].prod_id__c;
            this.pstock=data[8].StockAvailable__c;
        }
        else if(error){
            console.log(error);
        }
    };
    cartchange(){
        if(parseInt(this.pstock)>parseInt(this.cartprop))
        {
        const event = new ShowToastEvent({
            title: 'Success',
            message:'Your product is added to cart',
            variant:'success'
        });
        this.dispatchEvent(event);
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
    }
    else{
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
        // const event = new ShowToastEvent({
        //     title: 'Sad',
        //     message:'Your product is remove from cart',
        //     variant:'success'
        // });
        // this.dispatchEvent(event);
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
}
    }

}