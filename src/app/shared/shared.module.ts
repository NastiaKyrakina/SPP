import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CardComponent} from './card/card.component';
import {ViewportComponent} from './viewport/viewport.component';
import {AuxiliaryPanelComponent} from './auxiliary-panel/auxiliary-panel.component';
import {TagComponent} from './tag/tag.component';
import {LikeComponent} from './like/like.component';
import {ToTopButtonComponent} from './to-top-button/to-top-button.component';
import {TabComponent} from './tab/tab.component';
import {TabGroupComponent} from './tab-group/tab-group.component';
import {TimestampComponent} from './timestamp/timestamp.component';
import {CommentCardComponent} from './comment-card/comment-card.component';
import {CommentFormComponent} from './comment-form/comment-form.component';
import {SharedRoutingModule} from './shared-routing.module';
import { WorkshopQuizPipe } from './pipes/workshop-quiz.pipe';
import {GeneralModule} from '../general/general.module';
import { StarComponent } from './star/star.component';
import { UniComponent } from './uni/uni.component';


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
