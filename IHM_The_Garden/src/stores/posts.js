import { defineStore } from 'pinia'

function getRandomDate() {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${randomDate.getDate()}-${randomDate.getMonth() + 1}-${randomDate.getFullYear()}`;
}

function generateFrenchText() {
  const words = [
    "Bonjour", "monde", "comment", "allez-vous", "aujourd'hui", "temps", "est", "beau", "soleil", "brille",
    "oiseau", "ciel", "bleu", "maison", "arbre", "fleur", "livre", "table", "chaise", "ordinateur",
    "fenêtre", "porte", "voiture", "route", "ville", "campagne", "montagne", "rivière", "lac", "mer",
    "plage", "sable", "rocher", "forêt", "jardin", "parc", "place", "rue", "pont", "tunnel",
    "train", "avion", "bateau", "vélo", "bus", "tramway", "métro", "escalier", "ascenseur", "toit",
    "mur", "sol", "plafond", "peinture", "dessin", "photo", "film", "musique", "chanson", "danse",
    "théâtre", "livre", "roman", "poème", "journal", "magazine", "lettre", "carte", "message", "note"
  ];
    let text = '';
  for(let i = 0; i < 60; i++) {
    text += words[Math.floor(Math.random() * words.length)] + ' ';
  }
  return text;
}

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: Array.from({ length: 100 }, (_, i) => ({
      userID: Math.floor(Math.random() * 10),
      postID: i + 1,
      droplets: Math.floor(Math.random() * 100),
      timeLeft: Math.floor(Math.random() * 100),
      content: generateFrenchText(),
      creationDate: getRandomDate(),
      totalWatering: Math.floor(Math.random() * 100),
      location: { x: Math.floor(Math.random()*7), y: Math.floor(Math.random()*4) }, // Ajoute un emplacement pour chaque post
    })),
  }),
  getters: {
    getPostsByUser: (state) => (userID) => {
      return state.posts.filter(post => post.userID === userID)
    },
    getPostByID: (state) => (postID) => {
      return state.posts.find(post => post.postID === postID)
    }
  },
  actions: {
    // Vos actions ici
  }
})
