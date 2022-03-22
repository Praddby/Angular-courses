import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringJoiner',
})
export class StringJoinerPipe implements PipeTransform {
  transform(arr: string[] | null, separator: string): string | null {
    return arr && arr.join(`${separator} `);
  }
}
