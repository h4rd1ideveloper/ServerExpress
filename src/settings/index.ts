/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string):any {
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
  
  export const port:any = normalizePort(process.env.PORT || "8080");