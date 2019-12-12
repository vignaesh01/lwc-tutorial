import { LightningElement,api,track } from 'lwc';
//import an Apex method via the @salesforce/apex packages
import getRelatedContacts from '@salesforce/apex/ContactController.getRelatedContacts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

export default class RelatedContacts extends LightningElement {
    @api recordId;//Inherits Account Record Id from Account Record Page

    @track columns = COLUMNS;
    @track data;
    @track isError=false;
    @track errorMessage;

    //Lifecycle hook which fires when a component is inserted into the DOM
    connectedCallback(){
        this.loadRelatedContacts();
    }
    
    loadRelatedContacts(){
        //Returns a promise
        getRelatedContacts({accountId : this.recordId})
        .then(results=>{
            this.data=results;
            this.isError=false;
        })
        .catch(error=>{
            this.isError=true;
            this.errorMessage=error.body.message;    
        });
    }

/**
 * Normal function
 * ------------------
 * 
 * function foo(str){
 *  return "I am a Normal function "+str;
 * }
 * 
 * Arrow function (short hand notation)
 * ------------------------------------
 *  
 * str=>{
 *  return "I am a Normal function "+str;
 * }
 * 
 */
}