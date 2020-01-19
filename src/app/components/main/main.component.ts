import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ControllerInputService } from '../../services/controller-input/controller-input.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit {


  constructor(private controllerInput: ControllerInputService) { }

  ngOnInit() {
  }

  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    this.controllerInput.keyPress($event);
  }
}
