import {Action} from '@ngrx/store';
import {QuizParams} from '../../quizzes/services/quiz.service';
import {WorkshopParams} from '../services/workshop.service';
import {CommentModel, WorkshopModel} from '../../models/workshop.model';
import {Tag} from '../../models/additional.model';
import {UserModel} from '../../models/user.model';

export enum WorkshopsActionTypes {
    WorkshopsRequested = '[Workshops] Quizzes Requested',
    WorkshopsLoaded = '[Workshops] Quizzes Loaded',
    WorkshopsLoadingFailed = '[Workshops] Quizzes Loading Failed',

    WorkshopRequested = '[Workshop] Workshop Requested',
    WorkshopLoaded = '[Workshop] Workshop Loaded',
    WorkshopLoadingFailed = '[Workshop] Workshop Loading Failed',

    WorkshopCommentsRequested = '[Workshop Comments] Workshop Comments Requested',
    WorkshopCommentsLoaded = '[Workshop Comments] Workshop Comments Loaded',
    WorkshopCommentsLoadingFailed = '[Workshop Comments] Workshop Comments Loading Failed',

    WorkshopCommentsCreating = '[Workshop Comments] Workshop Comments Creating',
    WorkshopCommentsCreated = '[Workshop Comments] Workshop Comments Created',
    WorkshopCommentsCreatingFailed = '[Workshop Comments] Workshop Comments Creating Failed',

    WorkshopCommentsUpdating = '[Workshop Comments] Workshop Comments Updating',
    WorkshopCommentsUpdated = '[Workshop Comments] Workshop Comments Updated',
    WorkshopCommentsUpdatingFailed = '[Workshop Comments] Workshop Comments Updating Failed',

    WorkshopCommentsDeleting = '[Workshop Comments] Workshop Comments Deleting',
    WorkshopCommentsDeleted = '[Workshop Comments] Workshop Comments Deleted',
    WorkshopCommentsDeletingFailed = '[Workshop Comments] Workshop Comments Deleting Failed',

    TagsRequested = '[Workshop Tags] Workshop Tags Requested',
    TagsLoaded = '[Workshop Tags] Workshop Tags Loaded',
    TagsLoadingFailed = '[Workshop Tags] Workshop Tags Loading Failed',

    UsersRequested = '[Users] Users Requested',
    UsersLoaded = '[Users] Users Loaded',
    UsersLoadingFailed = '[Users] Users Loading Failed',
}

// get workshops feed
export class WorkshopsRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsRequested;

    constructor(public payload: { queryParams: WorkshopParams }) {
    }
}

export class WorkshopsLoaded implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsLoaded;

    constructor(public payload: { workshops: Array<WorkshopModel> }) {
    }
}

export class WorkshopsLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsLoadingFailed;

    constructor(public payload: { error: any }) {
    }
}

// get one workshop
export class WorkshopRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopRequested;

    constructor(public payload: { workshopId: string }) {
    }
}

export class WorkshopLoaded implements Action {
    readonly type = WorkshopsActionTypes.WorkshopLoaded;

    constructor(public payload: { workshop: WorkshopModel }) {
    }
}

export class WorkshopLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopLoadingFailed;

    constructor(public payload: { error: any }) {
    }
}

// get workshop comments
export class WorkshopCommentsRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsRequested;

    constructor(public payload: { workshopId: string }) {
    }
}

export class WorkshopCommentsLoaded implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsLoaded;

    constructor(public payload: { comments: Array<CommentModel> }) {
    }
}

export class WorkshopCommentsLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsLoadingFailed;

    constructor(public payload: { error: any }) {
    }
}

export class TagsRequested implements Action {
    readonly type = WorkshopsActionTypes.TagsRequested;
}

export class TagsLoaded implements Action {
    readonly type = WorkshopsActionTypes.TagsLoaded;

    constructor(public payload: { tags: Array<Tag> }) {
    }
}

export class TagsLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.TagsLoadingFailed;

    constructor(public payload: { error: any }) {
    }
}

export class UsersRequested implements Action {
    readonly type = WorkshopsActionTypes.UsersRequested;

    constructor(public payload: { usersIds: string[]}) {
    }
}

export class UsersLoaded implements Action {
    readonly type = WorkshopsActionTypes.UsersLoaded;

    constructor(public payload: { users: Array<UserModel> }) {
    }
}

export class UsersLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.UsersLoadingFailed;

    constructor(public payload: { error: any }) {
    }
}

export type WorkshopsActions =
    WorkshopsRequested |
    WorkshopsLoaded |
    WorkshopsLoadingFailed |
    WorkshopRequested |
    WorkshopLoaded |
    WorkshopLoadingFailed |
    WorkshopCommentsRequested |
    WorkshopCommentsLoaded |
    WorkshopCommentsLoadingFailed |
    TagsRequested |
    TagsLoaded |
    TagsLoadingFailed |
    UsersRequested |
    UsersLoaded |
    UsersLoadingFailed;
