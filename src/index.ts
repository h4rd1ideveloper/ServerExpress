import * as compression from "compression";
import * as express from "express";
import { Request, Response } from "express";
import { NextFunction } from "express-serve-static-core";
import * as helmet from "helmet";
import StatusError from "./errors/StatusError";
//import bodyParser  from 'body-parser'
import * as Book from "./controllers/bookController"


const app = express();
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }))

//app.use(bodyParser.json())
// Middleware
// Using helmet per best practise: https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
//app.use(bodyParser())
app.use(helmet());
// Using gzip compression per best practise: https://expressjs.com/en/advanced/best-practice-performance.html#use-gzip-compression
app.use(compression());

// Routes
app.use("/add", Book.addBook);
app.use("/find/all", Book.allBooks);


// 404 - error handler
// tslint:disable:variable-name
app.use(
  (
    _req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    next(new StatusError("Not Found", 404));
  }
);

// 500 - error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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

export default app;