import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InitialsPipe} from '../pipes/initials.pipe';
import {AuthorPipe} from '../shared/pipe/author.pipe';
import {WorkshopTagsPipe} from '../shared/pipe/workshop-tags.pipe';
import {CurrentUserObjDirective} from './directives/current-user-obj.directive';
import {QueryParamsActiveDirective} from './directives/query-params-active.directive';
import {TextToColorDirective} from './directives/text-to-color.directive';
import {RangeDirective} from './directives/range.directive';
import {CollapsableDirective} from './directives/collapsable.directive';
import {UserPicComponent} from './user-pic/user-pic.component';

@NgModule({
  declarations: [
      UserPicComponent,
      CollapsableDirective,
      RangeDirective,
      TextToColorDirective,
      InitialsPipe,
      AuthorPipe,
      WorkshopTagsPipe,
      QueryParamsActiveDirective,
      CurrentUserObjDirective,
  ],
  imports: [
    CommonModule
  ],
    exports: [
        UserPicComponent,
        CollapsableDirective,
        RangeDirective,
        TextToColorDirective,
        QueryParamsActiveDirective,
        CurrentUserObjDirective,
        AuthorPipe,
        WorkshopTagsPipe,
    ]
})
export class GeneralModule { }
