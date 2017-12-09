import { GroupsPage } from './../groups/groups';
import { GroupPage } from './../group/group';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { CreateGroupPage } from '../create-group/create-group';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GroupsPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
