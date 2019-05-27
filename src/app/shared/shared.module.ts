import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CardComponent} from './card/card.component';
import {ViewportComponent} from './viewport/viewport.component';
import {AuxiliaryPanelComponent} from './auxiliary-panel/auxiliary-panel.component';
import {UserPicComponent} from './user-pic/user-pic.component';
import {TagComponent} from './tag/tag.component';
import {LikeComponent} from './like/like.component';
import {ToTopButtonComponent} from './to-top-button/to-top-button.component';
import {TabComponent} from './tab/tab.component';
import {TabGroupComponent} from './tab-group/tab-group.component';
import {TimestampComponent} from './timestamp/timestamp.component';
import {CommentCardComponent} from './comment-card/comment-card.component';
import {CommentFormComponent} from './comment-form/comment-form.component';


@NgModule({
    declarations: [
        CardComponent,
        ViewportComponent,
        AuxiliaryPanelComponent,
        LikeComponent,
        UserPicComponent,
        TagComponent,
        ToTopButtonComponent,
        TabComponent,
        TabGroupComponent,
        TimestampComponent,
        CommentCardComponent,
        CommentFormComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [CardComponent,
        ViewportComponent,
        UserPicComponent,
        ToTopButtonComponent,
        TagComponent,
        LikeComponent,
        TabGroupComponent,
        TimestampComponent,
        CommentCardComponent,
        CommentFormComponent
    ],
    entryComponents: [
        CommentFormComponent,
    ]
})
export class SharedModule {
}
