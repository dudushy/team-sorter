/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  title = 'DbService';

  constructor() {
    console.log(`[${this.title}#constructor]`);

    this.setupDb();
  }

  setupDb() {
    console.log(`[${this.title}#setupDb]`);
  }

  get(varname: any) {
    const output = JSON.parse(localStorage.getItem(varname) || 'null');
    console.log(`[${this.title}#get] varname: ${varname} | output:`, output);
    return output;
  }

  set(varname: any, value: any) {
    console.log(`[${this.title}#set] varname: ${varname} | value:`, value);
    localStorage.setItem(varname, JSON.stringify(value));
  }
}
