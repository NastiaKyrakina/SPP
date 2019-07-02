import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {TabModel} from '../../models/tab.model';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {QuizModel} from '../models/quiz.model';
import {QuizService} from '../services/quiz.service';
import {UserModel} from '../../models/user.model';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {QuizDeleteRequested, QuizzesRequested} from '../store/quizzes/quizzes.actions';
import {selectQuizzes} from '../store/quizzes/quizzes.selectors';

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
                private router: Router,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(new QuizzesRequested({queryParams: {page: '0'}}));
        this.quizzes$ = this.store.pipe(select(selectQuizzes));

        if (this.router.url.split('/').pop()[0] === '(') {
            this.auxOpen = true;
        }
        this.subscribeUsers = this.userService.getUsers().subscribe(response => {
            this.users = response;
        });
    }

    trackByFn(index: number, quiz: QuizModel): string {
        return quiz.id;
    }

    ngOnDestroy(): void {
        if (this.subscribeUsers) {
            this.subscribeUsers.unsubscribe();
        }
    }

    deleteQuiz(quizId: string) {
        console.log(quizId);
        this.store.dispatch(new QuizDeleteRequested({quizId}));
    }
}
