import {wrkTags, tags, comments} from '../workshops/workshops-data/additional';
import {Tag, Comment} from './additional';

export class Workshop {
    id: number;
    title: string;
    text: string;
    img: string;
    date: Date;
    likes: number;

    constructor(id: number, title: string,
                text: string, img: string,
                date: Date, likes: number) {

        this.id = id;
        this.title = title;
        this.text = text;
        this.img = img;
        this.date = date;
        this.likes = likes;
    }

    getTags(): Array<Tag> | null {
        // get id tags for this Workshop
        const tagsId = wrkTags.filter(
            wrkTag => wrkTag.wrkId === this.id).map(
            wrkId => wrkId.tagId);
        if (!tagsId) {
            return null;
        }
        // get tags objects
        return tags.filter(tag => {
            for (const tagId of tagsId) {
                if (tag.id === tagId) {
                    return true;
                }
            }
            return false;
        });
    }

    getShordDescr(): string {
        return this.text.slice(0, 125);
    }

    liked(youLikeIt: boolean): void {
        this.likes += youLikeIt ? 1 : -1;
    }

    getComments(): Array<Comment> {
        return comments.filter(comment =>
            comment.wrkId == this.id);
    }
}

