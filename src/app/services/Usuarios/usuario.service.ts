import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Endereco } from '../Endereco/endereco';
import { EnderecoService } from '../Endereco/endereco.service';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  private todosCollection: AngularFirestoreCollection<Usuario>;
  private todosUsuarios: Observable<Usuario[]>;

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private enderecoService: EnderecoService,) {
    this.todosCollection = db.collection<Usuario>('Usuario');
    
    this.todosUsuarios = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const uid = a.payload.doc.id;
          return { uid, ...data };
        });
      })
    )
  }
  
  getTodos() {
    return this.todosUsuarios;
  }
 
  getTodo(id) {
    return this.todosCollection.doc<Usuario>(id).valueChanges();
  }
 
  updateTodo(toda: Usuario, id: string) {
    return this.todosCollection.doc<Usuario>(id).update(toda);
  }

  updateAdmin(id: string, valor: boolean){
    return this.todosCollection.doc<Usuario>(id).update({isAdmin: valor})
  }

  updateAtivo(id: string, valor: boolean){
    return this.todosCollection.doc<Usuario>(id).update({isAtivo: valor})
  }
 
  //FUNÇÃO PARA CADASTRAR NOVO USUARIO
  async addTodo(dataUser: Usuario, dataEnd: Endereco, foto: any) {
    //CADASTRA USUARIO NO AUTHENTICATION
    const newUser = await this.authService.createUser(dataUser.email, dataUser.senha);

    //EXLUI A SENHA E O EMAIL, PARA NÃO IR A DATABASE
    delete dataUser.senha;
    delete dataUser.email;

    dataUser.foto = "https://firebasestorage.googleapis.com/v0/b/primeirobanco-8d1a9.appspot.com/o/User.png?alt=media&token=78d69205-4005-4f3b-8925-10439a145ffa";

    //ADICIONA O RETANTES DOS DADOS DO USUARIO NO DATABASE
    this.db.collection('Usuario').doc(newUser.user.uid).set(dataUser); 

    //DELEGA O CADASTRO DE ENDEREÇO, PARA O SERVICE DE ENDEREÇO
    this.enderecoService.addTodo(newUser.user.uid, dataEnd);   
    
    return;
  }
 
  removeTodo(id) {
    return this.todosCollection.doc(id).delete();
  }

  getPorid(categoria: String){
    return this.db.collection('Usuario', ref => ref.where('idCategoria','==',categoria)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          console.log(data);
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    )
  }

  buscaUmPorUm(id){
    return this.todosCollection.doc<Usuario>(id).snapshotChanges().pipe(
      map(a => {
          const data = a.payload.data();
          console.log(data);
          const id = a.payload.id;
          return { id, ...data}
      })
    )
  }
}