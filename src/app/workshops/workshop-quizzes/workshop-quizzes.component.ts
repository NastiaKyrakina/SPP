import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {QuizModel} from '../../quizzes/models/quiz.model';
import {AppState} from '../../reducers';
import {select, Store} from '@ngrx/store';
import {QuizzesRequested} from '../../quizzes/store/quizzes.actions';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkshopCommentsRequested, WorkshopIdSet, WorkshopQuizzesRequested} from '../store/workshops.actions';
import {selectQuizzes} from '../../quizzes/store/quizzes.selectors';
import {selectWorkshopQuizzes} from '../store/workshops.selectors';

@Component({
    selector: 'app-workshop-quizzes',
    templateUrl: './workshop-quizzes.component.pug',
    styleUrls: ['./workshop-quizzes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopQuizzesComponent implements OnInit, OnDestroy {
    quizzes$: Observable<Array<QuizModel>>;
    workshopId: string;
    private routeSbs: Subscription;

    constructor(private store: Store<AppState>,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.routeSbs = this.route.parent.paramMap.subscribe(params => {
            this.workshopId = params.get('id');
            this.store.dispatch(new WorkshopQuizzesRequested({
                workshopId: this.workshopId
            }));
        });
        this.quizzes$ = this.store.pipe(select(selectWorkshopQuizzes));
    }

    ngOnDestroy(): void {
        this.routeSbs.unsubscribe();
    }

    addQuiz() {
        this.store.dispatch(new WorkshopIdSet());
        this.router.navigate(['/quizzes/list'], {
            queryParams: {
                return: this.router.url,
            }
        });
    }
}
