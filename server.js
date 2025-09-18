// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";

// const app = express();
// app.use(cors());

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: { origin: "*" }, // Cambiar a tu dominio de Vercel si quieres
// });

// io.on("connection", (socket) => {
//   console.log("Usuario conectado:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("Usuario desconectado:", socket.id);
//   });

//   socket.on("product-added", (product) => io.emit("product-added", product));
//   socket.on("product-updated", (product) =>
//     io.emit("product-updated", product)
//   );
//   socket.on("product-deleted", (id) => io.emit("product-deleted", { id }));
// });

// const PORT = process.env.PORT || 3001;
// httpServer.listen(PORT, () =>
//   console.log(`Servidor WebSocket corriendo en puerto ${PORT}`)
// );

// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000", // desarrollo local
      "https://tu-app-vercel.vercel.app", // dominio real del frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Ruta de prueba para evitar "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Servidor WebSocket en Render funcionando 🚀");
});

io.on("connection", (socket) => {
  console.log("✅ Cliente conectado:", socket.id);

  socket.on("product-added", (product) => {
    console.log("🔹 Evento product-added recibido:", product.id);
    io.emit("product-added", product);
  });

  socket.on("product-updated", (product) => {
    console.log("🔹 Evento product-updated recibido:", product.id);
    io.emit("product-updated", product);
  });

  socket.on("product-deleted", (deletedId) => {
    console.log("🔴 Evento product-deleted recibido, deletedId:", deletedId);
    io.emit("product-deleted", deletedId); // solo enviamos el string del ID
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
  });
});

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`🚀 WebSocket corriendo en puerto ${PORT}`);
});
