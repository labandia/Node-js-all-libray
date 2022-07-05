import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../config';
import * as moment from 'moment'; 
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   result : any =[];

   constructor(private http: HttpClient) {}


   public posdata(route: string, data: any){
      return this.http.post<any>(`${config.apiUrl}${route}`, data);
   }

   public getdata(route: string){
      return this.http.get<any>(`${config.apiUrl}${route}`);
   }


   searchdata(term: string){
      let request = `${config.apiUrl}getblog2/${term}`;
      return this.http.get<any>(request).pipe(
         map(res=>{ 
            console.log(res);
         })
      ).subscribe(data=>{
            // console.log(data);
      })
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