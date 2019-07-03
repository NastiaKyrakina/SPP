// const postSchema = new Schema({
//     _author: { type: Schema.Types.ObjectId, ref: 'User' },
//     tags: { type: [Number], required: true },
//     title: { type: String, required: true },
//     description: { type: String, required: false },
//     text: { type: String, required: false },
//     image: { type: String, required: false },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
//     likes: [ReactionSchema.schema],
//     stars: [ReactionSchema.schema],
//     uni: [ReactionSchema.schema],
//     comments: [CommentSchema.schema]
// });
import {UserModel} from './user.model';

export interface ReactionModel {
    userId: string;
    wrkId: string;
}

export interface CommentModel {
    _id: string;
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
    _author: string;
    title: string;
    description?: string;
    text?: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
    tags: number[];
    likes?: Array<ReactionModel>;
    likesCount?: number;
    stars?: Array<ReactionModel>;
    uni?: Array<ReactionModel>;
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

