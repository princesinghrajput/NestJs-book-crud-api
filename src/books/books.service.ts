import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

interface Book {
    id: number;
    title: string;
    author: string;
    publishedYear: number;
}

@Injectable()
export class BooksService {
    private books: Book[] = [];
    private idCounter = 1;


    create(book: CreateBookDto) {
        const newBook  = {id: this.idCounter++, ...book};
        this.books.push(newBook);
        return newBook;
    }

    findAll() {
        return this.books;
    }
    

    findOne(id: number) {
        return this.books.find(book => book.id === id);
    }

    update(id: number, updateBookDto: UpdateBookDto) {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new NotFoundException('Book not found');
        }
        this.books[bookIndex] = {...this.books[bookIndex], ...updateBookDto};
        return this.books[bookIndex];
    }

    remove(id: number) {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            throw new NotFoundException('Book not found');
        }
        this.books.splice(bookIndex, 1);
    }
}
