export const getSavedPokemonIds = () => {
  const savedPokemonIds = localStorage.getItem("saved_pokemon")
    ? JSON.parse(localStorage.getItem("saved_pokemon"))
    : [];

  return savedPokemonIds;
};

export const savePokemonIds = (pokeIdArr) => {
  if (pokeIdArr.length) {
    localStorage.setItem("saved_pokemon", JSON.stringify(pokeIdArr));
  } else {
    localStorage.removeItem("saved_pokemon");
  }
};

export const removePokemonId = (pokeIdArr) => {
  const savedPokemonIds = localStorage.getItem("saved_pokemon")
    ? JSON.parse(localStorage.getItem("saved_pokemon"))
    : null;

  if (!savedPokemonIds) {
    return false;
  }

  const updatedSavedPokemonIds = savedPokemonIds?.filter(
    (savedPokemonIds) => savedPokemonIds !== pokeIdArr
  );
  localStorage.setItem("saved_pokemon", JSON.stringify(updatedSavedPokemonIds));

  return true;
};
