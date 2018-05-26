import {Component, OnInit, Inject} from '@angular/core';
import {  MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder ,Validators , AbstractControl } from '@angular/forms';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import { AuthenticationService } from '../services/index';

@Component({
  selector: 'tcc-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit  {

  rForm: FormGroup;
  entryMode = new BehaviorSubject<String> (null) ;
  error : string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public params: any,
    public fb: FormBuilder,
    private authenticationService :AuthenticationService  ) {
    this.entryMode.next("sign-in");
  }

  private handleClick(value){
    this.entryMode.next(value);
  }

  static matchPassword(AC: AbstractControl) {
    let password = AC.get('password').value;
    let confirmPassword = AC.get('confirmPassword').value;
    if(password != confirmPassword) {
      AC.get('confirmPassword').setErrors( {MatchPassword: true} )
    } else {
      return null
    }
  }

  ngOnInit() {

    this.entryMode.subscribe( mode => {
      if(mode == "sign-up")
      {
        this.rForm = this.fb.group({
          'pseudo': [ '', Validators.compose([
            Validators.required,
            Validators.minLength(5)]
          ) ],
          'name': [ '',Validators.compose([
            Validators.required,
            Validators.minLength(5)]
          ) ],
          'email': [ '', Validators.email  ],
          'password': [ '', Validators.compose([
            Validators.required,
            Validators.minLength(8)]
          )  ],
          'confirmPassword': [ '', Validators.required ],

        },{
          validator : DialogUserComponent.matchPassword
        });
      }else if (mode == "sign-in"){
        this.rForm = this.fb.group({
          'pseudo': [ '', Validators.compose([
            Validators.required,
            Validators.minLength(5)]
          ) ],
          'name': [ '', null  ],
          'email': [ '', null],
          'password': [ '', Validators.compose([
            Validators.required,
            Validators.minLength(8)]
          )  ],
          'confirmPassword': [ '',null ],
        });
      }else{
        this.rForm = this.fb.group({
          'pseudo': [ '', null ],
          'name': [ '', null  ],
          'email': [ '', Validators.email  ],
          'password': [ '', null ],
          'confirmPassword': [ '', null ],
        });
      }

    })

  }

  login(post) {
    this.authenticationService.login(post.pseudo, post.password)
      .subscribe(result => {
        if (result === true) {
          // login successful
        } else {
          // login failed
          this.error = 'Username or password is incorrect';
        }
      });
  }


 /* public onSave(): void {
    this.dialogRef.close({
      username: this.params.username,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }*/

}
