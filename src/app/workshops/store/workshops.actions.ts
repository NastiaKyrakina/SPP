import {Action} from '@ngrx/store';
import {QuizParams} from '../../quizzes/services/quiz.service';
import {WorkshopParams} from '../services/workshop.service';
import {CommentModel, WorkshopModel} from '../../models/workshop.model';
import {Tag} from '../../models/additional.model';
import {UserModel} from '../../models/user.model';
import {QuizModel} from '../../quizzes/models/quiz.model';
import {QuizzesActionTypes} from '../../quizzes/store/quizzes.actions';

export enum WorkshopsActionTypes {
    WorkshopsRequested = '[Workshops] Quizzes Requested',
    WorkshopsLoaded = '[Workshops] Quizzes Loaded',
    WorkshopsLoadingFailed = '[Workshops] Quizzes Loading Failed',

    WorkshopRequested = '[Workshop] Workshop Requested',
    WorkshopLoaded = '[Workshop] Workshop Loaded',
    WorkshopLoadingFailed = '[Workshop] Workshop Loading Failed',

    WorkshopDeleting = '[Workshop] Workshop Deleting',
    WorkshopDeleted = '[Workshop] Workshop Deleted',
    WorkshopDeletingFailed = '[Workshop]  omments Deleting',

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

    WorkshopQuizzesRequested = '[Workshop Quizzes] Workshop  Quizzes Requested',
    WorkshopQuizzesLoaded = '[Workshop Quizzes]  Workshop Quizzes Loaded',
    WorkshopQuizzesLoadingFailed = '[Workshop Quizzes]  Workshop Quizzes Loading Failed',

    TagsRequested = '[Workshop Tags] Workshop Tags Requested',
    TagsLoaded = '[Workshop Tags] Workshop Tags Loaded',
    TagsLoadingFailed = '[Workshop Tags] Workshop Tags Loading Failed',

    UsersRequested = '[Users] Users Requested',
    UsersLoaded = '[Users] Users Loaded',
    UsersLoadingFailed = '[Users] Users Loading Failed',

    WorkshopIdSetting = '[Workshop] Workshop Id Setting',
    WorkshopIdSet = '[Workshop]  Workshop Id Set',
    WorkshopIdSettingFailed = '[Workshop]  Workshop Id Setting Failed',

    WorkshopAddQuizRequested = '[Workshop] Add Quiz Requested',
    WorkshopQuizAdded = '[Workshop] Workshop Quiz Added',
    WorkshopQuizAddingFailed  = '[Workshop] Workshop Quiz Adding Failed',

}


// get workshops feed
export class WorkshopsRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopsRequested;

    constructor(public payload: {
        page?: string
        category?: string
        tags?: string;
    }) {
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

// delete workshop
export class WorkshopDeleting implements Action {
    readonly type = WorkshopsActionTypes.WorkshopDeleting;

    constructor(public payload: { workshopId: string}) {
    }
}

export class WorkshopDeleted implements Action {
    readonly type = WorkshopsActionTypes.WorkshopDeleted;

    constructor(public payload: { workshopId: string }) {
    }
}

export class WorkshopDeletingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopDeletingFailed;

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

// create new comment
export class WorkshopCommentsCreating implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsCreating;

    constructor(public payload: { workshopId: string, comment: string }) {
    }
}

export class WorkshopCommentsCreated implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsCreated;

    constructor(public payload: { comment: CommentModel }) {
    }
}

export class WorkshopCommentsCreatingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsCreatingFailed;

    constructor(public payload: { error: any }) {
    }
}

// update comment
export class WorkshopCommentsUpdating implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsUpdating;

    constructor(public payload: {
        workshopId: string,
        commentId: string,
        comment: string
    }) {
    }
}

export class WorkshopCommentsUpdated implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsUpdated;

    constructor(public payload: { commentId: string, comment: CommentModel }) {
    }
}

export class WorkshopCommentsUpdatingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsUpdatingFailed;

    constructor(public payload: { error: any }) {
    }
}

// delete comment
export class WorkshopCommentsDeleting implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsDeleting;

    constructor(public payload: { workshopId: string, commentId: string }) {
    }
}

export class WorkshopCommentsDeleted implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsDeleted;

    constructor(public payload: { commentId: string }) {
    }
}

export class WorkshopCommentsDeletingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopCommentsDeletingFailed;

    constructor(public payload: { error: any }) {
    }
}

export class WorkshopQuizzesRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopQuizzesRequested;
    constructor(public payload: { workshopId: string }) {
    }
}

export class WorkshopQuizzesLoaded implements Action {
    readonly type = WorkshopsActionTypes.WorkshopQuizzesLoaded;

    constructor(public payload: { quizzes: Array<QuizModel> }) {
    }
}

export class WorkshopQuizzesLoadingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopQuizzesLoadingFailed;

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

// set workshop Id (for quiz select functional)
export class WorkshopIdSetting implements Action {
    readonly type = WorkshopsActionTypes.WorkshopIdSetting;
}

export class WorkshopIdSet implements Action {
    readonly type = WorkshopsActionTypes.WorkshopIdSet;
}

export class WorkshopIdSettingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopIdSettingFailed;

    constructor(public payload: { error: any }) {
    }
}


export class WorkshopAddQuizRequested implements Action {
    readonly type = WorkshopsActionTypes.WorkshopAddQuizRequested;
    constructor(public payload: { workshopId: string, quizId: string }) {
    }
}

export class WorkshopQuizAdded implements Action {
    readonly type = WorkshopsActionTypes.WorkshopQuizAdded;

    constructor(public payload: { quiz: QuizModel }) {
    }
}

export class WorkshopQuizAddingFailed implements Action {
    readonly type = WorkshopsActionTypes.WorkshopQuizAddingFailed;

    constructor(public payload: { error: any }) {
    }
}
export class UsersRequested implements Action {
    readonly type = WorkshopsActionTypes.UsersRequested;

    constructor(public payload: { usersIds: string[] }) {
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
    WorkshopDeleting |
    WorkshopDeleted |
    WorkshopDeletingFailed |
    WorkshopCommentsRequested |
    WorkshopCommentsLoaded |
    WorkshopCommentsLoadingFailed |
    WorkshopCommentsCreating |
    WorkshopCommentsCreated |
    WorkshopCommentsCreatingFailed |
    WorkshopCommentsUpdating |
    WorkshopCommentsUpdated |
    WorkshopCommentsUpdatingFailed |
    WorkshopCommentsDeleting |
    WorkshopCommentsDeleted |
    WorkshopCommentsDeletingFailed |
    WorkshopQuizzesRequested |
    WorkshopQuizzesLoaded |
    WorkshopQuizzesLoadingFailed |
    TagsRequested |
    TagsLoaded |
    TagsLoadingFailed |
    WorkshopIdSetting |
    WorkshopIdSet |
    WorkshopIdSettingFailed |
    WorkshopAddQuizRequested |
    WorkshopQuizAdded |
    WorkshopQuizAddingFailed |
    UsersRequested |
    UsersLoaded |
    UsersLoadingFailed;
