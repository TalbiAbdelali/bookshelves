import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Book } from 'src/Models/Book.model';
import { BooksService } from '../services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];

  booksSubscription: Subscription;

  constructor(private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.getBooks();
    this.booksService.emitBooks();
  }

  onNewBook(){
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    this.booksService.deleteBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books','view', id]);
  }

  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
