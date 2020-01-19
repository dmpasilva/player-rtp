import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit, OnChanges {

  @Input()
  data: any;

  @Input()
  active: boolean;

  @Input()
  highlighted: boolean;

  @ViewChild('htmlButton', { static: true })
  htmlButton: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.highlighted && changes.highlighted.currentValue) {
      this.htmlButton.nativeElement.focus();
    }
  }

}
