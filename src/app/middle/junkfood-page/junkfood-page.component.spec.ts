import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JunkfoodPageComponent } from './junkfood-page.component';

describe('JunkfoodPageComponent', () => {
  let component: JunkfoodPageComponent;
  let fixture: ComponentFixture<JunkfoodPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JunkfoodPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JunkfoodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
