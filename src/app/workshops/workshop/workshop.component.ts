import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Workshop} from '../../module/Workshop';
import {Comment} from '../../module/additional';
import {WorkshopService} from '../workshop.service';

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
    auxOpen = false;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private wrkService: WorkshopService) {
    }

    ngOnInit() {
        this.subscription = this.route.params
            .subscribe(params => this.id = params.id);
        this.route.data.subscribe((data: {workshop: Workshop}) => {
            this.workshop = data.workshop;
        } );
        if (this.router.url.split('/').pop()[0] === '(') {
            this.auxOpen = true;
        }
    }

    liked($event: boolean): void {
        this.workshop.liked($event);
    }

}
