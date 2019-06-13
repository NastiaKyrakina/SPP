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
import {SharedRoutingModule} from './shared-routing.module';
import { CollapsableDirective } from './directives/collapsable.directive';
import { RangeDirective } from './directives/range.directive';
import { TextToColorDirective } from './directives/text-to-color.directive';
import { InitialsPipe } from './pipe/initials.pipe';
import { QueryParamsActiveDirective } from './directives/query-params-active.directive';


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
        CommentFormComponent,
        CollapsableDirective,
        RangeDirective,
        TextToColorDirective,
        InitialsPipe,
        QueryParamsActiveDirective],
    imports: [
        CommonModule,
        FormsModule,
        SharedRoutingModule
    ],
    exports: [CardComponent,
        ViewportComponent,
        AuxiliaryPanelComponent,
        UserPicComponent,
        ToTopButtonComponent,
        TagComponent,
        LikeComponent,
        TabGroupComponent,
        TimestampComponent,
        CommentCardComponent,
        CommentFormComponent,
        CollapsableDirective,
        RangeDirective,
        TextToColorDirective,
        QueryParamsActiveDirective
    ],
    entryComponents: [
        CommentFormComponent,
    ]
})
export class SharedModule {
}
