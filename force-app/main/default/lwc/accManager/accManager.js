import { LightningElement,wire,track } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccount';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class AccManager extends LightningElement {
    /*@wire(getAllAccounts)
    accounts;*/

    @track numberOfRecords;
    @track accounts;

    responseReceived(){
        if(this.accounts){
            return true;
        }
            return false;

    }
    numberOfAccountChangeHandler(event){
        this.numberOfRecords=event.target.value;
    }
    getAccounts(){
        getAllAccounts({numberOfRecords:this.numberOfRecords}).then(response=>{
            this.accounts=response;
            const toastEvent=new ShowToastEvent({
                title:'Account Loaded',
                message:this.numberOfRecords +' Accounts Fetched from server',
                variant : 'success',

            });
            this.dispatchEvent(toastEvent);
        }).catch(error=>{
            console.error('error in getting the accounts',error.body.message);
            const toastEvent = new ShowToastEvent({
                title : 'Error',
                message : this.numberOfRecords + ' Please input the value',
                variant : 'error',
            });
            this.dispatchEvent(toastEvent);
        })
    }
}