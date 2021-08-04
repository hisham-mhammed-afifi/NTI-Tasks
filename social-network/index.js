const PORT = process.env.PORT || 3000;
const User = require("./database/models/user.model");
const app = require("./src/app");
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  // path: "/my-custom-path/"
  cors: {
    orgin: "*",
    methods: "*",
  },
});

io.on("connection", (socket) => {
  socket.join("some room");
  socket.to("some room").emit("myMsg");
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("myMsg", (id, message) => {
    socket.to(id).emit("myMsg", socket.id, message);
    console.log(id);
    // socket.broadcast.emit("message-broadcast", message);
  });
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
