import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationPageComponent } from './publication-page.component';

describe('PublicationPageComponent', () => {
  let component: PublicationPageComponent;
  let fixture: ComponentFixture<PublicationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
