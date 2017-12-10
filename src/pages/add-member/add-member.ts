import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../app/models/user';
import firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AddMemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-member',
  templateUrl: 'add-member.html',
})
export class AddMemberPage {

  user = {} as User;
  groupName:string;
  groupKey:string;
  members = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fdb: AngularFireDatabase) {
    this.groupKey = this.navParams.get('groupKey');
    //this.groupName = this.navParams.get('groupName');

  }

  addMember(user: User)
  {
    console.log(user.email);
    
    //Check if this user id has registered
    firebase.database().ref('/Groups/'+this.navParams.get('groupKey')+'/').on('value', (snapshot) => {
      this.groupName = snapshot.val().groupName;
    });

    //If yes, then add to this group to user's group list
    firebase.database().ref('/User/').child(this.user.email.replace('.' , '*')).child('groups').push({
      groupKey: this.groupKey,
      groupName: this.groupName
    });

    firebase.database().ref('/Groups/'+this.groupKey+'/members').on('value', (snapshot) => {
      this.members = snapshot.val();
    });

    this.members.push(user.email);
    console.log(this.members);

    firebase.database().ref('/Groups').child(this.groupKey).update({
      members: this.members
    });

    //if successfully inserted, then pop
    this.navCtrl.pop();

    //Else, throw a user not found error

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddMemberPage');
  }

}
