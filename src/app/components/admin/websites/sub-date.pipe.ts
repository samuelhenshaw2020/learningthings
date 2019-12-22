import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subDate'
})
export class SubDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let date: Date = new Date(value);
    let year = date.getFullYear() + 1;
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let newDate = new Date(`${year}/${month}/${day}`)

    return  newDate;
  }

}
