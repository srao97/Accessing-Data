import { LightningElement,wire,track } from 'lwc';
import getAllAccounts from '@salesforce/apex/AccountManager.getAccount';

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
        }).catch(error=>{
            console.error('error in getting the accounts',error.body.message);
        })
    }
}