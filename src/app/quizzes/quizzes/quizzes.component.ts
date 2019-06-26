import {Component, OnInit, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {QuizService} from '../services/quiz.service';
import {Observable, Subscription} from 'rxjs';
import {QuizModel} from '../models/quiz.model';
import {take} from 'rxjs/operators';
import {$e} from 'codelyzer/angular/styles/chars';

@Component({
    selector: 'app-quizzes',
    templateUrl: './quizzes.component.pug',
    styleUrls: ['./quizzes.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizzesComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    id: string;
    quiz: QuizModel;
    quizLoaded = false;
    config: any;

    constructor(private userService: UserService,
                private quizService: QuizService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.subscription = this.route.params
            .subscribe(params => this.id = params.id);
        this.quizService.getQuiz(this.id).pipe(take(1)).subscribe(response => {
            this.quiz = response[0];
            console.log(response);
            console.log(this.quiz);
            this.quizLoaded = true;

        });

    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getResult($event: any) {
        // console.log($event);
        let result = [];
        for (const key in $event) {
            if ($event.hasOwnProperty(key)) {
                result.push($event[key]);
            }
        }
        result = result.slice(0, -2);
        console.log(result);
        this.quizService.validateQuiz(this.id, result).subscribe(response => {
            console.log(response);
        });
    }
}
