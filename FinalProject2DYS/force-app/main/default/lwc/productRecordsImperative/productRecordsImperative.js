import { LightningElement,wire } from 'lwc';
import getPro from '@salesforce/apex/ProductDetails.methodName';

export default class ProductRecordsImperative extends LightningElement {
    pname;
    pprice;
    pdescription;
    proData;
    @wire(getPro)proList({data,error}){
        if(data){
            console.log(data[0].Name);
            this.pname=data[0].Name;
            this.pprice=data[0].price__c;
            this.pdescription=data[0].Description__c;
        }
        else if(error){
            console.log(error);
        }
    };

        //console.log(this.proList);
        //this.pname=this.proList[0].Name;
}
