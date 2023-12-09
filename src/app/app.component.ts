/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ChangeDetectorRef } from '@angular/core';

import { DbService } from './services/db/db.service';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  PROJECT_NAME = 'Team Sorter';
  PROJECT_DIR = 'team-sorter';

  title = 'AppComponent';

  allPages: any = [];
  currentPage: any = null;

  theme = 'dark';
  showMenu = false;
  hasScrollbar = false;

  constructor(
    public db: DbService,
    public router: Router,
    private cdr: ChangeDetectorRef,
    public location: Location
  ) {
    console.log(`[${this.title}#constructor]`);

    const rawAllPages = this.router.config;
    console.log(`[${this.title}#constructor] rawAllPages`, rawAllPages);

    this.allPages = rawAllPages.filter((page: any) => {
      return (
        page.path !== '' &&
        page.path !== '**' &&
        page.path !== 'home' &&
        page.path !== 'test' &&
        page.path !== 'not-found'
      );
    });

    console.log(`[${this.title}#constructor] allPages`, this.allPages);

    this.theme = this.db.get('theme') || 'dark';
    this.toggleTheme(this.theme);

    window.onresize = () => {
      console.log(`[${this.title}#window.onresize]`);

      this.detectScrollbar();
    };

    window.onload = () => {
      console.log(`[${this.title}#window.onload]`);

      const url = this.router.url.replace('/', '');
      console.log(`[${this.title}#window.onload] url`, url);
      if (url == '') window.history.pushState({}, '', `/${this.PROJECT_DIR}/`);

      this.loadLastScrollPosition();

      this.detectScrollbar();
    };

    window.onbeforeunload = () => {
      console.log(`[${this.title}#window.onbeforeunload]`);

      this.saveLastScrollPosition();
    };
  }

  updateView(from: string) {
    console.log(`[${this.title}#updateView] from`, from);
    this.cdr.detectChanges;
  }

  async redirectTo(url: any, from: any) {
    console.log(`[${this.title}#redirectTo] ${from} | url`, [url]);

    await this.router.navigateByUrl(`/${url}`);

    if (url == '') window.history.pushState({}, '', `/${this.PROJECT_DIR}/`);

    document.title = this.PROJECT_NAME;

    this.currentPage = url;
    this.db.set('last_page', url);
    console.log(`[${this.title}#redirectTo] last_page`, [this.db.get('last_page')]);

    this.detectScrollbar();

    const appRoot = document.querySelector('app-root');
    console.log(`[${this.title}#redirectTo] appRoot`, appRoot);

    appRoot.scrollTop = 0;

    this.updateView(this.title);
  }

  defaultOrder() { return 0; }

  toggleTheme(theme: any) {
    console.log(`[${this.title}#toggleTheme] theme`, theme);

    this.theme = theme;
    this.db.set('theme', theme);

    document.documentElement.setAttribute('theme', theme);
    document.documentElement.style.setProperty('--theme', theme);

    this.updateView(this.title);
  }

  toggleMenu() {
    console.log(`[${this.title}#toggleMenu] showMenu`, this.showMenu);

    this.showMenu = !this.showMenu;

    const menuDiv = document.getElementById('menuDiv');
    console.log(`[${this.title}#toggleMenu] menuDiv`, menuDiv);

    menuDiv.className = this.showMenu ? 'show' : 'hide';
  }

  detectScrollbar() {
    const appRoot = document.querySelector('app-root');
    console.log(`[${this.title}#detectScrollbar] appRoot`, appRoot);

    this.hasScrollbar = appRoot.scrollHeight > appRoot.clientHeight;
    console.log(`[${this.title}#detectScrollbar] hasScrollbar`, this.hasScrollbar);
  }

  openLink(url) {
    window.open(url, '_blank');
  }

  saveLastScrollPosition() {
    console.log(`[${this.title}#saveLastScrollPosition]`);

    const appRoot = document.querySelector('app-root');
    console.log(`[${this.title}#saveLastScrollPosition] appRoot`, appRoot);

    this.db.set('lastScrollPosition', appRoot.scrollTop);
    console.log(`[${this.title}#saveLastScrollPosition] lastScrollPosition`, this.db.get('lastScrollPosition'));
  }

  loadLastScrollPosition() {
    console.log(`[${this.title}#loadLastScrollPosition]`);

    const appRoot = document.querySelector('app-root');
    console.log(`[${this.title}#loadLastScrollPosition] appRoot`, appRoot);

    const lastScrollPosition = this.db.get('lastScrollPosition');
    console.log(`[${this.title}#loadLastScrollPosition] lastScrollPosition`, lastScrollPosition);

    if (lastScrollPosition) {
      appRoot.scrollTop = lastScrollPosition;
    }
  }
}
