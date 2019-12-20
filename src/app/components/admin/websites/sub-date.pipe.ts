import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subDate'
})
export class SubDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let date = new Date(value);
    return date;
  }

}
