const express = require("express");
const fs = require("fs");

const app = express();
app.listen(3000, console.log("Servidor encendido!"));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
  res.json(canciones);
});

app.post("/canciones", (req, res) => {
  const nuevaCancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
  canciones.push(nuevaCancion);
  fs.writeFileSync("repertorios.json", JSON.stringify(canciones));
  res.send("Cancion agregada con éxito!");
});

app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("repertorios.json", JSON.stringify(canciones));
  res.send("cancion modificado con éxito");
});

app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("repertorios.json", "utf8"));
  const index = canciones.findIndex((p) => p.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("repertorios.json", JSON.stringify(canciones));
  res.send("Producto eliminado con éxito");
});
