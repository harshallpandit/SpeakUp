import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  text: string;

  constructor(private tts: TextToSpeech, public navCtrl: NavController) {

  }

  async speakIt()
  {
    this.tts.speak(this.text);
    console.log(this.text);
  }

}
