//importar express
const express = require("express");
//importar path
const path = require("path");


//creamos la aplicacion express
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// app.use(express.static(path.join(__dirname, "public")));
app.use("/lib", express.static(path.join(__dirname, "lib")));

console.log(__dirname);


//impresion de consola
//app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "assets")));

const categorias = [
	{ id: 1, nombre: "Web Design", cursos: 8 },
	{ id: 2, nombre: "Diseño", cursos: 3 },
	{ id: 3, nombre: "Video", cursos: 7 },
	{ id: 4, nombre: "Marketing", cursos: 12 },
	{ id: 5, nombre: "Asa", cursos: 12 },
	
];

const cursos = [
    { id: 1, nombre: "Web Design & Development Course for Beginners", precio: 10000, estrellas: 5 },
    { id: 2, nombre: "Ingeniería de Software 3", precio: 10000, estrellas: 4 },
    { id: 3, nombre: "Ingeniería de Software 4", precio: 20000, estrellas: 4.5 },
    { id: 4, nombre: "Ingeniería de Software 1", precio: 30000, estrellas: 4.3 },
    { id: 5, nombre: "Programación 1", precio: 10000, estrellas: 4.8 },
    { id: 6, nombre: "Informática 1", precio: 40000, estrellas: 5 },
    { id: 7, nombre: "Base de Datos 1", precio: 10000, estrellas: 4.2 },
];

// Obtener los 3 cursos más populares
const cursosPopulares = cursos.sort((a, b) => b.estrellas - a.estrellas).slice(0, 3);

const info = [
    { id: 1, nombre: "Nick", tiempo: "1.30 Hrs", estudiantes: 20 },
    { id: 2, nombre: "Ara", tiempo: "2.30 Hrs", estudiantes: 40 },
    { id: 3, nombre: "Mike", tiempo: "2.15 Hrs", estudiantes: 18 },
    { id: 4, nombre: "John", tiempo: "3.00 Hrs", estudiantes: 25 },
    { id: 5, nombre: "Lucy", tiempo: "1.45 Hrs", estudiantes: 22 }
];

// Asociar los 3 cursos más populares con los profesores
const cursosConProfesor = cursosPopulares.map((curso, index) => ({
    ...curso,
    profesor: info[index]  // Asociamos un profesor a cada curso
}));

// Ruta de inicio
app.get("/", (req, res) => {
    res.render("index", {
        categorias: categorias,
        cursosTop3: cursosConProfesor,  // Pasamos los cursos con sus respectivos profesores
    });
});

//ruta acerca de
app.get("/acerca-de", (req, res) => {
	res.render('about');
});

//ruta cursos
app.get("/cursos", (req, res) => {
	res.render("courses", {
		categorias: categorias,
		cursosTop3:cursosTop3
	});
});

//ruta contacto
app.get("/contacto", (req, res) => {
	res.render('contact');
});

//ruta nuestro equipo
app.get("/nuestro-equipo", (req, res) => {
	res.render('team');
});

//ruta testimonial
app.get("/testimonial", (req, res) => {
	res.render('testimonial');
});



// Ruta NOT FOUND - 404
app.all("*", (req, res) => {
	// si queremos mantener la página como html
	res.render('404')
	// si tendra elementos dinámicos como navbar y demas reemplazar por .ejs y render()
});

app.use((req, res, next) => {
    console.log("Request for:", req.url);
    next();
  });


// iniciar app escuchando puerto parametro
app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
});

