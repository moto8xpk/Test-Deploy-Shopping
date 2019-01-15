import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMiddleContentComponent } from './top-middle-content.component';

describe('TopMiddleContentComponent', () => {
  let component: TopMiddleContentComponent;
  let fixture: ComponentFixture<TopMiddleContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopMiddleContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopMiddleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
