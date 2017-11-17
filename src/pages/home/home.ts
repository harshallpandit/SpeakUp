import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { SpeechRecognition } from '@ionic-native/speech-recognition' 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  text: string;
  sentences: Array<String> = [];

  constructor(private speech: SpeechRecognition, private tts: TextToSpeech, public navCtrl: NavController) {

  }

  async speakIt()
  {
    this.tts.speak(this.text);
    console.log(this.text);
  }

  listen():void {
    //if(this.hasPermission())
    //{
      this.speech.startListening().subscribe(data => this.sentences = data, error => console.log(error));
    //}
    //else
    //{
     // this.getPermission();
      //this.speech.startListening().subscribe(data => console.log(data), error => console.log(error));
    //}
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
