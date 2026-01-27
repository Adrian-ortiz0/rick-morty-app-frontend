import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "./rick-morty/pages/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'rick-morty-app';
}
