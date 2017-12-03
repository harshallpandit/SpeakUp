import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { Group } from './../../app/models/group';
import { storage } from 'firebase/app';
import { GroupPage } from './../group/group';


@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  email: string;
  key = [];
  groups = [];
  group = {} as Group;
  groupKeys = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
    this.storage.get('email').then((val) => {
      this.email = val;
      firebase.database().ref('/User/').child(this.email.replace('.','*')).child('groups').on('value', (snapshot) => {
        this.key = snapshot.val();
        
        for(let k in this.key){
          let groupName = snapshot.child(k).val().groupName;
          let groupKey = snapshot.child(k).val().groupKey;
          console.log(groupKey);
          this.groups.push(groupName);
          this.groupKeys.push(groupKey);
        }
      })
  
    console.log(this.email)
    });
    console.log(this.email)
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  createGroup(){
    this.navCtrl.push('CreateGroupPage');
  }

  openGroup(group:string, i:number) {
    let groupKey = this.groupKeys[i];
     firebase.database().ref('/Messages/').child(String(groupKey)).on('value', (snapshot) => {
      this.storage.set('groupKey', groupKey);
      this.navCtrl.push(GroupPage);
    }); 
  }

}
