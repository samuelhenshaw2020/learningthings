import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminSseService {

  constructor() { }

  eventSource(url: string):  EventSource{
    return new EventSource(url);
  }
}
