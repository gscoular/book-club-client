import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Book } from './book-detail/book';
import { Person } from './book-detail/person';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  get(bookId: string): Observable<Book> {
    const b = new Book(
      "Moby Dick",
      new Person("Herman Melville"),
      "Men hunt for a whale!",
      "https://picsum.photos/200/300"
    )
    return of(b);
  }
}
