import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

import {Tag} from '../../module/additional';


@Component({
    selector: 'app-tag',
    templateUrl: './tag.component.pug',
    styleUrls: ['./tag.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagComponent implements OnInit {
    @Input() tag: Tag;
    @Output() selectTag = new EventEmitter<number>();
    selected = false;

    constructor() {
    }

    ngOnInit() {
        this.selected = this.tag.selected ? true : false;
    }

    clickedOnTag(): void {
        this.selected = !this.selected;
        this.selectTag.emit(this.tag.id);
    }

}
