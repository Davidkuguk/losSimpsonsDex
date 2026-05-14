import { Component, signal } from '@angular/core';

type PageId = 'inicio' | 'personajes' | 'historias' | 'coleccion' | 'contacto';

interface NavItem {
  id: PageId;
  label: string;
}

interface Character {
  name: string;
  category: string;
  status: string;
  image: string;
  alt: string;
  cardClass: string;
}

interface Story {
  badge: string;
  badgeClass: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly activePage = signal<PageId>('inicio');

  protected readonly navItems: NavItem[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'personajes', label: 'Personajes' },
    { id: 'historias', label: 'Historias' },
    { id: 'coleccion', label: 'Coleccion' },
    { id: 'contacto', label: 'Contacto' },
  ];

  protected readonly characters: Character[] = [
    {
      name: 'Homer',
      category: 'Padre',
      status: 'Registrado',
      image: 'img/homero.png',
      alt: 'Homer Simpson',
      cardClass: 'bg-warning',
    },
    {
      name: 'Marge',
      category: 'Madre',
      status: 'Desbloqueada',
      image: 'img/margepng.png',
      alt: 'Marge Simpson',
      cardClass: 'bg-primary text-white',
    },
    {
      name: 'Bart',
      category: 'Hijo',
      status: 'Registrado',
      image: 'img/bart.png',
      alt: 'Bart Simpson',
      cardClass: 'bg-danger text-white',
    },
    {
      name: 'Lisa',
      category: 'Hija',
      status: 'Desbloqueada',
      image: 'img/lisa.png',
      alt: 'Lisa Simpson',
      cardClass: 'bg-info',
    },
    {
      name: 'Mr. Burns',
      category: 'Antagonista',
      status: 'Registrado',
      image: 'img/mrBurns.png',
      alt: 'Mr. Burns',
      cardClass: 'bg-dark text-white',
    },
    {
      name: 'Milhouse',
      category: 'Amigo',
      status: 'Desbloqueado',
      image: 'img/milhouse.png',
      alt: 'Milhouse Van Houten',
      cardClass: 'bg-secondary text-white',
    },
  ];

  protected readonly stories: Story[] = [
    {
      badge: 'Mision 01',
      badgeClass: 'text-bg-warning border border-dark',
      title: 'La familia principal',
      text: 'Homer, Marge, Bart y Lisa forman el nucleo inicial de la coleccion.',
    },
    {
      badge: 'Mision 02',
      badgeClass: 'text-bg-danger',
      title: 'Travesuras de Bart',
      text: 'Bart aparece como personaje de tipo hijo con fondo rojo de peligro.',
    },
    {
      badge: 'Mision 03',
      badgeClass: 'text-bg-dark',
      title: 'El jefe final',
      text: 'Mr. Burns representa el antagonista de la coleccion SimpsonsDex.',
    },
  ];

  protected showPage(page: PageId): void {
    this.activePage.set(page);
  }
}
