import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit = 25, completeWords = true, ellipsis = '...') {
    if (value && value.length > limit) {
      if (completeWords && value.split(' ').length > 2) {
        limit = value.substr(0, limit).lastIndexOf(' ');
      }
      return `${value.substr(0, limit)}${ellipsis}`;
    }
    return value;
  }
}
