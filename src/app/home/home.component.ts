import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    
  }

  images: string[] = [
    '../assets/Tools/angular.png',
    '../assets/Tools/css.png',
    '../assets/Tools/as.png',
    '../assets/Tools/bootstrap.png',
    '../assets/Tools/pl-sql.jfif',
    '../assets/Tools/html.png',
    '../assets/Tools/js.png',
    '../assets/Tools/react.png',
    '../assets/Tools/mysql.png',
    '../assets/Tools/sass.png',
    '../assets/Tools/ts.png',
    '../assets/Tools/ssms.jfif'
  ];

  @ViewChild('carouselTrack') carouselTrack!: ElementRef;

  ngAfterViewInit(): void {
    this.setupInfiniteScroll();
  }

  setupInfiniteScroll() {
    const track = this.carouselTrack.nativeElement;
    const slides = Array.from(track.children) as HTMLElement[];

    // Clone slides to create an infinite loop effect
    slides.forEach(slide => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });

    // Adjust animation duration based on the total width of the track
    const totalWidth = slides.reduce((width, slide) => width + slide.offsetWidth, 0);
    track.style.animationDuration = `${totalWidth / 100}px`;
  }

}
