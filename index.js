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
    { id: 1, nombre: "Web Design & Development Course for Beginners", precio: 10000, estrellas: 5, clases:15, idioma:"English", nivel:"Beginner", categoria: 1 },
    { id: 2, nombre: "Ingeniería de Software 3", precio: 10000, estrellas: 4, clases:20, idioma:"Spanish", nivel:"Intermediate" },
    { id: 3, nombre: "Ingeniería de Software 4", precio: 20000, estrellas: 4.5, clases:30, idioma:"English", nivel:"Advanced" },
    { id: 4, nombre: "Ingeniería de Software 1", precio: 30000, estrellas: 4.3, clases:12, idioma:"Spanish", nivel:"Beginner" },
    { id: 5, nombre: "Programación 1", precio: 10000, estrellas: 4.8, clases:32, idioma:"Spanish", nivel:"Intermediate"},
    { id: 6, nombre: "Informática 1", precio: 40000, estrellas: 5, clases:24, idioma:"English", nivel:"Beginner" },
    { id: 7, nombre: "Base de Datos 1", precio: 10000, estrellas: 4.5, clases:18, idioma:"Spanish", nivel:"Beginner", categoria : 1 },
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

const cursosConProfesor = cursosPopulares.map((curso, index) => ({
    ...curso,
    profesor: info[index] // Asociamos el profesor al curso
}));


const cursosTop3 = cursosConProfesor.slice(0, 3);



// Ruta de inicio
app.get("/", (req, res) => {
    res.render("index", {
        categorias: categorias,
        cursosTop3: cursosTop3,
        cursosConProfesor: cursosConProfesor,
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
		cursosTop3:cursosTop3,
        cursosConProfesor: cursosConProfesor,

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

// Ruta para los detalles de un curso, con un ID
app.get('/curso/:id', (req, res) => {
    const cursoId = parseInt(req.params.id);
    
    // Buscar el curso por ID
    const curso = cursosConProfesor.find(c => c.id === cursoId);
    if (!curso) {
        return res.status(404).send("Curso no encontrado");
    }

    res.render('readmore', { curso,categorias }); // Renderiza la vista "readmore" con los datos del curso
});

// Ruta para los detalles de un categoris, con un ID
app.get('/categoria/:id', (req, res) => {
    const categoriaId = parseInt(req.params.id);
    
    // Buscar el curso por ID
    const categoria = categorias.find(c => c.id === categoriaId);
    if (categoriaId) {
        return res.send(`Mostrando la categoría ${categoria.nombre}`);
      }
    if (!categoria) {
        return res.status(404).send("Categoria no encontrada");
    }

    res.render('categories', { categoria}); 
    
});

app.get("/categoria/:categoriaId/curso/:cursoId", (req, res) => {
    const categoriaId = parseInt(req.params.categoriaId);  // Usamos el parámetro categoriaId
    const cursoId = parseInt(req.params.cursoId);          // Usamos el parámetro cursoId
    
    // Buscar la categoría por ID
    const categoria = categorias.find(c => c.id === categoriaId);
    if (!categoria) {
      return res.status(404).send('Categoría no encontrada');
    }
  
    // Buscar el curso por ID
    const curso = cursos.find(c => c.id === cursoId);
    if (!curso) {
      return res.status(404).send('Curso no encontrado');
    }
    if (categoriaId && cursoId) {
        // Mostrar el curso y categoría
        return res.send(`Mostrando el curso con nombre: ${curso.nombre} de la categoría con nombre: ${categoria.nombre}`);
      } 
    res.render('categories', { categoria, curso });
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

