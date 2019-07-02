import {createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromWorkshops from './workshops.reducer';
import {WorkshopsState} from './workshops.reducer';
import {WorkshopModel} from '../../models/workshop.model';

export const selectWorkshopsState = createFeatureSelector<fromWorkshops.WorkshopsState>('workshops');

export const selectWorkshops = createSelector(
    selectWorkshopsState,
    fromWorkshops.selectAll
);

export const selectIsWorkshopLoaded = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.workshopLoaded
);

export const selectWorkshop = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.workshop
);


export const selectWorkshopComments = createSelector(
    selectWorkshop,
    (workshop: WorkshopModel) => workshop ? workshop.comments : null
);

export const selectUsers = createSelector(
    selectWorkshopsState,
    (state: WorkshopsState) => state.users
);

