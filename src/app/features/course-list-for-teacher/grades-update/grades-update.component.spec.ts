import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesUpdateComponent } from './grades-update.component';

describe('GradesUpdateComponent', () => {
  let component: GradesUpdateComponent;
  let fixture: ComponentFixture<GradesUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradesUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
