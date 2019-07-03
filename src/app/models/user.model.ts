export interface UserModel {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    picture?: string;
    role?: string;
}

export interface PrivateDataModel {
    username: string;
    password: string;
}
