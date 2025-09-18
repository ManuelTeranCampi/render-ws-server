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

import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const app = express(); // Creamos una app de Express
const PORT = process.env.PORT; // Render asigna automáticamente el puerto

// Endpoint de prueba
app.get("/", (req, res) => {
  res.send("Servidor WebSocket corriendo ✅");
});

// Creamos el servidor HTTP a partir de Express
const httpServer = createServer(app);

// Configuración de Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*", // aquí puedes poner tu dominio de Vercel si quieres
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado:", socket.id);

  // Eventos de productos
  socket.on("product-added", (newProduct) =>
    io.emit("product-added", newProduct)
  );
  socket.on("product-updated", (updatedProduct) =>
    io.emit("product-updated", updatedProduct)
  );
  socket.on("product-deleted", (deletedId) =>
    io.emit("product-deleted", deletedId)
  );

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Iniciamos el servidor
httpServer.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en puerto ${PORT}`);
});
