import { GroupPage } from './../group/group';
import { storage } from 'firebase/app';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from './../../app/models/user';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase  from 'firebase';
import { Group } from './../../app/models/group';
import { Storage } from '@ionic/storage';
import { OpenGroupPage } from './../open-group/open-group';


@IonicPage()
@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {

  user = {} as User;
  group = {} as Group;
  members: string[];
  i = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private fdb: AngularFireDatabase, public storage: Storage, public navParam: NavParams) {
    this.members = [];
    storage.get('email').then((val) => {
        this.members.push(val);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGroupPage');
  }

  addMember(user: User)
  {
    this.members.push(user.email);
    console.log(this.members + "   ----starts here")
  }

  startConversation() {
    let key = this.fdb.list('/Groups').push({
      members : this.members,
      groupName : this.group.groupName
    }).key;
    console.log(key);
    
    for(let i in this.members)
    {
      firebase.database().ref('/User/').child(this.members[i].replace('.' , '*')).child('groups').push({
        groupKey: key,
        groupName: this.group.groupName
      });
    }
    this.storage.set('groupkey', key);
    this.navCtrl.push(OpenGroupPage, {groupKey:key});

  }
}
