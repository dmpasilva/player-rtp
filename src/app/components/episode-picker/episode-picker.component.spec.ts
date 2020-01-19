import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodePickerComponent } from './episode-picker.component';

describe('EpisodePickerComponent', () => {
  let component: EpisodePickerComponent;
  let fixture: ComponentFixture<EpisodePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
