import {Pipe, PipeTransform} from '@angular/core';
import {QuestionModel} from '../quizzes/models/quiz.model';
import {ConfigModel} from '../dynamic-form/models/config.model';

@Pipe({
    name: 'quizzesToConfig'
})
export class QuizzesToConfigPipe implements PipeTransform {

    transform(questions: Array<QuestionModel>, args?: any): Array<ConfigModel> {
        let configs: Array<ConfigModel> = [];
        questions.forEach((question, i) => {
            const index = i + 1;
            const config: ConfigModel = {
                name: 'answer' + index,
                id: 'answer' + index,
                label: `${index}. ${question.question}`,
                type: question.questionType,
            };

            switch (config.type) {
                case 'select': {
                    config.options = question.answerVariants.map(variant => {
                        return {
                            name: variant.answer,
                            value: variant.answer
                        };
                    });
                    break;
                }
            }
            configs.push(config);
        });
        configs.push({
            name: 'submit',
            type: 'button',
            id: 'submit',
            label: 'Check result'
        });
        return configs;
    }

}
