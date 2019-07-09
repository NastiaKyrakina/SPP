import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWorkshops from './workshops.reducer';
import {WorkshopsState} from './workshops.reducer';
import {WorkshopModel} from '../../models/workshop.model';

export const selectWorkshopsState = createFeatureSelector<fromWorkshops.WorkshopsState>('workshops');

export const selectWorkshops = createSelector(
    selectWorkshopsState,
    fromWorkshops.selectAllWorkshops
);

export const selectIsWorkshopLoaded = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.workshopLoaded
);

export const selectWorkshop = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.workshop
);

export const selectTotal = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.total
);

export const selectOffset = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.offset
);

export const selectIsLastPage = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => {
        return state.total <= state.offset;
    });



export const selectWorkshopCommentsState = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.comments,
);

export const selectWorkshopComments = createSelector(
    selectWorkshopCommentsState,
    fromWorkshops.selectAllComments
);

export const selectWorkshopQuizzesState = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.quizzes,
);

export const selectWorkshopQuizzesId = createSelector(
    selectWorkshopQuizzesState,
    fromWorkshops.selectQuizzesIds
);

export const selectWorkshopQuizzes = createSelector(
    selectWorkshopQuizzesState,
    fromWorkshops.selectAllQuizzes
);

export const selectTags = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.tags
);

export const selectIdForQuizzes = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.idForQuizzes
);

export const selectCurrentWorkshopTags = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => {
        if (!state.tags) {
            return [];
        }
        const tagsIds = state.workshop ? state.workshop.tags : [];
        return state.tags.filter(tag => tagsIds.includes(tag.seq));
    }
);


export const selectUsers = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.users
);

export const selectWorkshopsIsLoaded = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.workshopLoaded
);

export const selectWorkshopsReactions = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.reactions
);
