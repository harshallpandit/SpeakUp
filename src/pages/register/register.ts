import { LoginPage } from './../login/login';
import { User } from './../../app/models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  data = [];
  user = {} as User;
  error: string;
  constructor(private authentication: AngularFireAuth,
     public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase) {

      this.fdb.list('/User').valueChanges().subscribe(_data => {
      this.data = _data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  /*register(user: User) {
    this.authentication.auth.createUserWithEmailAndPassword(user.email, user.password);
    
    let firebaseRef = firebase.database().ref('/User/').child(user.email.replace('.','*')).set({
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName
    });
    this.navCtrl.push(LoginPage);
  }
*/

  async register(user: User) {
    try {
      const result = await this.authentication.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (result) {
        let firebaseRef = firebase.database().ref('/User/').child(user.email.replace('.','*')).set({
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName
        });    
        this.navCtrl.push(LoginPage);
      }
    } catch (e) {
      console.error(e);
      this.error = "Registration Failed! " + e;
    }
  }

}
