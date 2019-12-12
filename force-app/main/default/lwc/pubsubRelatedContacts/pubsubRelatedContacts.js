import { LightningElement,api,track, wire } from 'lwc';
import getRelatedContactsByFilter from '@salesforce/apex/ContactController.getRelatedContactsByFilter';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

export default class PubsubRelatedContacts extends LightningElement {

    @wire(CurrentPageReference) pageRef;

    @api recordId;//Inherits Account Record Id from Account Record Page

    @track columns = COLUMNS;
    @track data;


    //Lifecycle hook which fires when a component is inserted into the DOM
    connectedCallback(){
        //subscribing to the event
        registerListener('pubsubfilterkeysubmit', this.handleFilterKeySubmit, this);
        this.loadRelatedContacts("");
    }
    
    //Lifecycle hook which fires when a component is removed from the DOM
    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    loadRelatedContacts(filterKey){
        getRelatedContactsByFilter({accountId : this.recordId, key : filterKey})
        .then(results=>{
            this.data=results;
        })
        .catch(error=>{
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }

    handleFilterKeySubmit(filterKey){
        this.loadRelatedContacts(filterKey);
    }
}