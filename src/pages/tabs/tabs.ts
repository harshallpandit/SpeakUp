import { ContactPage } from './../contact/contact';
import { AboutPage } from './../about/about';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
