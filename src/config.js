// Variables pouvant etre modifiees dynamiquement, a la difference du .env qui
// necessite de reconstruire l'application.

const base = process.env.BASE_URL;

export default {
  base,
};