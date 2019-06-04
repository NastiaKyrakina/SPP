export interface Like {
    wrkId: number;
    userId: number;
}

export interface Comment {
    id: number;
    wrkId: number;
    userId: number;
    text: string;
    date: Date;
}

export interface Tag {
    id: number;
    key: string;
    selected?: boolean;
}

export interface WorkshopTag {
    tagId: number;
    wrkId: number;
}
