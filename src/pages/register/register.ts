import { User } from './../../app/models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  data = [];
  user = {} as User;

  constructor(private authentication: AngularFireAuth,
     public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {

      this.fdb.list('/User').valueChanges().subscribe(_data => {
      this.data = _data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(user: User) {
    this.authentication.auth.createUserWithEmailAndPassword(user.email, user.password);
    this.fdb.list('User/userid').push({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    });
  }

}
