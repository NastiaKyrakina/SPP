import {UserModel} from './user.model';

export enum ReactionTypes {
    like = 'like',
    star = 'star',
    uni = 'uni',
}

export interface ReactionModel {
    userId: string;
    wrkId: string;
}

export interface CommentModel {
    id: string;
    _post: string;
    _author: string;
    author?: UserModel;
    text: string;
    createdAt: Date;
    updatedAt: Date;
    tags?: string;
}

export interface WorkshopModel {
    id: string;
    author: string;
    title: string;
    description?: string;
    text?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    tags: number[];
    likesCount?: number;
    reactionsCounts?: {
        likes: number;
        stars: number;
        uni: number;
    };
    comments?: Array<CommentModel>;
}
//
// export class WorkshopModel {
//     id: number;
//     userId: number;
//     title: string;
//     text: string;
//     img: string;
//     date: Date;
//     likes: number;
//
//     constructor(id: number, userId: number, title: string,
//                 text: string, img: string,
//                 date: Date, likes: number) {
//
//         this.id = id;
//         this.userId = userId;
//         this.title = title;
//         this.text = text;
//         this.img = img;
//         this.date = date;
//         this.likes = likes;
//     }
// }

