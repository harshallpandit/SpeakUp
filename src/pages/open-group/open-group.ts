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
import { NavParams } from 'ionic-angular/navigation/nav-params';

@Component({
  selector: 'page-open-group',
  templateUrl: 'open-group.html'
})
export class OpenGroupPage {

  data = [];
  text: string;
  sentences: Array<String> = [];
  error: string;
  user = {} as User;
  email: string;
  messages = [];
  temp = [];
  key: string;
  temp1: any;
  message: string;
  count = 0;
  path:string;
  messageFrom = [];
  firstName:string;
  lastName:string;
  fullName: string;
  displayNames = [];

  constructor(private speech: SpeechRecognition, private tts: TextToSpeech, private fdb: AngularFireDatabase, public storage: Storage, public navParams:NavParams) {
       let firebaseRef = firebase.database().ref('/Groups/messages/'+this.navParams.get('groupKey')).on('value', (snapshot) => {
         this.temp = snapshot.val();
         let i = 0;
         console.log(this.temp);
         for(let key in this.temp)
         {
           this.messages[i] = snapshot.child(key).val().message;
           this.messageFrom[i] = snapshot.child(key).val().email;
           this.displayNames[i] = snapshot.child(key).val().displayName;
           i++;
         }
      });
      
    this.storage.get('email').then((val) => {
      this.email = val;
    });
     this.storage.get('name').then((val) =>{
      this.fullName = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupPage');
  }

  async speakIt():Promise<any>
  {console.log(this.email);
    try {
      await this.tts.speak({text: this.text, locale: 'en-US'});
      this.storage.get('name').then((val) => {
      this.fullName = val;
      this.fdb.list('/Groups/messages/'+this.navParams.get('groupKey')).push({
       email: this.email,
       displayName: this.fullName,
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
      this.storage.get('name').then((val) => {
        this.fullName = val;
        
        this.fdb.list('/Groups/messages/'+this.navParams.get('groupKey')).push({
          email: this.email,
          displayName: this.fullName,
          message:this.sentences[0]
        });
      });
      });
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
