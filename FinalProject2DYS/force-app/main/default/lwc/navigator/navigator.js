import { LightningElement } from 'lwc';

export default class Navigator extends LightningElement {
    selectedOption;
 
    handleNavigate(event) {
        const target = event.target.dataset.target;
        this.selectedOption = target;
    }
}