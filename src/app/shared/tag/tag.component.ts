import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, HostListener} from '@angular/core';

import {Tag} from '../../models/additional.model';


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

    @HostListener('click')
    clickedOnTag(): void {
        this.selected = !this.selected;
        this.selectTag.emit(this.tag.seq);
    }

    ngOnInit() {
        this.selected = this.tag.selected;
    }
}
