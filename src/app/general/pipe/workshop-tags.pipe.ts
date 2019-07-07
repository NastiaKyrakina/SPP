import {Pipe, PipeTransform} from '@angular/core';
import {Tag} from '../../models/additional.model';

@Pipe({
    name: 'workshopTags'
})
export class WorkshopTagsPipe implements PipeTransform {

    transform(tags: Array<Tag>, tagsId: number[]): Array<Tag> {
        return tags ? tags.filter(tag => tagsId.includes(tag.seq)) : [];
    }

}
