import { Pipe, PipeTransform } from '@angular/core';
import { addHours } from 'date-fns';

@Pipe({
  name: 'dateManipulation',
  standalone: true,
})
export class DateManipulationPipe implements PipeTransform {
  transform(value: number) {
    const date = new Date(value);
    const newDate = addHours(date, -3);
    return newDate;
  }
}
