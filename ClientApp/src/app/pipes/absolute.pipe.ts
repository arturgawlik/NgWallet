import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absolute'
})
export class AbsolutePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || value >= 0) 
      return value;
    else 
      return -1 * value;
  }

}
