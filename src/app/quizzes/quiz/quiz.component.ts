import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../services/quiz.service';
import {Observable, Subscription} from 'rxjs';
import {QuizModel} from '../models/quiz.model';
import {take} from 'rxjs/operators';
import {$e} from 'codelyzer/angular/styles/chars';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../reducers';
import {QuizRequested, QuizzesRequested} from '../store/quizzes.actions';
import {selectQuiz, selectQuizzes} from '../store/quizzes.selectors';

@Component({
    selector: 'app-quizzes',
    templateUrl: './quiz.component.pug',
    styleUrls: ['./quiz.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    id: string;
    // quiz: QuizModel;
    quiz$: Observable<QuizModel>;
    quizLoaded = false;
    config: any;
    result: boolean[];
    hasResult = false;
    message: string;
    all: number;
    correct: number;

    constructor(private userService: UserService,
                private quizService: QuizService,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>) {
    }

    ngOnInit() {
        this.subscription = this.route.params
            .subscribe(
                params => {
                    this.id = params.id;
                    this.store.dispatch(new QuizRequested({quizId: this.id}));
                }
            );
        this.quiz$ = this.store.pipe(select(selectQuiz));

        // this.quizService.getQuiz(this.id).pipe(take(1)).subscribe(response => {
        //     this.quiz = response[0];
        //
        // });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getResult($event: any) {
        let result = [];
        for (const key in $event) {
            if ($event.hasOwnProperty(key)) {
                result.push($event[key]);
            }
        }
        this.quizService.validateQuiz(this.id, result).subscribe(response => {
            this.message = response.message;
            this.result = response.results;
            this.all = this.result.length;
            this.correct = this.result.filter(answer => answer).length;
            this.hasResult = true;
        });
    }

    restartQuiz(): void {
        this.hasResult = false;
    }

    exitQuiz() {
        this.router.navigateByUrl('/quizzes/list');
    }
}
