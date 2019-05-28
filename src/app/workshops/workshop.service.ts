import {Injectable} from '@angular/core';

import {Workshop} from '../module/Workshop';
import {Comment, Tag, WorkshopTag} from '../module/additional';

let workshops: Array<Workshop> = [
    new Workshop(1, 'Angular Console: What is it and why is it valuable for you?',
        `In its current form, Angular Console aims to provide an easy to understand interface for the Angular CLI. The mental model it attempts to convey through Console’s UI design is merely a reflection of the core concepts used by the CLI itself. We believe that mirroring the CLIs mental model through a GUI is beneficial for both experts and novices writing Angular code.
        For novice Angular developers, it is overwhelming to have to learn both about a new framework and also the concepts of a new toolchain at the same time. Our graphical representation of Angular’s toolchain makes learning its concepts easier and more intuitive.
        For more practiced developers, the benefit of mirroring the Angular CLIs core concepts is that they no longer have to parse the Angular CLI’s metadata containing JSON in order to understand an Angular workspace’s structure. Humans were not meant to parse JSON files. Rather, we are far more effective at understanding and enjoying purposefully made user interfaces.`,
        '/assets/img/workshops/angular-infinity-wall.jpg', new Date(), 3),
    new Workshop(2, 'MEAN Stack: A Complete Guide',
        `When building an application from scratch, employing a consistent, standardized software stack is vital. Creating your backend with a set of tools designed to work together reduces development time and streamlines resources.

However, the stack field is getting crowded. From LAMP to Ruby on Rails, there are a number of options. Each stack has its benefits and downsides and is geared for different projects. There’s no one-size-fits-all stack for development.

A relatively new stack, MEAN stands for MongoDB, Express.js, AngularJS, and Node.js. MEAN is an end-to-end JavaScript stack largely used for cloud-ready applications. Understanding why you might use it, identifying examples of when to employ it and diving deeper into the individual components can help you maximize the value of MEAN for software development.

If you want to see how easy it is to develop and deploy an application to the cloud using a MEAN stack, IBM offers a simple tutorial for creating a modern application in a MEAN stack.`,
        '/assets/img/workshops/js.png', new Date(), 3333),
    new Workshop(3, 'An Introduction to PUG',
        `Pug (formerly known as Jade) is a preprocessor which simplifies the task of writing HTML. It also adds a ton of functionality, such as Javascript objects, conditionals, loops, mixins and templates. The syntax is arguably a lot cleaner to read and it can be a real time-saver when working with a lot of HTML (especially frameworks such as Bootstrap, Foundation, etc).`,
        '/assets/img/workshops/pug.jpg', new Date(), 0),
];

let comments: Array<Comment> = [
    {
        id: 1,
        wrkId: 1,
        userId: 1,
        text: 'comment',
        date: new Date(),
    },
    {
        id: 2,
        wrkId: 2,
        userId: 2,
        text: 'Interesting. Is there a continuation?',
        date: new Date(),
    },
    {
        id: 3,
        wrkId: 1,
        userId: 2,
        text: 'Hello!',
        date: new Date(),
    },
];

let tags: Array<Tag> = [
    {
        id: 1,
        key: 'Angular'
    },
    {
        id: 2,
        key: 'Pug'
    },
    {
        id: 3,
        key: 'JavaScript'
    },
    {
        id: 4,
        key: 'News'
    },
    {
        id: 5,
        key: 'Skills'
    },
    {
        id: 6,
        key: 'MEAN'
    }
];

let wrkTags: Array<WorkshopTag> = [
    {
        tagId: 1,
        wrkId: 1.
    },
    {
        tagId: 2,
        wrkId: 1.
    },
    {
        tagId: 3,
        wrkId: 1.
    },
    {
        tagId: 4,
        wrkId: 1.
    },
    {
        tagId: 6,
        wrkId: 2.
    },
    {
        tagId: 5,
        wrkId: 3.
    },
    {
        tagId: 2,
        wrkId: 3.
    },
];

@Injectable({
    providedIn: 'root',
})
export class WorkshopService {

    constructor() {
    }
    getArticles(): Array<Workshop> {
        return workshops;
    }
    getWorkshop(id: number): Workshop {
        return workshops.filter(
            workshop => workshop.id === id)[0];
    }
    getComments(id: number): Array<Comment> {
        return comments;
    }
    getTags(): Array<Tag> {
        return tags;
    }
    // return the list of workshops
    // return comment for workshops
    // return tag list
}
