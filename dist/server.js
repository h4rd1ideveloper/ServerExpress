"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug = require("debug");
const http_1 = require("http");
const index_1 = require("./index");
const settings_1 = require("./settings");
// Using debug per best practise: https://expressjs.com/en/advanced/best-practice-performance.html#do-logging-correctly
const log = debug("server");
/**
 * Get port from environment and store in Express.
 */
index_1.default.set("port", settings_1.port);
// Create HTTP server.
// Workaround: Using any as the Express and createServer types are not compatible.
const server = http_1.createServer(index_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(settings_1.port);
server.on("error", onError);
server.on("listening", onListening);
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof settings_1.port === "string" ? "Pipe " + settings_1.port : "Port " + settings_1.port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.log(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.log(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Listening on " + bind);
}
//# sourceMappingURL=server.js.map