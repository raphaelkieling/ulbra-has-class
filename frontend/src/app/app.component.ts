import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { url_api } from '../config_service';
import 'rxjs/add/operator/map';
import * as Moment from 'moment';
import { CalendarEvent } from 'calendar-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  viewDate = new Date();
  events: CalendarEvent[] = [];
  constructor(private _http: HttpClient) { }

  async ngOnInit() {
    this.events = await this.getEvents();
  }

  getEvents(): Promise<CalendarEvent[]> {
    return this._http
      .get(`${url_api}/holiday`)
      .map((events: any) => {

        return events.map((event) => {
          let newEvent: CalendarEvent = {
            start: Moment(event['dateHoliday']).toDate(),
            title: event['description'],
            color: {
              primary: 'red',
              secondary: 'blue'
            }
          }

          return newEvent;
        })
      })
      .toPromise()
  }
}
