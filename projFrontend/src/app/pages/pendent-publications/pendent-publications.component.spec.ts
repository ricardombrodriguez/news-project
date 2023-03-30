import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendentPublicationsComponent } from './pendent-publications.component';

describe('PendentPublicationsComponent', () => {
  let component: PendentPublicationsComponent;
  let fixture: ComponentFixture<PendentPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendentPublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendentPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
