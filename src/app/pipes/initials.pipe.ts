import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(name: string[], args?: any): any {
      return name[0][0] + name[1][0];
  }

}
