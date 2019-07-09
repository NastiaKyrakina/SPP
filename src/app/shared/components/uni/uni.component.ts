import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-uni',
  templateUrl: './uni.component.pug',
  styleUrls: ['./uni.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniComponent implements OnInit {

    @Input() isActive = false;
    @Input() unis: number;
    @Output() uniWorkshop = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    changeState(): void {
        this.isActive = !this.isActive;
        this.unis += (this.isActive ? 1 : -1);
        this.uniWorkshop.emit(this.isActive);
    }
}
