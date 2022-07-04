import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEmptyComponent } from './recipe-empty.component';

describe('RecipeEmptyComponent', () => {
  let component: RecipeEmptyComponent;
  let fixture: ComponentFixture<RecipeEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
