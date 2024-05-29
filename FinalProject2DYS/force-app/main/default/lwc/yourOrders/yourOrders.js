import { LightningElement,wire } from 'lwc';
import getPro from '@salesforce/apex/ProductDetails.cartItemsAvailable';
import getTot from '@salesforce/apex/ProductDetails.totalAmount';

export default class YourOrders extends LightningElement {
    @wire(getPro) rrec;
    @wire(getTot) trec;
}