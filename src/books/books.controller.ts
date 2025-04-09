import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.schema';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.create(createBookDto);
    }

    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Book> {
        const book = await this.booksService.findOne(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.booksService.update(id, updateBookDto);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Book> {
        const book = await this.booksService.remove(id);
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }
}
