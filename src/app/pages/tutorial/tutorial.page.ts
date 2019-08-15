import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  showSkip = true;

  @ViewChild('slides') slides: IonSlides;

  constructor(public menu: MenuController,
              public router: Router,) { }

  ngOnInit() {
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  startApp() {
    this.menu.enable(true);
    this.router.navigateByUrl('/home');
  }
}
