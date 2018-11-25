// controllers/bookController.ts
import { Request, Response } from 'express'
import Book from '../mongoose/Book'

// We'll start with allBooks which will return
// every we have from our database
export let allBooks = (req: Request, res: Response) => {
  let books = Book.find((err: any, books: any) => {
    if (err) {
      res.send("Error!");
    } else {
      res.send(books);
    }
  })
}
export let getBook = (req: Request, res: Response) => {
  let book = Book.findById(req.params.id, (err: any, book: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(book)
    }
  })
}
export let deleteBook = (req: Request, res: Response) => {
  let book = Book.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err)
    } else {
      res.send("Succesfully Deleted Book");
    }
  })
}
export let updateBook = (req: Request, res: Response) => {
  console.log(req.body);
  let book = Book.findByIdAndUpdate(req.params.id, req.body, (err: any, book: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("Succesfully updated book!");
    }
  });

}
export let addBook = (req: Request, res: Response) => {
  const {title, author} = req.body;
  var book = new Book({title,author});

  book.save((err: any) => {
    if (err) {
      res.send(err)
    } else {
      res.send(book)
    }
  })
}