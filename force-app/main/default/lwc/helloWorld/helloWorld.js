import { LightningElement,track } from 'lwc';

export default class HelloWorld extends LightningElement {
    @track displayString="Hello World";

    handleClick(event){
        this.displayString="Button Clicked @ "+ (new Date()).toTimeString();
    }
}