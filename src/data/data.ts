import {User} from '../app/module/User';
export const users: Array<User> = [
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
