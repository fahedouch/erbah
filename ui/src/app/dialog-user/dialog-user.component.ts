import {Component, OnInit, Inject, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AuthenticationService} from '../services/index';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'tcc-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: [ './dialog-user.component.scss' ]
})
export class DialogUserComponent implements OnInit {

  rForm: FormGroup;
  entryMode = new BehaviorSubject<String>(null);
  error: boolean;


  constructor(@Inject(MAT_DIALOG_DATA) public params: any,
              public fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogUserComponent>,
              private authenticationService: AuthenticationService) {
    this.entryMode.next("sign-in");
  }

  private handleClick(value) {
    this.entryMode.next(value);
    this.error = false;
  }

  /**
   * match password verification
   * @param {AbstractControl} AC
   * @returns {null}
   */
  static matchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirmPassword').value;
    if (password != confirmPassword) {
      AC.get('confirmPassword').setErrors({MatchPassword: true})
    } else {
      return null
    }
  }

  ngOnInit() {

    this.authenticationService.logout();

    this.entryMode.subscribe(mode => {
      if (mode == "sign-up") {
        this.rForm = this.fb.group({
          'pseudo': [ '', Validators.compose([
            Validators.required,
            Validators.minLength(5) ]
          ) ],
          'name': [ '', Validators.compose([
            Validators.required,
            Validators.minLength(5) ]
          ) ],
          'email': [ '', Validators.email ],
          'password': [ '', Validators.compose([
            Validators.required,
            Validators.minLength(8) ]
          ) ],
          'confirmPassword': [ '', Validators.required ],

        }, {
          validator: DialogUserComponent.matchPassword
        });
      } else if (mode == "sign-in") {
        this.rForm = this.fb.group({
          'pseudo': [ '', Validators.compose([
            Validators.required,
            Validators.minLength(5) ]
          ) ],
          'name': [ '', null ],
          'email': [ '', null ],
          'password': [ '', Validators.compose([
            Validators.required,
            Validators.minLength(8) ]
          ) ],
          'confirmPassword': [ '', null ],
        });
      } else {
        this.rForm = this.fb.group({
          'pseudo': [ '', null ],
          'name': [ '', null ],
          'email': [ '', Validators.email ],
          'password': [ '', null ],
          'confirmPassword': [ '', null ],
        });
      }

    })

  }

  /**
   * login method
   * @param post
   */
  login(post) {
    this.error = false;
    this.authenticationService.login(post.pseudo, post.password)
      .subscribe(result => this.loginHandle(result),
        (err) => {
          console.log('here i shloud make a logging system')
        });
  }

  /**
   * Handle login : if success handle params and close else error messge
   * @param result
   */
  loginHandle (result) : void {
      if (result === true) {
        this.dialogRef.close({
          loginState : true
        });
      } else {
        this.error = true;
      }
    }

}
