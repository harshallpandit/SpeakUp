import { TabsPage } from './../tabs/tabs';
import { User } from './../../app/models/user';
import { RegisterPage } from './../register/register';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  user = {} as User;

  constructor(private authentication: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  pushRegister() {
    this.navCtrl.push('RegisterPage');
  }

  login(user: User) {
    const result = this.authentication.auth.signInWithEmailAndPassword(user.email, user.password);
    
    if(result) {
      this.navCtrl.push(TabsPage);
    }
  }
}
