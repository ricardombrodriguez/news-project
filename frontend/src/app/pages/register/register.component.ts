import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginService } from 'src/app/services/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm !:FormGroup;
  showUsernameError:Boolean = false;
  showFirstNameError:Boolean = false;
  showPasswordError:Boolean = false;
  showConfirmPasswordError:Boolean = false;
  showError: Boolean = false;

  constructor(private fb:FormBuilder, private loginService: LoginService, private registService: AuthenticationService, private location:Location) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [null],
      first_name: [null],
      last_name: [null],
      password:[null],
      confirm_password:[null]
    });
  }

  public submit(): void {
    this.showUsernameError = false;
    this.showFirstNameError = false;
    this.showPasswordError = false;
    this.showConfirmPasswordError = false;
    
    let error = false;

    if (this.registerForm.value["username"] === null || this.registerForm.value["username"].trim() === "") {
      console.log("erro")
      error = true;
      this.showUsernameError = true;
    }

    if (this.registerForm.value["first_name"] === null || this.registerForm.value["first_name"].trim() === "") {
      console.log("erro")
      error = true;
      this.showFirstNameError = true;
    }

    if (this.registerForm.value["password"] === null || this.registerForm.value["password"].trim() === "") {
      console.log("erro")
      error = true;
      this.showPasswordError = true;
    }

    if (this.registerForm.value["confirm_password"] != this.registerForm.value["password"]) {
      console.log("erro, password")
      error = true;
      this.showConfirmPasswordError = true;
    }

    if (!error) {
      this.registService.register(this.registerForm.value["username"], this.registerForm.value["first_name"], this.registerForm.value["last_name"], this.registerForm.value["password"]).
      subscribe(
        data => {
          console.log(data)
          let data_json = JSON.parse(JSON.stringify(data))

          let token = data_json.key;
          this.loginService.getUserInfo(this.registerForm.value["username"], token).
          subscribe(
            data_user => {
              let data_user_json = JSON.parse(JSON.stringify(data_user))
              
              localStorage.setItem('token', token);
              localStorage.setItem('username', this.registerForm.value["username"]);
              localStorage.setItem('id', data_user_json.id);
              localStorage.setItem('group', data_user_json.group.description);
              document.location.href = "/";
            },
            error => {
              console.log('Error: ', error);
              this.registerForm = this.fb.group({
                username: [null],
                first_name: [null],
                last_name: [null],
                password:[null],
                confirm_password:[null]
              });
              this.showError = true
            }
          );
        },
        error => {
          console.log('Error: ', error);
          this.registerForm = this.fb.group({
            username: [null],
            first_name: [null],
            last_name: [null],
            password:[null],
            confirm_password:[null]
          });
          this.showError = true
        }
      );
    }
  }

}
