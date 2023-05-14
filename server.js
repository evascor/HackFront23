// server.js

//1.	Importación de módulos:
const express = require('express');
const multer  = require('multer');
const path = require('path');

//2.	Configuración de Multer:
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

//3.	Configuración de Express:
const app = express();
app.use(express.static('public'));


// ruta para servir archivos estáticos
app.use(express.static(path.join(__dirname)));


//4.	Ruta para subir archivos:
app.post('/upload', upload.array('file', 12), (req, res) => {
  // Devuelve una lista de los nombres de los archivos
  const fileNames = req.files.map(file => file.originalname);
  res.json(fileNames);
});

//5.	Inicio del servidor:
app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
