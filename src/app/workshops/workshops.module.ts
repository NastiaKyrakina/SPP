import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkshopsRoutingModule} from './workshops-routing.module';
import {WorkshopsComponent} from './workshops/workshops.component';
import {WorkshopComponent} from './workshop/workshop.component';
import {ArticleComponent} from './article/article.component';
import {SharedModule} from '../shared/shared.module';
import {WorkshopCommentsComponent} from './workshop-comments/workshop-comments.component';
import {WorkshopResourcesComponent} from './workshop-resources/workshop-resources.component';
import {WorkshopQuizzesComponent} from './workshop-quizzes/workshop-quizzes.component';

@NgModule({
    declarations: [
        WorkshopsComponent,
        WorkshopComponent,
        ArticleComponent,
        WorkshopCommentsComponent,
        WorkshopResourcesComponent,
        WorkshopQuizzesComponent],
    imports: [
        CommonModule,
        SharedModule,
        WorkshopsRoutingModule,
    ],
    exports: []
})
export class WorkshopsModule {
}
