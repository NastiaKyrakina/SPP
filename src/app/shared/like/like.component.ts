import {Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-like',
    templateUrl: './like.component.pug',
    styleUrls: ['./like.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeComponent implements OnInit {
    @Input() isActive = false;
    @Input() likes: number;
    @Output() likedWorkshop = new EventEmitter<boolean>();
    constructor() {
    }

    ngOnInit() {
    }

    changeState(): void {
      this.isActive = !this.isActive;
      this.likedWorkshop.emit(this.isActive);
    }
}
