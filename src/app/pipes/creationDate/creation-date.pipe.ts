import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creationDate',
})
export class CreationDatePipe implements PipeTransform {
  transform(date: Date | string | number): string {
    let newDate: Date;
    if (typeof date === 'string') {
      const arr = date.split('/');
      newDate = new Date(`${arr[1]}/${arr[0]}/${arr[2]}`);
    } else {
      newDate = new Date(date);
    }
    const day = newDate.getDate() < 10 ? `0${newDate.getDate()}` : `${newDate.getDate()}`;
    const month =
      newDate.getMonth() < 9 ? `0${newDate.getMonth() + 1}` : `${newDate.getMonth() + 1}`;
    const year = `${newDate.getFullYear()}`;

    return `${day}.${month}.${year}`;
  }
}
