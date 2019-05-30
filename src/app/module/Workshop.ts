export class Workshop {
    id: number;
    userId: number;
    title: string;
    text: string;
    img: string;
    date: Date;
    likes: number;

    constructor(id: number, userId: number, title: string,
                text: string, img: string,
                date: Date, likes: number) {

        this.id = id;
        this.userId = userId;
        this.title = title;
        this.text = text;
        this.img = img;
        this.date = date;
        this.likes = likes;
    }
}

