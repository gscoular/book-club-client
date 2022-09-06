import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { Book } from './book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$: Observable<Book>;
  constructor(private readonly service: BookService) { }

  ngOnInit(): void {
    this.book$ = this.service.get("bookId")
  }
}
