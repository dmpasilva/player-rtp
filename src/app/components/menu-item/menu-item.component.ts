import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { TvProgram } from '../../models/tv-program';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuItemComponent implements OnInit, OnChanges {

  @Input() data: TvProgram;
  @Input() active: boolean;

  @ViewChild('htmlButton', { static: true })
  htmlButton: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.active && changes.active.currentValue) {
      this.htmlButton.nativeElement.focus();
    }
  }
}
