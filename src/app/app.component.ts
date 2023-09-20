import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ecommerceAngular';

  constructor() {}

  ngOnInit() {
    // Puoi inserire qui le azioni da eseguire all'avvio dell'applicazione
    console.log('L\'applicazione è stata avviata.');
  }
}