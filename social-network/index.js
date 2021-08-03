const PORT = process.env.PORT || 3000;
const app = require("./src/app");
const server = require("http").createServer(app);



const io = require("socket.io")(server, {
  // ...
  // path: "/my-custom-path/"
  cors:{
    orgin: "*",
    methods: "*"
  }
});

io.on("connection", (socket) => {
  // ...
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
