import { Injectable, signal } from '@angular/core';
import { Presentation, Slide } from '../models/presentation.model';

@Injectable({
  providedIn: 'root'
})
export class PresentationService {
  // Estado de la presentación
  presentation = signal<Presentation | null>(null);
  currentSlideIndex = signal<number>(0);
  
  // Mapa de nombres de archivo a URLs de objetos (para imágenes locales)
  imageMap = new Map<string, string>();
  
  // Modo de edición / presentación
  isPreviewMode = signal<boolean>(true);

  constructor() {}

  // Carga el archivo JSON de la presentación
  async loadPresentation(file: File): Promise<void> {
    const text = await file.text();
    const data: Presentation = JSON.parse(text);
    this.presentation.set(data);
    this.currentSlideIndex.set(0);
  }

  // Carga múltiples imágenes y crea ObjectURLs para ellas
  async loadImages(files: FileList | File[]): Promise<void> {
    const fileArray = Array.from(files);
    for (const file of fileArray) {
      const url = URL.createObjectURL(file);
      this.imageMap.set(file.name, url);
    }
  }

  // Obtiene la URL mapeada para una imagen o devuelve la original
  getImageUrl(path: string | undefined): string {
    if (!path) return '';
    // Extraer solo el nombre del archivo del path (ej: assets/demo/images/cover.jpg -> cover.jpg)
    const filename = path.split('/').pop() || '';
    return this.imageMap.get(filename) || path;
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
