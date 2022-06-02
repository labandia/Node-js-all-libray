import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fadein } from './auth/router.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadein
  ]
})
export class AppComponent {
  title = 'samples';
  prepareRoute(outlet: RouterOutlet){
      return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
      // return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
