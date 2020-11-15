import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/Models/Book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) { }

  ngOnInit(): void {
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingle(+id).then(
      (book: Book) => {
        console.log(book);
        this.book = book;
      }
    );
  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
