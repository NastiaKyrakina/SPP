import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Workshop} from '../../module/Workshop';

@Component({
    selector: 'app-article',
    templateUrl: './article.component.pug',
    styleUrls: ['./article.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent implements OnInit {
    @Input() workshop: Workshop;

    constructor() {

    }

    ngOnInit() {
    }

    liked($event: boolean): void {
        this.workshop.liked($event);
    }


}
