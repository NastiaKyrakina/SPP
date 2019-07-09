import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.pug',
  styleUrls: ['./star.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarComponent implements OnInit {

    @Input() isActive = false;
    @Input() stars: number;
    @Output() favoriteWorkshop = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    changeState(): void {
        this.isActive = !this.isActive;
        this.stars += (this.isActive ? 1 : -1);
        this.favoriteWorkshop.emit(this.isActive);
    }
}
