import {extendObservable} from 'mobx';

class RegisterStorage {
    constructor(){
        extendObservable(this, {
            email: '',
            username:''
        })
    }
}

export default new RegisterStorage();
