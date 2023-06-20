import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any = {};
  registerForm: FormGroup = new FormGroup({});
  validationErrors: string[] = [];

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      dateOfBirth: ['', Validators.required],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8),
          this.matchValues('password'),
        ],
      ],
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: (_) =>
        this.registerForm.controls['confirmPassword'].updateValueAndValidity(),
    });
    // this.registerForm = new FormGroup({
    //   username: new FormControl('', Validators.required),
    //   password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(8), this.matchValues('password')]),
    // });
    // this.registerForm.controls['password'].valueChanges.subscribe({
    //   next: _ => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    // })
  }

  register() {
    let dob = this.formatDate(this.registerForm.value.dateOfBirth);
    let values = {...this.registerForm.value, dateOfBirth: dob}

    this.accountService.register(values).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/members');
      },
      error: (error) => {
        this.validationErrors = error;
      },
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value == control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  formatDate(dob: string | undefined) {
    if(!dob) return;
    return new Date(dob).toISOString().slice(0,10);
  }
}
