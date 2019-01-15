import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BotMiddleContentComponent } from './bot-middle-content.component';

describe('BotMiddleContentComponent', () => {
  let component: BotMiddleContentComponent;
  let fixture: ComponentFixture<BotMiddleContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotMiddleContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotMiddleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
