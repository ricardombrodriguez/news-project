import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePublicationsComponent } from './active-publications.component';

describe('ActivePublicationsComponent', () => {
  let component: ActivePublicationsComponent;
  let fixture: ComponentFixture<ActivePublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivePublicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
