import { ChatService } from './services/chat.service';
import { StorageService } from './services/storage.service';
import { ChatmessagesService } from './services/chatmessages.service';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChannelsNavComponent } from './channels-nav/channels-nav.component';
import { ChatWriteComponent } from './chat-write/chat-write.component';
import { ChatContainerComponent } from './chat-container/chat-container.component';
import { SetupComponent } from './setup/setup.component';
import { RouterModule } from '@angular/router';
import { ChannelSetupComponent } from './channel-setup/channel-setup.component';
import { ChatComponent } from './chat/chat.component';

const routeConfig = [
  {
    path: '',
    component: ChatComponent
  },
  {
    path: 'setup',
    component: SetupComponent
  },
  {
    path: 'channel-setup',
    component: ChannelSetupComponent
  },
  {
    path: 'chat',
    component: ChatContainerComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatWindowComponent,
    ChannelsNavComponent,
    ChatWriteComponent,
    ChatContainerComponent,
    SetupComponent,
    ChannelSetupComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routeConfig),
  ],
  providers: [
    ChatmessagesService,
    StorageService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
