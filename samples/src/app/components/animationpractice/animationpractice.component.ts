import { Component, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet, Router } from '@angular/router';
import { fadeinandout, staggereffect } from '../animation';
import { fader, route2animation } from '../route.animtaion2';

@Component({
  selector: 'app-animationpractice',
  templateUrl: './animationpractice.component.html',
  styleUrls: ['./animationpractice.component.scss'],
  animations: [fadeinandout, staggereffect, fader, route2animation],
})
export class AnimationpracticeComponent implements OnInit {
  show: boolean = true;

  turnanim: any = false;

  constructor(private rt: Router) {
    rt.events.subscribe((evt) => {
      // will trigger each time there's a route change.
      if (evt instanceof NavigationEnd) {
        this.turnanim = evt.url.match('animation');
      }
    });
  }

  ngOnInit(): void {}

  preparedOutlet(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
    // if(this.turnanim == true){
    //   this.turnanim = false;
    //   return outlet.activatedRouteData['state'];
    // }
  }

  showpanel() {
    this.show = !this.show;
  }
}
