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

  constructor(private speech: SpeechRecognition, private tts: TextToSpeech, public navCtrl: NavController) {

  }

  async speakIt()
  {
    this.tts.speak(this.text);
    console.log(this.text);
  }

  async listen() {
    if(this.hasPermission())
    {
      this.speech.startListening().subscribe(data => console.log(data), error => console.log(error));
    }
    else
    {
      this.getPermission();
      this.speech.startListening().subscribe(data => console.log(data), error => console.log(error));
    }
  }

  async hasPermission():Promise<boolean> {
    const permission = await this.speech.hasPermission();
    return permission;
  }

  async getPermission() {
    const permission = await this.speech.requestPermission();
  }

}
