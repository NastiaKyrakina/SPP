import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {WorkshopModel} from '../../models/workshop.model';
import {UserModel} from '../../models/user.model';
import {WorkshopService} from '../services/workshop.service';
import {Tag} from '../../models/additional.model';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';
import {Observable} from "rxjs";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.pug',
    styleUrls: ['./article.component.scss'],
    animations: [
        trigger('openClose', [
            // ...
            state('open', style({
                height: '200px',
                opacity: 1,
                backgroundColor: 'yellow'
            })),
            state('closed', style({
                height: '100px',
                opacity: 0.5,
                backgroundColor: 'green'
            })),
            transition('open => closed', [
                animate('1s')
            ]),
            transition('closed => open', [
                animate('0.5s')
            ]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
    @Input() workshop: WorkshopModel;
    tags$: Observable<Array<Tag>>;
    currentUser: UserModel;
    likeIt: boolean;
    isOpen = true;

    constructor(private wrkService: WorkshopService) {
    }

    ngOnInit() {
        this.tags$ = this.wrkService.getTags(this.workshop.tags);
        this.wrkService.getTags(this.workshop.tags);
        this.likeIt = false;
    }

    liked($event: boolean): void {
        // this.wrkService.liked($event, this.workshop.id);
    }

    changeState(): void {
        this.isOpen = !this.isOpen;
    }
}
