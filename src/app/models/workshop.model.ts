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

