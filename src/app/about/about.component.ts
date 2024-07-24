import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  clientsCount = 800;
  locationsCount = 0;
  clientsTarget = 1000;
  locationsTarget = 10;
  duration = 2000;
  clientsIncrementTime = Math.floor(this.duration / this.clientsTarget);
  locationsIncrementTime = Math.floor(this.duration / this.locationsTarget);

  @ViewChild('whyUsSection') whyUsSection!: ElementRef;

  whyUsContent = [
    { id: 'whyUs1', title: 'Expert Team', description: 'Our team consists of experienced professionals with a proven track record of delivering high-quality solutions.' },
    { id: 'whyUs2', title: 'Innovative Solutions', description: 'We use the latest technologies and innovative methods to address complex challenges and drive success.' },
    { id: 'whyUs3', title: 'Client-Centric Approach', description: 'We prioritize our clients’ needs, offering personalized services and support to ensure satisfaction and success.' },
    { id: 'whyUs4', title: 'Proven Results', description: 'Our results speak for themselves, with a portfolio of successful projects and satisfied clients.' },
  ];

  slides = [
    { id: 'slide1', title: 'Our Commitment', content: 'We are committed to delivering value and making a difference through our dedicated efforts and unwavering principles. Our commitments drive us to achieve excellence and build trust with our stakeholders.', number: 1, image: 'Commitment.jpg' },
    { id: 'slide2', title: 'Our Capabilities', content: 'Our capabilities encompass a wide range of skills and expertise, allowing us to provide comprehensive solutions tailored to meet the unique needs of our clients.', number: 2, image: 'Capabilities.avif' },
    { id: 'slide3', title: 'Our Achievements', content: 'We take pride in our accomplishments and the recognition we have received for our contributions and excellence.', number: 3, image: 'Achievements.avif' },
  ];

  activeSlide = 'slide1';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.incrementClientsCounter();
      this.incrementLocationsCounter();
    }
  }
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeIntersectionObserver();
    }
  }
  incrementClientsCounter(): void {
    if (isPlatformBrowser(this.platformId)) {
      const update = () => {
        if (this.clientsCount < this.clientsTarget) {
          this.clientsCount += 1;
          requestAnimationFrame(update);
        } else {
          this.clientsCount = this.clientsTarget;
        }
      };
      update();
    }
  }
  incrementLocationsCounter(): void {
    if (isPlatformBrowser(this.platformId)) {
      const update = () => {
        if (this.locationsCount < this.locationsTarget) {
          this.locationsCount += 1;
          requestAnimationFrame(update);
        } else {
          this.locationsCount = this.locationsTarget;
        }
      };
      update();
    }
  }

  showSlide(slideId: string): void {
    this.activeSlide = slideId;
  }

  private initializeIntersectionObserver(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('animated'); 
          if ((entry.target as HTMLElement).classList.contains('why-us')) {
            this.animateWhyUsSection();
          } else {
            this.animateVisionPoints(entry.target as HTMLElement); 
          }
        } else {
          (entry.target as HTMLElement).classList.remove('animated'); 
          if ((entry.target as HTMLElement).classList.contains('why-us')) {
            this.resetWhyUsSection();
          } else {
            this.resetVisionPoints(entry.target as HTMLElement); 
          }
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });
  
    const visionSection = document.querySelector('.Vision') as HTMLElement | null;
    if (visionSection) observer.observe(visionSection);
  
    if (this.whyUsSection) {
      observer.observe(this.whyUsSection.nativeElement);
    }
  }
  private animateWhyUsSection(): void {
    if (this.whyUsSection) {
      const points = this.whyUsSection.nativeElement.querySelectorAll('.why-us-point');
      const linesContainer = this.whyUsSection.nativeElement.querySelector('.why-us-lines') as HTMLElement;

      linesContainer.innerHTML = '';

      points.forEach((point: HTMLElement, index: number) => {
        if (index < points.length - 1) {
          const line = document.createElement('div');
          line.className = 'line';

          const start = point.getBoundingClientRect();
          const end = (points[index + 1] as HTMLElement).getBoundingClientRect();

          const top1 = start.top + (start.height / 2);
          const left1 = start.left + (start.width / 2);
          const top2 = end.top + (end.height / 2);
          const left2 = end.left + (end.width / 2);

          const height = Math.abs(top2 - top1);
          const width = Math.abs(left2 - left1);

          line.style.top = `${top1}px`;
          line.style.left = `${left1}px`;
          line.style.height = `${height}px`;
          line.style.transform = `translateX(${(left2 - left1)}px)`;

          line.classList.add('visible');
          linesContainer.appendChild(line);
        }
      });                                                                                                              
      points.forEach((point: HTMLElement) => {
        point.classList.add('animated');
      });
    }
  }
  private resetWhyUsSection(): void {
    if (this.whyUsSection) {
      const points = this.whyUsSection.nativeElement.querySelectorAll('.why-us-point');
      const linesContainer = this.whyUsSection.nativeElement.querySelector('.why-us-lines') as HTMLElement;

      linesContainer.innerHTML = '';

      points.forEach((point: HTMLElement) => {
        point.classList.remove('animated');
      });
    }
  }
  private animateVisionPoints(element: HTMLElement): void {
    const points = (element.querySelector('.vision-points') as HTMLElement)?.querySelectorAll('li');
    points?.forEach((point, index) => {
      (point as HTMLElement).style.animationDelay = `${index * 0.5 + 0.5}s`;
      (point as HTMLElement).classList.add('animated');
    });
  }
  private resetVisionPoints(element: HTMLElement): void {
    const points = (element.querySelector('.vision-points') as HTMLElement)?.querySelectorAll('li');
    points?.forEach((point) => {
      (point as HTMLElement).style.animationDelay = '';
      (point as HTMLElement).classList.remove('animated');
    });
  }
}