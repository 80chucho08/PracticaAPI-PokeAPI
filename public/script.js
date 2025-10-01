document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.toLowerCase();
  const resultado = document.getElementById("resultado");

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
    if (!response.ok) throw new Error("Pokémon no encontrado");

    const data = await response.json();

    resultado.innerHTML = `
      <h2>${data.name.toUpperCase()} (#${data.id})</h2>
      <img src="${data.sprites.front_default}" alt="${data.name}">
      <p><strong>Altura:</strong> ${data.height}</p>
      <p><strong>Peso:</strong> ${data.weight}</p>
      <p><strong>Tipo:</strong> ${data.types.map(t => t.type.name).join(", ")}</p>
    `;
  } catch (error) {
    resultado.innerHTML = `<p style="color:red">${error.message}</p>`;
  }
});
