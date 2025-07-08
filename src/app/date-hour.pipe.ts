import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateHour'
})
export class DateHourPipe implements PipeTransform {

   transform(value: any, format: string = 'dd/MM/yy'): string {
    if (!value) return '';

    const date = new Date(value);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    if (format === 'dd/MM/YY') {
      return `${day}/${month}/${year}`;
  }

  if (format === 'HH:mm') {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  if (format === 'dd/MM/yy HH:mm') {
    const hours =String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year.slice(2)} ${hours}:${minutes}`;
  }

  return date.toLocaleDateString();
  }

}
