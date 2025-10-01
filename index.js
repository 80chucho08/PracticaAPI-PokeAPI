import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

//servir carpeta public como estatica
app.use(express.static(path.join(_dirname, "public")));

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});

