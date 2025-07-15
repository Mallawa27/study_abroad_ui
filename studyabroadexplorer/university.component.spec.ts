import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UniComponent } from './university.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('UniComponent', () => {
  let component: UniComponent;
  let fixture: ComponentFixture<UniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UniComponent],
      imports: [RouterTestingModule, FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});