import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000; // Puerto comun para desarrollo donde el servidor va a "escuchar" las peticiones


// rutas absolutas
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

app.set("view engine", "ejs");
app.set("views", path.join(_dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(_dirname, "public")));



// Ruta pricipal: formulario
app.get("/", (req, res) => {
    res.render("index"); // "index.ejs" en la carpeta views
});



// Ruta para procesar la búsqueda
app.post("/buscar", async (req, res) => {
    const nombre = req.body.nombre.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${nombre}`;

    try {
        const response = await fetch(url); // Consulta a la API
        if (!response.ok) throw new Error("Pokémon no encontrado");
        const data = await response.json();

        //tomo el primer tipo del Pokémon
        const tipo = data.types[0].type.name;

        res.render("resultado", {
            nombre: data.name.toUpperCase(),
            altura: data.height,
            peso: data.weight,
            imagen: data.sprites.front_default,
            tipo: tipo
        });
    } catch (error) {
        res.send(`<p>${error.message}</p><a href="/">Volver</a>`);
    }
});


//Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
