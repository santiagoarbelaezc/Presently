import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationService } from '../../services/presentation.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Flechas Laterales -->
    <button 
      (click)="service.previousSlide()" 
      class="group fixed left-8 top-1/2 -translate-y-1/2 z-50 p-4 transition-all duration-300 hover:bg-white/5 rounded-full"
      [class.opacity-0]="service.currentSlideIndex() === 0"
      [class.pointer-events-none]="service.currentSlideIndex() === 0">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:-translate-x-1">
        <path d="m15 18-6-6 6-6"/>
      </svg>
    </button>

    <button 
      (click)="service.nextSlide()" 
      class="group fixed right-8 top-1/2 -translate-y-1/2 z-50 p-4 transition-all duration-300 hover:bg-white/5 rounded-full"
      [class.opacity-0]="service.currentSlideIndex() === (service.presentation()?.slides?.length || 1) - 1"
      [class.pointer-events-none]="service.currentSlideIndex() === (service.presentation()?.slides?.length || 1) - 1">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1">
        <path d="m9 18 6-6-6-6"/>
      </svg>
    </button>

    <!-- Dots Indicadores -->
    <div class="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
      @for (slide of service.presentation()?.slides; track slide.id; let i = $index) {
        <button 
          (click)="service.goToSlide(i)"
          class="h-1.5 rounded-full transition-all duration-500"
          [class.bg-white]="service.currentSlideIndex() === i"
          [class.w-4]="service.currentSlideIndex() === i"
          [class.w-1.5]="service.currentSlideIndex() !== i"
          [style.background-color]="service.currentSlideIndex() === i ? 'white' : 'rgba(255,255,255,0.3)'">
        </button>
      }
    </div>

    <!-- Contador -->
    <div class="fixed top-8 right-10 z-50 font-body text-sm tracking-widest text-white/50">
      <span class="text-white">{{ service.currentSlideIndex() + 1 }}</span>
      <span class="mx-2">/</span>
      <span>{{ service.presentation()?.slides?.length }}</span>
    </div>

    <!-- Botón Salir (si no es modo preview) -->
    @if (!service.isPreviewMode()) {
      <button 
        (click)="service.exitPresentation()"
        class="fixed top-8 left-10 z-50 p-2 text-white/30 hover:text-white transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>
    }
  `,
  styles: []
})
export class NavigationComponent {
  service = inject(PresentationService);
}
