import { GroupsPage } from './../groups/groups';
import { GroupPage } from './../group/group';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { CreateGroupPage } from '../create-group/create-group';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = GroupPage;
  tab3Root = GroupsPage;

  constructor() {

  }
}
