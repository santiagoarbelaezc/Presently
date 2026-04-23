export interface Slide {
  id: number;
  type: 'cover' | 'text' | 'image-text' | 'full-image' | 'list' | 'closing';
  title?: string;
  subtitle?: string;
  body?: string;
  image?: string;
  layout?: 'left' | 'center' | 'right' | 'image-right' | 'image-left';
  items?: string[];
  overlay?: boolean;
}

export interface Presentation {
  title: string;
  author: string;
  theme: 'dark' | 'light';
  slides: Slide[];
}
