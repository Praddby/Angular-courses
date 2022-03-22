import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationToHours',
})
export class DurationToHoursPipe implements PipeTransform {
  public transform(value: number): string {
    const hours =
      Math.floor(value / 60) < 10 ? `0${Math.floor(value / 60)}` : Math.floor(value / 60);
    const min = value % 60 < 10 ? `0${value % 60}` : value % 60;
    const hourString = +hours > 1 ? 'hours' : 'hour';

    return `${hours}:${min} ${hourString}`;
  }
}
