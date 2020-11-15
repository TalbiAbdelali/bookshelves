import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/Models/Book.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() { }

  emitBooks() {
    this.booksSubject.next(this.books);
  }

  saveBooks() {
    firebase.default.database().ref('/books').set(this.books);
  }

  getBooks() {
    firebase.default.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      })
  }

  getSingle(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.default.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
    this.emitBooks();
  }

  deleteBook(book: Book) {
    if(book.photo) {
      const storageRef = firebase.default.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo deleted!');
        }
      ).catch(
        (error) => {
          console.log('File unfound: ' + error);
          
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookEl) => {
        if(bookEl === book) {
          return true;
        }
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const fileRef = firebase.default.storage().ref()
                          .child('images/' + almostUniqueFileName + file.name);
        const upload = fileRef.put(file);
        
        
        upload.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...');
          },
          (error) => {
            console.log('Loading error: ' + error);
            reject();
          },
          () => {
            resolve(upload
                    .then(snap=>{
                      return fileRef.getDownloadURL()
                    })
            );            
          }
          );
      }
    );
  }
}
