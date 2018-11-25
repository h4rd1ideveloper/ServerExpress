"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const StatusError_1 = require("./errors/StatusError");
//import bodyParser  from 'body-parser'
const app = express();
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
// Middleware
// Using helmet per best practise: https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(bodyParser());
app.use(helmet());
// Using gzip compression per best practise: https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
app.use(compression());
// Routes
app.use("/", (req, res) => (res.send("Work")));
// 404 - error handler
// tslint:disable:variable-name
app.use((_req, _res, next) => {
    next(new StatusError_1.default("Not Found", 404));
});
// 500 - error handler
app.use((err, req, res, next) => {
    // Checking if headers sent per recommendation: https://expressjs.com/en/guide/error-handling.html
    if (res.headersSent) {
        return next(err);
    }
    // set locals, only providing error in development.
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.send();
});
exports.default = app;
//# sourceMappingURL=app.js.map