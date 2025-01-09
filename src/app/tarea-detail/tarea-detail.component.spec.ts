import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaDetailComponent } from './tarea-detail.component';

describe('TareaDetailComponent', () => {
  let component: TareaDetailComponent;
  let fixture: ComponentFixture<TareaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TareaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
