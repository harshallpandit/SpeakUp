import { TabsPage } from './../tabs/tabs';
import { User } from './../../app/models/user';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  user = {} as User;
  firstName:string;
  lastName:string;
  name:string;
  error:string;

  constructor(private authentication: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  pushRegister() {
    this.navCtrl.push('RegisterPage');
  }
  
  async login(user: User) {
    try {
      const result = await this.authentication.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.push(TabsPage);
        let email = user.email.replace('.', '*');
        let firebaseRef = firebase.database().ref('/User/'+email+"/").on('value', (snapshot) => {
          this.firstName = snapshot.val().firstName;
          this.lastName = snapshot.val().lastName;
          let i = 0;
          this.name = this.firstName + " " + this.lastName;
          this.storage.set('name', this.name);  
       });
      this.storage.set('email', user.email);  
      }  
    }
    catch (e) {
      console.error(e);
      this.error = "Authentication Failed! " + e;
    }
  }
   
}
