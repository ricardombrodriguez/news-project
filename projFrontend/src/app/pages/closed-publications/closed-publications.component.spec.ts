import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedPublicationsComponent } from './closed-publications.component';

describe('ClosedPublicationsComponent', () => {
  let component: ClosedPublicationsComponent;
  let fixture: ComponentFixture<ClosedPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosedPublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
