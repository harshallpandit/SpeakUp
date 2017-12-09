import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase  from 'firebase';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  email: string;
  firstName:string;
  lastName:string;
  fullName:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.get('email').then((val) =>{
      this.email = val;

      let firebaseRef = firebase.database().ref('/User/'+this.email.replace('.','*')+'/').on('value', (snapshot) => {

        this.firstName = snapshot.val().firstName;
        this.lastName = snapshot.val().lastName;
        this.fullName = this.firstName + " " + this.lastName;

     });
    });
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {

  }

  logout() {
    console.log("Testing logout")
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot(LoginPage);
    })
  }
}
