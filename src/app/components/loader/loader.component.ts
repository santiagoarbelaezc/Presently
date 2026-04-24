import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresentationService } from '../../services/presentation.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-background overflow-y-auto scrollbar-hide bg-dot">
      <div class="min-h-full w-full flex flex-col items-center justify-center p-8 md:p-20">
        
        <div class="w-full max-w-4xl space-y-20 animate-fade-in flex flex-col items-center">
          
          <!-- Header -->
          <div class="text-center space-y-6">
            <h1 class="text-7xl md:text-[11rem] font-title tracking-tighter text-gradient leading-none">Presently</h1>
            <p class="text-white/20 font-body tracking-[0.8em] uppercase text-[10px]">Minimalist Presentation Engine</p>
          </div>

          <!-- Project Input Section -->
          <div class="w-full max-w-2xl space-y-10 flex flex-col items-center">
            
            <div class="w-full relative group">
              <input 
                type="text" 
                [(ngModel)]="projectInput"
                (keydown.enter)="onLoadProject()"
                placeholder="Nombre del proyecto..."
                class="w-full bg-white/[0.02] border-b border-white/10 py-6 px-4 text-3xl md:text-5xl font-title text-center text-white placeholder:text-white/10 focus:outline-none focus:border-white/40 transition-all duration-700 uppercase tracking-tighter">
              <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-focus-within:w-full transition-all duration-1000"></div>
            </div>

            <div class="flex flex-col items-center gap-6 w-full">
              <button 
                (click)="onLoadProject()"
                [disabled]="!projectInput || service.isLoading()"
                class="group relative px-12 py-4 bg-white text-black font-body overflow-hidden transition-all duration-500 hover:px-16 active:scale-95 disabled:opacity-30 disabled:pointer-events-none">
                <span class="relative z-10 uppercase tracking-widest text-[11px] font-bold">
                  {{ service.isLoading() ? 'Cargando...' : 'Generar Presentación' }}
                </span>
                <div class="absolute inset-0 bg-black/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>

              @if (service.error()) {
                <p class="text-red-500/80 text-xs font-body tracking-widest uppercase animate-shake">{{ service.error() }}</p>
              }
            </div>

          </div>

          <!-- Quick Help / Instructions -->
          <div class="w-full max-w-3xl glass p-10 md:p-12 rounded-[2.5rem] space-y-8 border-white/[0.03]">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm text-white/30 leading-relaxed font-body">
              <div class="space-y-4">
                <p class="text-white/60 font-semibold uppercase tracking-widest text-[10px]">Ubicación de Archivos</p>
                <p>Coloque su carpeta en <br><code class="text-white/50 text-[11px]">public/recursos/[nombre]/</code></p>
              </div>
              <div class="space-y-4">
                <p class="text-white/60 font-semibold uppercase tracking-widest text-[10px]">Contenido Requerido</p>
                <p>Archivo <code class="text-white/50 text-[11px]">presentation.json</code> y una carpeta <code class="text-white/50 text-[11px]">assets/</code> para imágenes.</p>
              </div>
            </div>
            
            <div class="pt-6 border-t border-white/[0.03] text-center">
              <a href="recursos/demo/presentation.json" download="demo.json" class="text-[10px] uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors duration-500">
                Descargar estructura de ejemplo (demo)
              </a>
            </div>
          </div>

          <!-- Preview Info -->
          @if (service.presentation() && !service.error()) {
            <div class="text-center animate-fade-in space-y-4 pt-10">
              <div class="space-y-1">
                <p class="text-3xl font-title text-gradient">{{ service.presentation()?.title }}</p>
                <p class="text-white/30 font-body uppercase tracking-[0.4em] text-[10px]">{{ service.presentation()?.slides?.length }} diapositivas por {{ service.presentation()?.author }}</p>
              </div>
              
              <button 
                (click)="service.startPresentation()"
                class="text-white hover:text-white/100 text-white/60 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="animate-pulse">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </button>
            </div>
          }

        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-4px); }
      75% { transform: translateX(4px); }
    }
    .animate-shake { animation: shake 0.4s ease-in-out; }
  `]
})
export class LoaderComponent {
  service = inject(PresentationService);
  projectInput: string = 'demo'; // Por defecto demo para facilitar pruebas

  onLoadProject(): void {
    if (this.projectInput) {
      this.service.loadProject(this.projectInput.trim().toLowerCase());
    }
  }
}
