import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TabModel} from '../../models/tab.model';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkshopService} from "../../workshops/workshop.service";
import {Observable} from 'rxjs';
import {QuizModel} from '../models/quiz.model';
import {QuizService} from '../services/quiz.service';

@Component({
    selector: 'app-quizze',
    templateUrl: './quiz.component.pug',
    styleUrls: ['./quiz.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent implements OnInit {
    quizzes: Observable<Array<QuizModel>>;
    tabs: Array<TabModel> = [{
        title: 'Constructor',
        href: 'constructor'
    }];
    auxOpen = false;

    constructor(private userService: UserService,
                private quizService: QuizService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.quizzes = this.quizService.getQuizzes();
        if (this.router.url.split('/').pop()[0] === '(') {
            this.auxOpen = true;
        }
    }

}
