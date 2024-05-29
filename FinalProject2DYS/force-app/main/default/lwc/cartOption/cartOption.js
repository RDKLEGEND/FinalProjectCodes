import { LightningElement,wire,api,track } from 'lwc';
import CartImage from '@salesforce/resourceUrl/CartImage';
import getOrd from '@salesforce/apex/OrderCreation.methodName';
import { registerListener, unregisterAllListeners } from 'c/pubSub'; 
import { CurrentPageReference } from 'lightning/navigation'; 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPro from '@salesforce/apex/ProductDetails.cartItemsAvailable';
import getTot from '@salesforce/apex/ProductDetails.totalAmount';
import { refreshApex } from '@salesforce/apex';
import makeDefault from '@salesforce/apex/ProductDetails.setasdefault';
import stockAvail from '@salesforce/apex/ProductDetails.reduceStock';
import allQuantity from '@salesforce/apex/ProductDetails.allQuantity';
//import cartValue from '@salesforce/apex/CartDataClass.methodName';

export default class CartOption extends LightningElement {
    imageurl=CartImage;
    isCartOpen=false;
    isCheckOut=false;
    showNotification=false;
    showProductDetails=false;
    isEnd=false;
    cartValue=0;
    @track cartItem=[];
    @track prname='';
    tamt=0;
    proList;
    @wire (CurrentPageReference) pageRef;
    // @wire(allQuantity)getQuant({data, error}){     //{ inputParams: '$parameterObject' }
    //     if(data){
    //         this.cartValue = parseInt(data);
    //         console.log(data);
    //     }
    //     else if(error){
    //         console.log(error);
    //     }
    // };
     connectedCallback() {
 
        registerListener('mobile1',this.handleCallback,this);
 
    } 
    disconnectedCallback() {

        unregisterAllListeners(this);

    }
    handleCallback(detail){
        //let obj=detail;
        this.cartItem.push(detail);
        this.prname=detail.proname;
        //let citem=detail.cart;
        if(parseInt(detail.cart)!=0)
        {
            this.cartValue=parseInt(this.cartValue)+1;
        }
        else if(parseInt(detail.cart)==0 && parseInt(this.cartValue)!=0){
            this.cartValue=parseInt(this.cartValue)-1;
        }
        if(parseInt(this.cartValue)!=0)
        {
            this.showNotification=true;
        }
        else{
            
            this.showNotification=false;
        }
    }

    orderName='';
    addrs='';
    phoneNo='';
    eml='';
    selectedvalue='';
    options=[
        {label: 'Cash on delivery',value:'Cash on delivery'},
        {label: 'Debit card',value:'Debit card'},
        {label: 'UPI',value:'UPI'}
    ];
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
    paychange(event){
        this.selectedvalue=event.detail.value;
    }

    // @wire(getPro,{count: '$flag'}) rrec({data,error}){
    //     if(data)
    //     {
    //         this.proList=data;
    //     }
    //     else{
    //         console.log('error');
    //     }
    // }
    @wire(getPro) rrec;
    @wire(getTot) trec;
    openCart()
    {
        refreshApex(this.getQuant);
        if(parseInt(this.cartValue)!=0){
            this.showProductDetails=true;
            refreshApex(this.rrec);
            refreshApex(this.trec);

        // getPro()
        // .then(result=>{
            
        //     this.proList=result;
        //     refreshApex(this.proList);

        // })
        // .catch(error=>{
        //     alert(error);
        // }); 
    }
    else{
        this.showProductDetails=false;
    }
        this.isCartOpen=true;
    }
    
    checkoutchange(){
        if(parseInt(this.cartValue)>0){
        this.isCheckOut=true;
        //this.isCartOpen=false;
        }
        else{
            this.isCheckOut=false;
            alert('There are no items in your cart to checkout');
        }
        
    }

    closechange()
    {
        this.showProductDetails=false;
        this.isCartOpen=false;
       // this.proList = null;
    }

    confirmchange(){
        if(!this.selectedvalue || !this.orderName || !this.addrs || !this.phoneNo || !this.eml){
            alert('Please fill all the required fields to confirm your order');
        }
        else{
        getOrd({oname: this.orderName,
            quants: this.cartValue,
            amnt: this.trec.data,
            adrs:this.addrs,
            phn:this.phoneNo,
            mail:this.eml,
            pay:this.selectedvalue}).then(result=>{
            const evt=new ShowToastEvent({
                title:'Success',
                message:'Order created successfully',
                variant:'success'
            })
            this.cartValue=0;
            this.dispatchEvent(evt);
            this.isEnd=true;
        })
        .catch(error=>{
            const evt=new ShowToastEvent({
                title:'Error',
                message:'Order creation failed',
                variant:'Error'
            })
            this.dispatchEvent(evt);
            this.isEnd=false;
        });
        this.isCheckOut=false;
        this.isCartOpen=false;
    }
        
    }
    cancelchange(){
        this.isCheckOut=false;
    }
    endchange(){
        stockAvail().then(result=>{
            console.log('yes');
        }).catch(error=>{
            console.log('No');
        });
        
        makeDefault().then(result=>{
            console.log('ok');
        }).catch(error=>{
            console.log('No');
        });
        location.reload();
        this.isEnd=false;
    }

}