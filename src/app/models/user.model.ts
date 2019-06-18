export interface UserModel {
    _id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    picture?: string;

}

export interface PrivateDataModel {
    username: string;
    password: string;
}
