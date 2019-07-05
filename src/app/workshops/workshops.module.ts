import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkshopsRoutingModule} from './workshops-routing.module';
import {WorkshopsComponent} from './workshops/workshops.component';
import {WorkshopComponent} from './workshop/workshop.component';
import {ArticleComponent} from './article/article.component';
import {SharedModule} from '../shared/shared.module';
import {WorkshopCommentsComponent} from './workshop-comments/workshop-comments.component';
import {WorkshopQuizzesComponent} from './workshop-quizzes/workshop-quizzes.component';
import { StoreModule } from '@ngrx/store';
import * as fromWorkshops from './store/workshops.reducer';
import { EffectsModule } from '@ngrx/effects';
import { WorkshopsEffects } from './store/workshops.effects';
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import {ReactiveFormsModule} from '@angular/forms';
import {FormControlsModule} from '../form-controls/form-controls.module';

import {ScrollingModule as ScModule} from '@angular/cdk/scrolling';
import { ScrollingModule } from '@angular/cdk-experimental/scrolling';


@NgModule({
    declarations: [
        WorkshopsComponent,
        WorkshopComponent,
        ArticleComponent,
        WorkshopCommentsComponent,
        WorkshopQuizzesComponent,
        CreateWorkshopComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        FormControlsModule,
        WorkshopsRoutingModule,
        ScModule,
        ScrollingModule,
        StoreModule.forFeature('workshops', fromWorkshops.workshopsReducer),
        EffectsModule.forFeature([WorkshopsEffects]),
    ],
    exports: []
})
export class WorkshopsModule {
}
