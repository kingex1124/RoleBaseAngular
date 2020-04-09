import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionSettingService {
   httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': 'https://localhost:44362',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Max-Age': '86400'
    })
  };
  constructor() { }
}
