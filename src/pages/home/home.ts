import { storage } from 'firebase/app';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition'; 
import { Chat } from './../../app/models/chat';
import { Observable } from 'rxjs/Observable';
import { User } from './../../app/models/user';
import { Storage } from '@ionic/storage';
import firebase  from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data = [];
  text: string;
  textArr = [];
  sentences: Array<String> = [];
  error: string;
  user = {} as User;
  email: string;
  messages = [];
  temp = [];
  key: string;
  temp1: any;
  message: string;
  listenCount = 0;
  speakCount = 0;
  flag = [];
  i = 0;
  j=0;
  constructor(private speech: SpeechRecognition, private tts: TextToSpeech, public navCtrl: NavController, public storage: Storage, public NavParams:NavParams, public fdb: AngularFireDatabase) {
    this.flag[0]=1;
  } 

  async speakIt():Promise<any>
  {
    try {
      this.flag[this.i]=1;
      this.i++;      
      await this.tts.speak({text: this.text, locale: 'en-US'});
      this.sentences[this.listenCount] = this.text;
      this.listenCount++;
      this.text="";
     
      /*this.fdb.list('/Groups/-L-VLFTgYEtZBp95B5gq/messages').push({
        //firstName: this.user.firstName,
        //lastName: this.user.lastName,
        //email: this.email,
        message:this.text
      });*/
    

      /* this.fdb.list('/Messages/group').push({
        //firstName: this.user.firstName,
        //lastName: this.user.lastName,
       email: this.email,
       message: this.text
      });
       */console.log(this.text);
    } catch (error) {
      this.error = error;
    }
  }

  async listen():Promise<any> {
    this.flag[this.i]=0;
    this.i++;    
    const permission = await this.speech.requestPermission();  
    this.speech.startListening().subscribe(data => {
      this.sentences[this.listenCount] = data[0];
      this.listenCount++;
      this.textArr.push(data[0]);
      /*   this.fdb.list('/Messages/group').push({
        //firstName: this.user.firstName,
        //lastName: this.user.lastName,
        email: this.email,
        message:this.sentences[0]
      }); */
    }, error => console.log(error));
    //this.speech.startListening().subscribe(data => this.sentences = data, error => console.log(error));
    //this.fdb.list('/Chat/listen').push(this.sentences[0]);
    this.speech.stopListening()
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
