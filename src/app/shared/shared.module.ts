import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CardComponent} from './components/card/card.component';
import {ViewportComponent} from './components/viewport/viewport.component';
import {AuxiliaryPanelComponent} from './components/auxiliary-panel/auxiliary-panel.component';
import {TagComponent} from './components/tag/tag.component';
import {LikeComponent} from './components/like/like.component';
import {ToTopButtonComponent} from './components/to-top-button/to-top-button.component';
import {TabComponent} from './components/tab/tab.component';
import {TabGroupComponent} from './components/tab-group/tab-group.component';
import {TimestampComponent} from './components/timestamp/timestamp.component';
import {CommentCardComponent} from './components/comment-card/comment-card.component';
import {CommentFormComponent} from './components/comment-form/comment-form.component';
import {SharedRoutingModule} from './shared-routing.module';
import { WorkshopQuizPipe } from './pipes/workshop-quiz.pipe';
import {GeneralModule} from '../general/general.module';
import { StarComponent } from './components/star/star.component';
import { UniComponent } from './components/uni/uni.component';


@NgModule({
    declarations: [
        CardComponent,
        ViewportComponent,
        AuxiliaryPanelComponent,
        LikeComponent,
        TagComponent,
        ToTopButtonComponent,
        TabComponent,
        TabGroupComponent,
        TimestampComponent,
        CommentCardComponent,
        CommentFormComponent,
        WorkshopQuizPipe,
        StarComponent,
        UniComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        GeneralModule,
        SharedRoutingModule
    ],
    exports: [CardComponent,
        ViewportComponent,
        AuxiliaryPanelComponent,
        ToTopButtonComponent,
        TagComponent,
        LikeComponent,
        TabGroupComponent,
        TimestampComponent,
        CommentCardComponent,
        CommentFormComponent,
        WorkshopQuizPipe,
        StarComponent,
        UniComponent
    ],
    entryComponents: [
        CommentFormComponent,
    ]
})
export class SharedModule {
}
