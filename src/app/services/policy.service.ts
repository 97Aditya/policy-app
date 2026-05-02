import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Policy } from '../models/policy';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

   private url = 'assets/policies.json';

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.url);
  }
}
