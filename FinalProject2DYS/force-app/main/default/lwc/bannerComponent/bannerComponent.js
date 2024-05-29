import { LightningElement } from 'lwc';
import LaptopsAvailable from '@salesforce/resourceUrl/LaptopsAvailable';
import BooksAvailable from '@salesforce/resourceUrl/BooksAvailable';
export default class BannerComponent extends LightningElement {
    imgurl1=LaptopsAvailable;
    imgurl2=BooksAvailable;
    connectedCallback() {
        // Start the banner movement after the component is connected to the DOM
        this.startBannerMovement();
    }
 
    startBannerMovement() {
        // Move the banner images every 1 second
        this.intervalId = setInterval(() => {
            this.moveBanner();
        }, 2000);
    }
 
    moveBanner() {
        // Move the banner by adjusting the position of the banner container
        const bannerContainer = this.template.querySelector('.banner');
bannerContainer.style.transform = 'translateX(-100%)'; // Move the banner to the left
 
        // After moving, swap the image URLs
        setTimeout(() => {
            const temp = this.imgurl1;
            this.imgurl1 = this.imgurl2;
            this.imgurl2 = temp;
bannerContainer.style.transform = ''; // Reset the transform to its initial position
        }, 4000); // Half of the animation duration
    }
 
    disconnectedCallback() {
        // Clear the interval when the component is disconnected from the DOM
        clearInterval(this.intervalId);
    }

}