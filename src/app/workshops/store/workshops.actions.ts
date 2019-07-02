import {Action} from '@ngrx/store';

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
}

// get workshops feed
export class WorkshopsRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsRequested;
}

export class WorkshopsLoaded implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsLoaded;
}

export class WorkshopsLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsLoadingFailed;
}

// get one workshop
export class WorkshopRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopRequested;
}

export class WorkshopLoaded implements Action {
    readonly type = WorkshopsActionTypes.WorkshopLoaded;
}

export class WorkshopLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopLoadingFailed;
}

// get workshop comments
export class WorkshopCommentsRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsRequested;
}

export class WorkshopCommentsLoaded implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsLoaded;
}

export class WorkshopCommentsLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsLoadingFailed;
}

export class TagsRequested implements Action {
    readonly type = WorkshopsActionTypes.TagsRequested;
}

export class TagsLoaded implements Action {
    readonly type = WorkshopsActionTypes.TagsLoaded;
}

export class TagsLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.TagsLoadingFailed;
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
    TagsLoadingFailed;
