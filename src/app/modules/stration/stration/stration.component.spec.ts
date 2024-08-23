import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrationComponent } from './stration.component';

describe('StrationComponent', () => {
  let component: StrationComponent;
  let fixture: ComponentFixture<StrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
