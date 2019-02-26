import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createArray'
})
export class CreateArrayPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    return new Array(value);
  }

}
