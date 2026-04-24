import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationService } from './services/presentation.service';
import { LoaderComponent } from './components/loader/loader.component';
import { SlideComponent } from './components/slide/slide.component';
import { NavigationComponent } from './components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LoaderComponent, SlideComponent, NavigationComponent],
  template: `
    <main class="relative w-full h-full bg-background selection:bg-white selection:text-black">
      
      @if (service.isPreviewMode()) {
        <app-loader></app-loader>
      } @else {
        <!-- Modo Presentación -->
        <div class="fixed inset-0 overflow-hidden" 
             (touchstart)="onTouchStart($event)" 
             (touchend)="onTouchEnd($event)">
          
          <div class="relative w-full h-full">
            @if (service.presentation(); as pres) {
              <app-slide [slide]="pres.slides[service.currentSlideIndex()]"></app-slide>
              <app-navigation></app-navigation>
            }
          </div>

          <!-- Grid sutil de fondo -->
          <div class="absolute inset-0 pointer-events-none opacity-20 bg-grid z-0"></div>
        </div>
      }

    </main>
  `,
  styles: [`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  `]
})
export class AppComponent {
  service = inject(PresentationService);
  
  // Variables para swipe
  private touchStartX = 0;
  private touchEndX = 0;

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.service.isPreviewMode()) return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        this.service.nextSlide();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        this.service.previousSlide();
        break;
      case 'Escape':
        this.service.exitPresentation();
        break;
    }
  }

  // Swipe detection
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeDistance = this.touchEndX - this.touchStartX;
    const threshold = 50;

    if (swipeDistance < -threshold) {
      this.service.nextSlide();
    } else if (swipeDistance > threshold) {
      this.service.previousSlide();
    }
  }
}
