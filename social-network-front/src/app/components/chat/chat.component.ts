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
        const style =
          'background: gold; float: left; padding: 5px 10px; border-radius: 10px; width: 90%';
        document.querySelector('#send')?.insertAdjacentHTML(
          'beforeend',
          `
        <p style="${style}">${data}</p>
        `
        );

        let el = document.querySelector('#send');
        if (el) {
          el.scrollTop = el.scrollHeight;
        }
      }
    });
  }

  sendMessage() {
    this.socket.emit('myMsg', this.message);

    const style =
      'background: dodgerblue; float: right; color: white; padding: 5px 10px; border-radius: 10px; width: 90%';

    document.querySelector('#send')?.insertAdjacentHTML(
      'beforeend',
      `
    <p style="${style}">${this.message}</p>
    `
    );
    let el = document.querySelector('#send');
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
    this.message = '';
  }
}
