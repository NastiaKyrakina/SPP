import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WorkshopsRoutingModule} from './workshops-routing.module';
import {WorkshopsComponent} from './workshops/workshops.component';
import {WorkshopComponent} from './workshop/workshop.component';
import {ArticleComponent} from './article/article.component';

@NgModule({
    declarations: [WorkshopsComponent, WorkshopComponent, ArticleComponent],
    imports: [
        CommonModule,
        WorkshopsRoutingModule
    ],
    exports: [WorkshopsComponent,]
})
export class WorkshopsModule {
}
