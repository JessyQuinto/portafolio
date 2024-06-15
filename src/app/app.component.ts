import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrección de 'styleUrl' a 'styleUrls'
})
export class AppComponent implements OnInit {
  title = 'portafolio';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();

      document.documentElement.classList.add('dark');
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      if (localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      // Change the icons inside the button based on previous settings
      const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
      const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

      if (themeToggleDarkIcon && themeToggleLightIcon) {
        if (localStorage.getItem('color-theme') === 'dark' ||
          (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          themeToggleLightIcon.classList.remove('hidden');
        } else {
          themeToggleDarkIcon.classList.remove('hidden');
        }
      }

      const themeToggleBtn = document.getElementById('theme-toggle');

      if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
          // Toggle icons inside button
          if (themeToggleDarkIcon && themeToggleLightIcon) {
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
          }

          // If set via local storage previously
          if (localStorage.getItem('color-theme')) {
            if (localStorage.getItem('color-theme') === 'light') {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
            } else {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
            }
          } else {
            // If NOT set via local storage previously
            if (document.documentElement.classList.contains('dark')) {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('color-theme', 'light');
            } else {
              document.documentElement.classList.add('dark');
              localStorage.setItem('color-theme', 'dark');
            }
          }
        });
      }

    }
  }
}
