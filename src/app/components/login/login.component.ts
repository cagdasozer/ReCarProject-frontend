import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { UserDetail } from 'src/app/models/userDetail';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userDetail: UserDetail;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.info(response.message, 'Bilgilendirme!');
          this.localStorageService.add('token', response.data.token);
          this.getUserDetails();
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'İşlem başarısız!');
        }
      );
    } else {
      this.toastrService.error('Form bilgileri eksik.', 'İşlem başarısız!');
    }
  }

  getUserClaims() {
    this.userService
      .getClaimsByUserId(this.userDetail.id)
      .subscribe((response) => {
        let claim: OperationClaim = response.data[0];
        console.log(claim);
        this.localStorageService.add('user_claim', JSON.stringify(claim.name));
        console.log('claimadded');
      });
  }

  getUserDetails() {
    this.userService
      .getUserDetailsByEmail(this.loginForm.value.email)
      .subscribe((response) => {
        this.userDetail = response.data;
        console.log('here');
        this.getUserClaims();
        this.localStorageService.add('user_details', JSON.stringify(this.userDetail));
        window.location.reload();
        this.router.navigate(['']);
      });
  }
}
