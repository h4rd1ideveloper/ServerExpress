"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const parsedPort = parseInt(val, 10);
    if (isNaN(parsedPort)) {
        // named pipe
        return val;
    }
    if (parsedPort >= 0) {
        // port number
        return parsedPort;
    }
    return false;
}
exports.port = normalizePort(process.env.PORT || "8080");
//# sourceMappingURL=index.js.map