import { LightningElement, track, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class PubsubFilterContacts extends LightningElement {
    
    @wire(CurrentPageReference) pageRef;

    @track filterValue;
    @track submittedFilterValue;

    /**
     * Input from Design parameters in Lightning App Builder.
     * Name should match the property name given in meta.xml file
     */
    @api componentLabel;
    //@api filterLabel;//Input from parent component

    handleChange(event){
        this.filterValue=event.target.value;
    }

    handleClick(){
        /**
         * Don’t use the window or document global properties to query for DOM elements
         * Don’t use ID selectors with querySelector. The IDs that you define in HTML templates
         *  may be transformed into globally unique values when the template is rendered.
         */
        let filterBox = this.template.querySelector("lightning-input");
        let filterKeyValue = filterBox.value;
        this.submittedFilterValue=filterKeyValue;
        
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Event dispatched using pubsub module',
                message: this.submittedFilterValue,
                variant: 'success'
            })
        );

        fireEvent(this.pageRef, 'pubsubfilterkeysubmit', this.submittedFilterValue);

    }
}