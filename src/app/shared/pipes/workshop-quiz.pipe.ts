import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'workshopQuiz'
})
export class WorkshopQuizPipe implements PipeTransform {

    transform(quizzesId: string[], quizId: string, args?: any): boolean {
        return quizzesId ? quizzesId.includes(quizId) : false;
    }

}
