import {Injectable} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {UserService} from "../../services/user.service";
import {Observable} from "rxjs";
import {Params} from "../../models/param.model";
import {QuizModel, ResultModel} from "../models/quiz.model";
import {first, map} from 'rxjs/operators';

export interface QuizParams extends Params {
    name?: string;
    status?: string;
    postId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    constructor(private apiService: ApiService,
                private userService: UserService) {
    }

    getQuizzes(params: QuizParams = {page: '0'}): Observable<Array<QuizModel>> {
        return this.apiService.getRequest(`/quizzes`, params).pipe(
            map(request => request.quizzes));
    }

    getQuiz(id: string): Observable<QuizModel>  {
        return this.apiService.getRequest(`/quizzes/${id}`);
    }

    getMyQuizzes(): Observable<{quizzes: Array<QuizModel>}> {
        return this.apiService.getRequest(`/quizzes/my`);
    }

    getQuizPosts(id: string): Observable<any> {
        return this.apiService.getRequest(`/quizzes/posts/${id}`);
    }

    createQuiz(quiz: QuizModel): Observable<any> {
        return this.apiService.postRequest(`/quizzes`, quiz);
    }

    updateQuiz(id: string, quiz: Partial<QuizModel>): Observable<any> {
        return this.apiService.putRequest(`/quizzes/${id}`, quiz);
    }

    deleteQuiz(id: string): Observable<any> {
        return this.apiService.deleteRequest(`/quizzes/${id}`);
    }

    validateQuiz(id: string, formData: Array<string | number>): Observable<ResultModel> {
        return this.apiService.postRequest(`/quizzes/validate/${id}`, {formData});
    }

}
