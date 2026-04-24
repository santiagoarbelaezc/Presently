import { Injectable, signal } from '@angular/core';
import { Presentation } from '../models/presentation.model';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  // Estado de la presentación
  presentation = signal<Presentation | null>(null);
  currentSlideIndex = signal<number>(0);
  
  // Nombre del proyecto actual y ruta base
  projectName = signal<string>('');
  
  // Estado de UI
  isPreviewMode = signal<boolean>(true);
  isLoading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {}

  // Carga el proyecto por nombre desde la carpeta /recursos/
  async loadProject(name: string): Promise<void> {
    if (!name) return;
    
    this.isLoading.set(true);
    this.error.set(null);
    this.projectName.set(name);

    try {
      console.log(`Cargando proyecto desde: /recursos/${name}/presentation.json`);
      const response = await fetch(`/recursos/${name}/presentation.json`);
      
      if (!response.ok) {
        throw new Error(`Código ${response.status}: No se encontró el proyecto "${name}". Revisa que la carpeta public/recursos/${name}/ exista.`);
      }
      
      const data: Presentation = await response.json();
      this.presentation.set(data);
      this.currentSlideIndex.set(0);
      
      // Iniciar automáticamente si se carga con éxito
      await this.startPresentation();
      
    } catch (err: any) {
      console.error('Error al cargar proyecto:', err);
      this.error.set(err.message);
      this.presentation.set(null);
    } finally {
      this.isLoading.set(false);
    }
  }

  // Obtiene la URL de la imagen relativa al proyecto: /recursos/[project]/assets/[filename]
  getImageUrl(path: string | undefined): string {
    if (!path) return '';
    
    // Si ya es una URL completa (http), la dejamos
    if (path.startsWith('http') || path.startsWith('blob:')) return path;

    // Obtenemos solo el nombre del archivo en caso de que el JSON traiga una ruta completa
    const filename = path.split('/').pop() || '';
    
    // Construimos la ruta: /recursos/[proyecto]/assets/[archivo]
    return `/recursos/${this.projectName()}/assets/${filename}`;
  }

  // Navegación
  nextSlide(): void {
    const current = this.currentSlideIndex();
    const total = this.presentation()?.slides.length || 0;
    if (current < total - 1) {
      this.currentSlideIndex.set(current + 1);
    }
  }

  previousSlide(): void {
    const current = this.currentSlideIndex();
    if (current > 0) {
      this.currentSlideIndex.set(current - 1);
    }
  }

  goToSlide(index: number): void {
    const total = this.presentation()?.slides.length || 0;
    if (index >= 0 && index < total) {
      this.currentSlideIndex.set(index);
    }
  }

  // Modo Fullscreen
  async startPresentation(): Promise<void> {
    if (!this.presentation()) return;
    
    this.isPreviewMode.set(false);
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn('No se pudo activar el modo pantalla completa:', err);
    }
  }

  exitPresentation(): void {
    this.isPreviewMode.set(true);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
}
