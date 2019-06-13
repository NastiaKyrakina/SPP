import {UserModel} from '../app/models/user.model';
export const users: Array<UserModel> = [
    {
        id: 1,
        fname: 'Louis',
        lname: 'George',
        img: 'user.png'
    },
    {
        id: 2,
        fname: 'Stephan',
        lname: 'Lozarus',
        img: ''
    },
    {
        id: 3,
        fname: 'Kate',
        lname: 'Lomova',
        img: 'user.png'
    },
];

export let currentUser =  users[0];
