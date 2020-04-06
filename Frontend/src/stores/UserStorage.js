import {extendObservable} from 'mobx';

class Userstorage {
    constructor(){
        extendObservable(this, {
            loading: true,
            isLoggedIn: false,
            username: ''
        })
    }
}

export default new Userstorage();
