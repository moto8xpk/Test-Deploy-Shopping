import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaFoodCategoryComponent } from './sea-food-category.component';

describe('SeaFoodCategoryComponent', () => {
  let component: SeaFoodCategoryComponent;
  let fixture: ComponentFixture<SeaFoodCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeaFoodCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeaFoodCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
