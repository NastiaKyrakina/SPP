import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TabModel} from '../../models/tab.model';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkshopService} from "../../workshops/workshop.service";

@Component({
    selector: 'app-quizze',
    templateUrl: './quiz.component.pug',
    styleUrls: ['./quiz.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit {
    tabs: Array<TabModel> = [{
        title: 'Constructor',
        href: 'constructor'
    }];
    auxOpen = false;

    constructor(private userService: UserService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        if (this.router.url.split('/').pop()[0] === '(') {
            this.auxOpen = true;
        }
    }

}
