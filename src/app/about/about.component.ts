import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  clientsCount: number = 80;
  locationsCount: number = 0;
  clientsTarget: number = 1000;
  locationsTarget: number = 10;
  duration: number = 2000;
  clientsIncrementTime: number;
  locationsIncrementTime: number;

  @ViewChild('whyUsSection') whyUsSection!: ElementRef;

  whyUsContent = [
    { id: 'whyUs1', title: 'Expert Team', description: 'Our team consists of experienced professionals with a proven track record of delivering high-quality solutions.' },
    { id: 'whyUs2', title: 'Innovative Solutions', description: 'We use the latest technologies and innovative methods to address complex challenges and drive success.' },
    { id: 'whyUs3', title: 'Client-Centric Approach', description: 'We prioritize our clients’ needs, offering personalized services and support to ensure satisfaction and success.' },
    { id: 'whyUs4', title: 'Proven Results', description: 'Our results speak for themselves, with a portfolio of successful projects and satisfied clients.' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.clientsIncrementTime = Math.floor(this.duration / this.clientsTarget);
    this.locationsIncrementTime = Math.floor(this.duration / this.locationsTarget);
  }

  ngOnInit(): void {
    this.incrementClientsCounter();
    this.incrementLocationsCounter();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeIntersectionObserver();
    }
  }

  incrementClientsCounter(): void {
    if (this.clientsCount < this.clientsTarget) {
      this.clientsCount += 1;
      setTimeout(() => this.incrementClientsCounter(), this.clientsIncrementTime);
    } else {
      this.clientsCount = this.clientsTarget;
    }
  }

  incrementLocationsCounter(): void {
    if (this.locationsCount < this.locationsTarget) {
      this.locationsCount += 1;
      setTimeout(() => this.incrementLocationsCounter(), this.locationsIncrementTime);
    } else {
      this.locationsCount = this.locationsTarget;
    }
  }

  slides = [
    { id: 'slide1', title: 'Our Commitment', content: 'We are committed to delivering value and making a difference through our dedicated efforts and unwavering principles. Our commitments drive us to achieve excellence and build trust with our stakeholders.', number: 1 },
    { id: 'slide2', title: 'Our Capabilities', content: 'Our capabilities encompass a wide range of skills and expertise, allowing us to provide comprehensive solutions tailored to meet the unique needs of our clients.', number: 2 },
    { id: 'slide3', title: 'Our Achievements', content: 'We take pride in our accomplishments and the recognition we have received for our contributions and excellence.', number: 3 },
  ];
  activeSlide = 'slide1';

  showSlide(slideId: string) {
    this.activeSlide = slideId;
  }

  private initializeIntersectionObserver() {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.classList.add('animated');

          if (element.classList.contains('why-us')) {
            this.animateWhyUsSection();
          } else {
            const points = (element.querySelector('.vision-points') as HTMLElement)?.querySelectorAll('li');
            points?.forEach((point, index) => {
              (point as HTMLElement).style.animationDelay = `${index * 0.5 + 0.5}s`;
              (point as HTMLElement).classList.add('animated');
            });
          }
        } else {
          const element = entry.target as HTMLElement;
          element.classList.remove('animated');

          if (element.classList.contains('why-us')) {
            this.resetWhyUsSection();
          } else {
            const points = (element.querySelector('.vision-points') as HTMLElement)?.querySelectorAll('li');
            points?.forEach((point) => {
              (point as HTMLElement).style.animationDelay = '';
              (point as HTMLElement).classList.remove('animated');
            });
          }
        }
      });
    }, observerOptions);

    const visionSection = document.querySelector('.Vision');
    if (visionSection) {
      observer.observe(visionSection);
    }

    const whyUsSection = this.whyUsSection?.nativeElement;
    if (whyUsSection) {
      observer.observe(whyUsSection);
    }
  }

  private animateWhyUsSection() {
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

  private resetWhyUsSection() {
    if (this.whyUsSection) {
      const points = this.whyUsSection.nativeElement.querySelectorAll('.why-us-point');
      const linesContainer = this.whyUsSection.nativeElement.querySelector('.why-us-lines') as HTMLElement;

    
      linesContainer.innerHTML = '';

     
      points.forEach((point: HTMLElement) => {
        point.classList.remove('animated');
      });
    }
  }
}
