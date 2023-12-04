import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../shared/models/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private httpClient: HttpClient) {}

  searchAddress(zipCode: string): Observable<Address> {
    return this.httpClient.get<Address>(
      environment.baseURL + `/address/${zipCode}`,
    );
  }
}
