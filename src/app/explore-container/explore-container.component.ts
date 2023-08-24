import { Component, ElementRef, VERSION, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent {
  name = 'Ionic 6.2 Angular ' + VERSION.major;
  public isLoading = false;
  constructor(private loadingController: LoadingController) {}
  @ViewChild('slides') public slides: ElementRef | undefined;
  public async changeSlide(): Promise<void> {
    this.showAutoHideLoader();
  }

  async showAutoHideLoader() {
    const loading = await this.loadingController
      .create({
        cssClass: 'loading-overlay',
        duration: 2000,
      })
      .then((res) => {
        res.present();

        res.onDidDismiss().then(() => {
          console.log('Loading dismissed! after 2 Seconds');
          this.slideNext(); // not working

          // setTimeout(() => { //this is working
          //   this.slideNext();
          // }, 0);
        });
      });
  }

  private slideNext(): void {
    const swiper = this.slides?.nativeElement.swiper;
    console.log('slideNext triggered', swiper);
    swiper.slideNext();
  }
}
