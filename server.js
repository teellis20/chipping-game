import { createServer } from "node:http";
import { parse } from "url";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT || 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev });
const handler = app.getRequestHandler();

// app.prepare().then(() => {
//   const httpServer = createServer(handler);

//   const io = new Server(httpServer);

// io.on("connection", (socket) => {
//     console.log("A USER CONNECTED:", socket.id);

//     socket.on('error', (err) => {
//         console.error('Socket encountered error:', err);
//     });

//     socket.on('scoreUpdate', (data) => {
//         console.log('Received score update via Socket.io:', data);
//         io.emit('scoreUpdate', data);
//     });

//     socket.on("disconnect", () => {
//         console.log("User disconnected:", socket.id);
//     });
// });


//   httpServer
//     .once("error", (err) => {
//       console.error(err);
//       process.exit(1);
//     })
//     .listen(port, () => {
//       console.log(`> Ready on http://${hostname}:${port}`);
//     });
// });

app.prepare().then(() => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handler(req, res, parsedUrl)
  }).listen(port)

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("A USER CONNECTED:", socket.id);

        socket.on('error', (err) => {
            console.error('Socket encountered error:', err);
        });

        socket.on('scoreUpdate', (data) => {
            console.log('Received score update via Socket.io:', data);
            io.emit('scoreUpdate', data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });

 
  console.log(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})