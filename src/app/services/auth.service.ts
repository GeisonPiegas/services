import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './user';
import { AngularFireModule } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private AngularFireAuth: AngularFireAuth){
  }
 
  createUser(email: string, senha: string){
      return this.AngularFireAuth.auth.createUserWithEmailAndPassword(email, senha);

  }
 

 async signIn(user: User){
       const dados = await this.AngularFireAuth.auth.signInWithEmailAndPassword(user.email, user.password);
       return dados;
  }

  signOut(){
        const teste = this.AngularFireAuth.auth.signOut();
        return teste;
  }

  resetPassword(email: string){
      return this.AngularFireAuth.auth.sendPasswordResetEmail(email);
  }

  getAuth(){
    return this.AngularFireAuth.auth;
  }
}
