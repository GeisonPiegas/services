import { AngularFireStorage } from 'angularfire2/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private afs: AngularFireStorage) { 

  }

  uploadImagemUsuario(uidUsuario: string, blob: Blob){
    const ref = this.afs.ref('Usuario/'+uidUsuario+'.jpg');
    const task = ref.put(blob);
    return ref.getDownloadURL();     
  }

  uploadImagemCategoria(idCategoria: string, blob: Blob){
    const ref = this.afs.ref('Categoria/'+idCategoria+'.jpg');
    const task = ref.put(blob);
    return ref.getDownloadURL();     
  }
}
