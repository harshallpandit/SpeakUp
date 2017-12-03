import { storage } from 'firebase/app';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition'; 
import { AngularFireDatabase } from 'angularfire2/database';
import { Chat } from './../../app/models/chat';
import { Observable } from 'rxjs/Observable';
import { User } from './../../app/models/user';
import { Storage } from '@ionic/storage';
import firebase  from 'firebase';

@Component({
  selector: 'page-group',
  templateUrl: 'group.html'
})
export class GroupPage {

  data = [];
  text: string;
  sentences: Array<String> = [];
  error: string;
  user = {} as User;
  email: string;
  messages = ['prajna', 'Cheryl', 'Peters'];
  temp = [];
  key: string;
  temp1: any;
  message: string;
  constructor(private speech: SpeechRecognition, private tts: TextToSpeech, public navCtrl: NavController, private fdb: AngularFireDatabase, public storage: Storage) {
    this.fdb.list('/Messages/').valueChanges().subscribe(_data => {
      this.data = _data;
    });
  //  const messageRef: firebase.database.Reference = firebase.database().ref('Messages/group');
   // firebase.database().ref('/messages/').once('value').then(m => {
     // this.messages = m.val().group;
    //});
    this.storage.get('groupKey').then((val) =>{
      let firebaseRef = firebase.database().ref('/Messages/');
      // let items = firebaseRef.orderByChild('group');
       firebaseRef.child(String(val)).child('messages').on('value', (snapshot) => {
     //    let chats = [];
       //  snapshot.forEach( snap => {
         //  chats.push(snap.val()); //or snap.val().name if you just want the name and not the whole object
         let chats;
         this.temp = snapshot.val();
         let i = 3;
         console.log(this.temp);
         for(let key in this.temp)
         {
           //console.log(snapshot.val().message + "-------");
           //let ref = firebase.database().ref('/Messages/group/' + key);
           this.messages[i] = snapshot.child(key).val().message;
           i++;
          /*    
           firebase.database().ref('/Messages/group/' + key).once('value', (snap) => {
             //console.log(snap.val());
             this.messages[i] = snap.val().message;
             //console.log(this.messages[i]);
             i++;
             console.log(snap.val().message)
             for(let message in this.messages){
               this.message = snap.val().message;
              }
           });*/
         }
         
        // this.temp1 = snapshot.key;
         });
      
    });


    this.storage.get('email').then((val) => {
      this.email = val;
    });
  }


  async speakIt():Promise<any>
  {
    try {
      await this.tts.speak({text: this.text, locale: 'en-GB'});
      this.storage.get('groupKey').then((val) =>{
      this.fdb.list('/Messages/'+String(val)+'/messages').push({
        //firstName: this.user.firstName,
        //lastName: this.user.lastName,
       email: this.email,
       message: this.text
      });
    });
    } catch (error) {
      this.error = error;
    }
  }

  async listen():Promise<any> {
    const permission = await this.speech.requestPermission();  
    this.speech.startListening().subscribe(data => {
      this.sentences = data;
      
      this.storage.get('groupKey').then((val) => {
        this.fdb.list('/Messages/'+String(val)+'/messages').push({
          //firstName: this.user.firstName,
          //lastName: this.user.lastName,
          email: this.email,
          message:this.sentences[0]
        });
      });
      
    }, error => console.log(error));
    //this.speech.startListening().subscribe(data => this.sentences = data, error => console.log(error));
    //this.fdb.list('/Chat/listen').push(this.sentences[0]);
  }

  async hasPermission():Promise<boolean> {
    try {
      const permission = await this.speech.hasPermission();
      return permission;  
    } catch (error) {
      console.log(error);
    }
    
  }

  async getPermission():Promise<void> {
    try {
      const permission = await this.speech.requestPermission();  
      console.log(permission);
    } catch (error) {
      console.log(error);
    }
  }

  async isSpeechSupported():Promise<boolean> {
    const isAvailable = await this.speech.isRecognitionAvailable();
    console.log(isAvailable);
    return isAvailable;
  }

  async getSupportedLanguages():Promise<Array<String>> {
    try {
      const languages = await this.speech.getSupportedLanguages();
      console.log(languages);
      return languages;
    } catch (error) {
      console.log(error);
    }
  }

}
