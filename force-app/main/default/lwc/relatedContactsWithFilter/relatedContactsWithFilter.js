import { LightningElement,api,track } from 'lwc';
import getRelatedContactsByFilter from '@salesforce/apex/ContactController.getRelatedContactsByFilter';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' }
];

export default class RelatedContactsWithFilter extends LightningElement {
    
    @api recordId;//Inherits Account Record Id from Account Record Page

    @track columns = COLUMNS;
    @track data;


    //Lifecycle hook which fires when a component is inserted into the DOM
    connectedCallback(){
        this.loadRelatedContacts("");
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

    handleFilterKeySubmit(event){
        let filterKey = event.detail;
        this.loadRelatedContacts(filterKey);
    }
}