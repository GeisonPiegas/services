import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ChatComponent } from 'src/app/Component/chat/chat.component';
import { SharedModule } from 'src/app/Component/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    ChatComponent
  ],
  entryComponents: [
    ChatComponent
  ]
  
})
export class HomePageModule {}
