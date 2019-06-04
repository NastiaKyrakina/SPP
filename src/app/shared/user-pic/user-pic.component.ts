import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
    selector: 'app-user-pic',
    templateUrl: './user-pic.component.pug',
    styleUrls: ['./user-pic.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPicComponent implements OnInit {
    @Input() picture: string;
    @Input() fname: string;
    @Input() lname: string;


    constructor() {
    }

    ngOnInit() {
        console.log(this.fname);
    }

    getInitial(): string {
        return `${this.fname[0]} ${this.lname[0]}`;
    }
}
