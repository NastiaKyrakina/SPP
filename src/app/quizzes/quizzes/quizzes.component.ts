import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {TabModel} from '../../models/tab.model';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkshopService} from "../../workshops/workshop.service";
import {Observable, Subscription} from 'rxjs';
import {QuizModel} from '../models/quiz.model';
import {QuizService} from '../services/quiz.service';
import {UserModel} from '../../models/user.model';

@Component({
    selector: 'app-quizze',
    templateUrl: './quizzes.component.pug',
    styleUrls: ['./quizzes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzesComponent implements OnInit, OnDestroy {
    quizzes$: Observable<Array<QuizModel>>;
    users: Array<UserModel>;
    tabs: Array<TabModel> = [{
        title: 'Constructor',
        href: 'constructor'
    }];
    auxOpen = false;
    private subscribeUsers: Subscription;

    constructor(private userService: UserService,
                private quizService: QuizService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.quizzes$ = this.quizService.getQuizzes();
        if (this.router.url.split('/').pop()[0] === '(') {
            this.auxOpen = true;
        }
        this.subscribeUsers = this.userService.getUsers().subscribe(response => {
            this.users = response;
        });

    }

    ngOnDestroy(): void {
        if (this.subscribeUsers) {
            this.subscribeUsers.unsubscribe();
        }
    }

}
