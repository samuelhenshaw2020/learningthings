import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subDate'
})
export class SubDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let date: Date = new Date(value);
    let newDate = new Date(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear() + 1}`);
    return  this.diff(newDate);
  }


  diff(date) {
    let dt2 = date;
    let daysHave = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.now() ) / (1000 * 60 * 60 * 24));
    return 365 - daysHave;
  }
   
    

}
