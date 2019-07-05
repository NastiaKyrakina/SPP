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
import {QuizDeleteRequested, QuizzesRequested} from '../store/quizzes.actions';
import {selectQuizzes} from '../store/quizzes.selectors';
import {selectIdForQuizzes, selectWorkshopQuizzesId} from '../../workshops/store/workshops.selectors';
import {take} from 'rxjs/operators';
import {WorkshopAddQuizRequested, WorkshopDeleting} from '../../workshops/store/workshops.actions';
import {ConfirmPopupService} from '../../core/confirm-popup.service';

@Component({
    selector: 'app-quizze',
    templateUrl: './quizzes.component.pug',
    styleUrls: ['./quizzes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzesComponent implements OnInit, OnDestroy {
    quizzes$: Observable<Array<QuizModel>>;
    workshopId: string;
    workshopQuizzesId: string[] | number[];
    users$: Observable<Array<UserModel>>;
    tabs: Array<TabModel> = [{
        title: 'Constructor',
        href: 'constructor'
    }];
    auxOpen = false;
    selectedMod = false;
    private subscribeUsers: Subscription;
    private return: string;

    constructor(private userService: UserService,
                private quizService: QuizService,
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<AppState>,
                private popUpService: ConfirmPopupService) {
    }

    ngOnInit() {
        this.route.queryParams.pipe(take(1))
            .subscribe(params => this.return = params.return || '/workshops');
        this.store.dispatch(new QuizzesRequested({queryParams: {page: '0'}}));
        this.quizzes$ = this.store.pipe(select(selectQuizzes));

        if (this.router.url.split('/').pop()[0] === '(') {
            this.auxOpen = true;
        }

        this.store.pipe(
            select(selectIdForQuizzes),
            take(1)).subscribe(
            id => {
                this.workshopId = id;
                if (this.workshopId) {
                    this.selectedMod = true;
                    this.store.pipe(select(selectWorkshopQuizzesId)).subscribe(quizzesId => {
                        this.workshopQuizzesId = quizzesId;
                    });
                }
            }
        );

        this.users$ = this.userService.getUsers();
    }

    trackByFn(index: number, quiz: QuizModel): string {
        return quiz.id;
    }

    deleteQuiz(quizId: string) {
        this.popUpService.confirm({
            data: {
                title: 'Delete quiz',
                text: 'Do you really want to delete this quiz?',
            }
        }).subscribe((confirmed: boolean) => {
            this.store.dispatch(new QuizDeleteRequested({quizId}));
        });
    }

    selectQuiz(quizId: string) {
        this.store.dispatch(new WorkshopAddQuizRequested({workshopId: this.workshopId, quizId}));
        this.router.navigateByUrl(this.return);
    }

    ngOnDestroy(): void {
        if (this.subscribeUsers) {
            this.subscribeUsers.unsubscribe();
        }
    }


}
