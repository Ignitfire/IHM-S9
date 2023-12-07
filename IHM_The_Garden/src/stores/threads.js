import { defineStore } from 'pinia'

function getRandomDate() {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${randomDate.getDate()}-${randomDate.getMonth() + 1}-${randomDate.getFullYear()}`;
}

export const useThreadStore = defineStore({
  id: 'threads',
  state: () => ({
    threads: Array.from({ length: 100 }, (_, i) => ({
      postID: i + 1,
      senderID: Math.floor(Math.random() * 10), // Simule 10 envoyeurs
      recipientID: Math.floor(Math.random() * 10), // Simule 10 destinataires
      sentDate: getRandomDate(), // Ajoute une date d'envoi pour chaque thread
    })),
  }),
  getters: {
    getThreadsByUser: (state) => (userID) => {
      return state.threads.filter(thread => thread.senderID === userID || thread.recipientID === userID)
    },
    getThread: (state) => (senderID, recipientID) => {
      return state.threads.filter(thread => (thread.senderID === senderID && thread.recipientID === recipientID) || (thread.senderID === recipientID && thread.recipientID === senderID))
    },
    getThreadByPostID: (state) => (postID) => {
      return state.threads.find(thread => thread.postID === postID)
    }
  },
  actions: {
    // console log pour tester
     }
})