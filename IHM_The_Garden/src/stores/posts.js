import { defineStore } from 'pinia'

function getRandomDate() {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${randomDate.getDate()}-${randomDate.getMonth() + 1}-${randomDate.getFullYear()}`;
}

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: Array.from({ length: 100 }, (_, i) => ({
      userID: Math.floor(Math.random() * 10),
      postID: i + 1,
      droplets: Math.floor(Math.random() * 100),
      timeLeft: Math.floor(Math.random() * 100),
      content: `Contenu du post ${i + 1}`,
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
