import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
    name: 'dateDiffHoursPipe'
})
export class DateDiffHoursPipe implements PipeTransform {


    transform(date: string) {

        // using luxon for date (moment js is depricated)
        const now = DateTime.local();
        const userDate = DateTime.fromISO(date);
        const diff = now.diff(userDate, ["hours"]).toObject();
        const hours = diff.hours;

        return hours;
    }

}