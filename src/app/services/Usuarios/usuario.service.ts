import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Endereco } from '../Endereco/endereco';
import { EnderecoService } from '../Endereco/endereco.service';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Core } from 'src/app/core/core.module';




@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  private todosCollection: AngularFirestoreCollection<Usuario>;
  private todosUsuarios: Observable<Usuario[]>;
  private fotoDefault = "https://firebasestorage.googleapis.com/v0/b/primeirobanco-8d1a9.appspot.com/o/User.png?alt=media&token=78d69205-4005-4f3b-8925-10439a145ffa";

  constructor(
    private db: AngularFirestore,
    private authService: AuthService,
    private enderecoService: EnderecoService,
    private storage: StorageService,
    private core: Core) {

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
  
  getUsuarios() {
    return this.todosUsuarios;
  }
 
  getUsuario(id) {
    return this.todosCollection.doc<Usuario>(id).valueChanges();
  }
 
  updateUsuarioTodo(toda: Usuario, id: string) {
    this.storage.uploadImagemUsuario(id, toda.foto).subscribe( res => {
      toda.foto = res;
    })
    return this.todosCollection.doc<Usuario>(id).update(toda);
  }

  updateUsuarioAdmin(id: string, valor: boolean){
    return this.todosCollection.doc<Usuario>(id).update({isAdmin: valor})
  }

  updateUsuarioAtivo(id: string, valor: boolean){
    return this.todosCollection.doc<Usuario>(id).update({isAtivo: valor})
  }
 
  //FUNÇÃO PARA CADASTRAR NOVO USUARIO
  async addUsuarioTodo(dataUser: Usuario, dataEnd: Endereco) {

    //CADASTRA USUARIO NO AUTHENTICATION
    await this.authService.createUser(dataUser.email, dataUser.senha).then((novoUser) => {
        //EXLUI A SENHA E O EMAIL, PARA NÃO IR A DATABASE
      delete dataUser.senha;
      delete dataUser.email;

      //FOTO DEFAULT DE NOVO USUARIO
      dataUser.foto = this.fotoDefault;

      //ADICIONA O RETANTES DOS DADOS DO USUARIO NO DATABASE
      this.todosCollection.doc(novoUser.user.uid).set(dataUser); 

      //DELEGA O CADASTRO DE ENDEREÇO, PARA O SERVICE DE ENDEREÇO
      this.enderecoService.addTodo(novoUser.user.uid, dataEnd); 

    }).catch((error: any) => {

      //IDENTIFICA O ERRO CORRESPONDENTE 
      this.core.identificaError(error.code);
    });
    
    return;
  }
 
  removeUsuarioTodo(id) {
    return this.todosCollection.doc(id).delete();
  }

  getUsuarioPorid(categoria: String){
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

  getUsuarioUmPorUm(id){
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