import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';
import {QuizModel} from '../models/quiz.model';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../auth/auth.service';
import {UserModel} from '../../models/user.model';

@Component({
    selector: 'app-quiz-item',
    templateUrl: './quiz-item.component.pug',
    styleUrls: ['./quiz-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizItemComponent implements OnInit {

    @Input() quiz: QuizModel;
    @Input() user: UserModel;
    @Output() quizDeleted = new EventEmitter<string>();
    userName: string;
    isAuthor: boolean;
    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        console.log(this.quiz);
        console.log(this.user);
        this.userName = this.getUserName();
        if (this.authService.getId() === this.quiz.author) {
            this.isAuthor = true;
        }
    }

    getUserName(): string {
        if (this.user.firstName && this.user.lastName) {
            return `${this.user.firstName} ${this.user.lastName}`;
        }
        return this.user.username;
    }

    deleteQuiz(id: string): void {
        this.quizDeleted.emit(id);
    }
}
