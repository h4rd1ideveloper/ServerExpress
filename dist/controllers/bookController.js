"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("../mongoose/Book");
// We'll start with allBooks which will return
// every we have from our database
exports.allBooks = (req, res) => {
    let books = Book_1.default.find((err, books) => {
        if (err) {
            res.send("Error!");
        }
        else {
            res.send(books);
        }
    });
};
exports.getBook = (req, res) => {
    let book = Book_1.default.findById(req.params.id, (err, book) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(book);
        }
    });
};
exports.deleteBook = (req, res) => {
    let book = Book_1.default.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Succesfully Deleted Book");
        }
    });
};
exports.updateBook = (req, res) => {
    console.log(req.body);
    let book = Book_1.default.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send("Succesfully updated book!");
        }
    });
};
exports.addBook = (req, res) => {
    const { title, author } = req.body;
    var book = new Book_1.default({ title, author });
    book.save((err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(book);
        }
    });
};
//# sourceMappingURL=bookController.js.map