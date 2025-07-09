import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule }               from '@angular/forms';
import { HttpClientTestingModule }   from '@angular/common/http/testing';
import { RouterTestingModule }       from '@angular/router/testing';

import { LoginComponent }            from './login.component';
import { LoginViewModel }            from '../../../viewmodels/auth/login.viewmodel';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        LoginViewModel
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });
});
