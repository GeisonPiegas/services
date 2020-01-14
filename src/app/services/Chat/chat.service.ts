import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Chat } from './chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  
  constructor(private db: AngularFirestore) {
   
  }

  getChat(idChat: string) {
    return this.db.collection<Chat>('Chat').doc(idChat).collection<Chat>(idChat, ref => ref.orderBy('createdAt')).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  newChat(idChat: string){
    const novo: Chat = {
      mensagem: "Iniciado",
      createdAt: null,
      visualizado: false,
      uidUser: ''
    }
    return this.db.collection('Chat').doc(idChat).collection(idChat).add(novo);
  }
 
  addChat(idChat: string, chat: Chat) {
    return this.db.collection('Chat/'+idChat+'/'+idChat).add(chat);
  }
}
