const tipoBusqueda = document.getElementById("tipoBusqueda");
const valorBusqueda = document.getElementById("valorBusqueda");
const resultado = document.getElementById("resultado");

// cada vez que cambia el tipo de búsqueda
tipoBusqueda.addEventListener("change", () => {
    valorBusqueda.value = ""; // limpia el campo al cambiar
    if (tipoBusqueda.value === "id") {
        valorBusqueda.setAttribute("type", "number");  // solo números
        valorBusqueda.setAttribute("min", "1");        // opcional: no permite 0 ni negativos
    } else {
        valorBusqueda.setAttribute("type", "text");    // texto libre
        valorBusqueda.removeAttribute("min");
    }
});

// validación en vivo mientras escribes
valorBusqueda.addEventListener("input", () => {
    if (tipoBusqueda.value === "id") {
        // elimina cualquier caracter que no sea número
        valorBusqueda.value = valorBusqueda.value.replace(/[^0-9]/g, "");
    } else {
        // elimina cualquier número
        valorBusqueda.value = valorBusqueda.value.replace(/[0-9]/g, "");
    }
});

// cuando se envía el formulario
document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const valor = valorBusqueda.value.toLowerCase();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");

        const data = await response.json();
        const tipos = data.types.map(t => t.type.name);

        const colores = {
            fire: "#F08030",
            water: "#6890F0",
            grass: "#78C850",
            electric: "#F8D030",
            ice: "#98D8D8",
            fighting: "#C03028",
            poison: "#A040A0",
            ground: "#E0C068",
            flying: "#A890F0",
            psychic: "#F85888",
            bug: "#A8B820",
            rock: "#B8A038",
            ghost: "#705898",
            dark: "#705848",
            dragon: "#7038F8",
            steel: "#B8B8D0",
            fairy: "#EE99AC",
            normal: "#A8A878"
        };

        let colorFondo;
        if (tipos.length === 1) {
            colorFondo = colores[tipos[0]];
        } else {
            colorFondo = `linear-gradient(45deg, ${colores[tipos[0]]}, ${colores[tipos[1]]})`;
        }

        resultado.innerHTML = `
          <div class="card" style="background: ${colorFondo};">
            <h2>${data.name.toUpperCase()} (#${data.id})</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p><strong>Altura:</strong> ${data.height}</p>
            <p><strong>Peso:</strong> ${data.weight}</p>
            <p><strong>Tipo:</strong> ${tipos.join(", ")}</p>
          </div>
        `;

        valorBusqueda.value = "";
    } catch (error) {
        resultado.innerHTML = `<p style="color:red">${error.message}</p>`;
    }
});

