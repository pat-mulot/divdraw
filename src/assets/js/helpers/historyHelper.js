const historyHelper = {
  history : [],
  currentIndex : 0,

  // Fonction pour ajouter un état à l'historique
  addToHistory: (state) => {
    // Supprimer les états suivants s'il y en a
    historyHelper.history.splice(historyHelper.currentIndex + 1);
    // Ajouter le nouvel état
    historyHelper.history.push(structuredClone(state));
    historyHelper.currentIndex = historyHelper.history.length - 1;
    // Limiter la taille de l'historique
    const MAX_HISTORY_LENGTH = 16;
    if (historyHelper.history.length > MAX_HISTORY_LENGTH) {
      historyHelper.history.shift();
      historyHelper.currentIndex--;
    }
    return {
      index: historyHelper.currentIndex,
      length: historyHelper.history.length,
    }
  },
  
  // Fonction pour annuler une action
  undoAction: () => {
    if (historyHelper.currentIndex > 0) {
      historyHelper.currentIndex--;
      const prevState = historyHelper.history[historyHelper.currentIndex];
      return structuredClone(prevState);
    }
  },
  
  // Fonction pour rétablir une action
  redoAction: () => {
    if (historyHelper.currentIndex < historyHelper.history.length - 1) {
      historyHelper.currentIndex++;
      const nextState = historyHelper.history[historyHelper.currentIndex];
      return structuredClone(nextState);
    }
  },
}
export default historyHelper;