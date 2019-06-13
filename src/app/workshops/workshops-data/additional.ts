import {Like, Comment, Tag, WorkshopTag} from '../../models/additional.model';

export let comments: Array<Comment> = [
    {
        id: 1,
        wrkId: 1,
        userId: 1,
        text: 'Stext',
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


export let tags: Array<Tag> = [
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

export let wrkTags: Array<WorkshopTag> = [
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
