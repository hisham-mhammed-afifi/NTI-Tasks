import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  message: any;
  socket: any;
  constructor() {}

  ngOnInit(): void {
    this.setConnection();
  }

  setConnection() {
    this.socket = io('http://localhost:3000', {
      // path: '/my-custom-path/',
    });
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
        document.querySelector('#send')?.append(data);
      }
    });
  }

  sendMessage() {
    const p = document.createElement('p');
    p.classList.add('text-end');

    this.socket.emit('myMsg', this.message);

    const message = document.createTextNode(this.message);
    p.appendChild(message);
    document.querySelector('#send')?.appendChild(p);
    this.message = '';
  }
}
