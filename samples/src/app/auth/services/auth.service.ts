import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';
import * as moment from 'moment'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {


   constructor(private http: HttpClient) {}


   public posdata(route: string, data: any){
      return this.http.post<any>(`${config.apiUrl}${route}`, data);
   }

   public getdata(route: string){
      return this.http.get<any>(`${config.apiUrl}${route}`);
   }


   public userlogout(){
      localStorage.removeItem('token');
      localStorage.removeItem('expires');
   }

   // private Loginuser(username: string, tokens: Tokens){
   //    this.loggedUser = username;
   //    this.storeToken(tokens);
   // }

   public storeToken(tk:any){
      const expiresAt = moment().add(Number.parseInt(tk.expiresIn), 'days');
        localStorage.setItem('token', tk.token);
        localStorage.setItem("expires", JSON.stringify(expiresAt.valueOf()) );
   }

   public isLoginuser(){
      return moment().isBefore(this.getExpiration(),"second");
   }

   public isLogout(){
      return !this.isLoginuser();
   }

   public getExpiration(){
      const expiration = localStorage.getItem('expires');
      if(expiration){
         const expiresat = JSON.parse(expiration);
         return moment(expiresat);
      }else{
         return moment();
      }
   }

  
}