import { Injectable } from '@angular/core';
import { sample_items } from 'src/data';
import { Item } from '../shared/models/item';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObervable: Observable<User>;


  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) { 
    this.userObervable = this.userSubject.asObservable();
  }


  login(userLogin: IUserLogin): Observable<User> {
    return this.httpClient.post<User>(environment.baseURL + '/users/login', userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Coffe-In-Cloud ${user.name}`,
            `Login Successful`
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Login fail!');
        }
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.httpClient.post<User>(environment.baseURL + '/users/signup', userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Coffe-In-Cloud ${user.name}`,
            `Register Successful`
          );
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error, 'Register failed!');
        }
      })
    )
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload()
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User{
    const userJson = localStorage.getItem(USER_KEY);

    if(userJson) return JSON.parse(userJson) as User;

    return new User();
  }
}
