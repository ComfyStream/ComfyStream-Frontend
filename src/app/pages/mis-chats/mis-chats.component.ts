import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-mis-chats',
  templateUrl: './mis-chats.component.html',
  styleUrls: ['./mis-chats.component.css']
})
export class MisChatsComponent implements OnInit {
  public misChats: Chat[] = [];

  constructor(private router: Router,
  private  chatService: ChatService) { }

  async ngOnInit() {
    this.misChats = await this.chatService.getMisChats();
  }

  mostrarChat(id: string){
    this.router.navigate(['/chat', id]);
  }

}
