import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Workshop} from '../../module/Workshop';
import {workshops} from '../workshops-data/data';

@Component({
    selector: 'app-workshop',
    templateUrl: './workshop.component.pug',
    styleUrls: ['./workshop.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopComponent implements OnInit {

    private id: number;
    private subscription: Subscription;
    workshop: Workshop;

    constructor(private activateRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.activateRoute.params
            .subscribe(params => this.id = params.id);
        this.workshop = workshops.filter(
            workshop => workshop.id == this.id)[0];
    }

    liked($event: boolean): void {
        this.workshop.liked($event);
    }

}
