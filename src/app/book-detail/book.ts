import { Person } from "./person";


export class Book {
    id: string
    title: string;
    author: Person;
    description: string;
    imageUrl: string;

    constructor(title: string, author: Person, description: string, imageUrl: string) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.imageUrl = this.imageUrl
    }
}