import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class Countdown implements PipeTransform {

  transform(value: any, hours: number, minutes: number, seconds: number): any {
    if (hours || minutes || seconds) {
      const hour = (hours >= 10) ? `${hours}` : `0${hours}`;
      const minute = (minutes >= 10) ? `${minutes}` : `0${minutes}`;
      const second = (seconds >= 10) ? `${seconds}` : `0${seconds}`;
      return `${hour}:${minute}:${second}`;
    }
    return value;
  }

}
