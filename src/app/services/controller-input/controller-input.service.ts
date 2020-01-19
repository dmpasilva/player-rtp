import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerInputService {
  private keyEvents = new Subject<number>();

  constructor() { }

  keyPress($event: KeyboardEvent) {
    console.log($event);
    this.keyEvents.next($event.keyCode);
  }

  onKeyPress(): Observable<number> {
    return this.keyEvents.asObservable();
  }
}
