import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Slide } from '../../models/presentation.model';
import { PresentationService } from '../../services/presentation.service';

@Component({
  selector: 'app-slide',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-full flex flex-col overflow-hidden animate-slide-up bg-background">
      
      <!-- Layout: Cover -->
      @if (slide.type === 'cover') {
        <div class="relative flex-1 flex flex-col items-center justify-center p-20 text-center">
          @if (slide.image) {
            <div class="absolute inset-0 z-0">
              <img [src]="service.getImageUrl(slide.image)" class="w-full h-full object-cover opacity-10 grayscale contrast-150" alt="Cover">
              <div class="absolute inset-0 bg-gradient-to-b from-black/5 via-black/20 to-black/95"></div>
            </div>
          }
          <div class="relative z-10 space-y-12">
            <h1 class="text-7xl md:text-[14rem] font-bold text-white tracking-tighter leading-[0.8] animate-slide-up">{{ slide.title }}</h1>
            <div class="h-[2px] w-48 bg-white mx-auto animate-slide-up" style="animation-delay: 0.2s"></div>
            <p class="text-xl md:text-3xl text-white/30 font-body font-light tracking-[0.8em] uppercase animate-slide-up" style="animation-delay: 0.3s">
              {{ slide.subtitle }}
            </p>
          </div>
        </div>
      }

      <!-- Layout: Text Only -->
      @if (slide.type === 'text') {
        <div class="flex-1 flex flex-col justify-center px-12 md:px-32 lg:px-64"
             [class.items-center]="slide.layout === 'center'"
             [class.text-center]="slide.layout === 'center'">
          <h2 class="text-5xl md:text-[8rem] font-semibold mb-12 text-white animate-slide-up tracking-tighter leading-none">{{ slide.title }}</h2>
          <div class="text-xl md:text-4xl text-white/40 font-light font-body leading-tight max-w-6xl animate-slide-up" style="animation-delay: 0.2s">
            {{ slide.body }}
          </div>
        </div>
      }

      <!-- Layout: Image + Text -->
      @if (slide.type === 'image-text') {
        <div class="flex-1 flex flex-col md:flex-row h-full">
          <div class="flex-1 flex flex-col justify-center p-12 md:p-40"
               [class.order-1]="slide.layout === 'image-right'"
               [class.order-2]="slide.layout === 'image-left'">
            <h2 class="text-4xl md:text-8xl font-bold mb-12 text-white animate-slide-up tracking-tighter leading-none">{{ slide.title }}</h2>
            <div class="text-lg md:text-3xl text-white/40 font-light font-body leading-tight animate-slide-up" style="animation-delay: 0.2s">
              {{ slide.body }}
            </div>
          </div>
          <div class="flex-1 relative overflow-hidden"
               [class.order-2]="slide.layout === 'image-right'"
               [class.order-1]="slide.layout === 'image-left'">
            <img [src]="service.getImageUrl(slide.image)" class="absolute inset-0 w-full h-full object-cover grayscale brightness-25 contrast-200 transition-all duration-[3000ms] scale-110 hover:scale-100 ease-out" alt="Slide Image">
          </div>
        </div>
      }

      <!-- Layout: Full Image -->
      @if (slide.type === 'full-image') {
        <div class="flex-1 relative overflow-hidden flex items-center justify-center">
          <img [src]="service.getImageUrl(slide.image)" class="absolute inset-0 w-full h-full object-cover grayscale opacity-40" alt="Fullscreen Image">
          @if (slide.overlay) {
            <div class="absolute inset-0 bg-black/80"></div>
          }
          <h2 class="relative z-10 text-5xl md:text-[12rem] font-black text-white text-center animate-slide-up tracking-tighter leading-[0.8]">{{ slide.title }}</h2>
        </div>
      }

      <!-- Layout: List -->
      @if (slide.type === 'list') {
        <div class="flex-1 flex flex-col justify-center px-12 md:px-32 lg:px-64"
             [class.items-center]="slide.layout === 'center'"
             [class.text-center]="slide.layout === 'center'">
          <h2 class="text-4xl md:text-[9rem] font-bold mb-20 text-white animate-slide-up tracking-tighter leading-none">{{ slide.title }}</h2>
          <ul class="space-y-6 md:space-y-10">
            @for (item of slide.items; track item; let i = $index) {
              <li class="flex items-center gap-12 animate-slide-up" [style.animation-delay]="(i * 0.1 + 0.3) + 's'">
                <div class="h-[1px] w-12 bg-white/10"></div>
                <span class="text-xl md:text-5xl font-light text-white/60 tracking-tighter">{{ item }}</span>
              </li>
            }
          </ul>
        </div>
      }

      <!-- Layout: Closing -->
      @if (slide.type === 'closing') {
        <div class="flex-1 flex flex-col items-center justify-center p-20 text-center bg-background">
          <div class="space-y-16">
            <h2 class="text-6xl md:text-[15rem] font-black text-white leading-none tracking-tighter animate-slide-up">{{ slide.title }}</h2>
            <div class="h-[4px] w-64 bg-white mx-auto animate-slide-up" style="animation-delay: 0.2s"></div>
            <p class="text-xl md:text-3xl text-white/20 font-body font-light tracking-[2em] uppercase animate-slide-up" style="animation-delay: 0.3s">
              {{ slide.subtitle }}
            </p>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class SlideComponent {
  @Input({ required: true }) slide!: Slide;
  service = inject(PresentationService);
}
