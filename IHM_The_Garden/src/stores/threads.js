import { defineStore } from 'pinia'

export const useThreadStore = defineStore({
  id: 'threads',
  state: () => ({
    threads: Array.from({ length: 100 }, (_, i) => ({
      postID: i + 1,
      senderID: Math.floor(Math.random() * 10), // Simule 10 envoyeurs
      recipientID: Math.floor(Math.random() * 10), // Simule 10 destinataires
      sentDate: new Date().toISOString(), // Ajoute une date d'envoi pour chaque thread
    })),
  }),
  getters: {
    getThreadsByUser: (state) => (userID) => {
      return state.threads.filter(thread => thread.senderID === userID || thread.recipientID === userID)
    },
    getThread: (state) => (senderID, recipientID) => {
      return state.threads.filter(thread => (thread.senderID === senderID && thread.recipientID === recipientID) || (thread.senderID === recipientID && thread.recipientID === senderID))
    }
  },
  actions: {
    // console log pour tester
    printThreads: (state) => console.log(state.threads),
    printThreadsByUser: (state, userID) => console.log(state.threads.filter(thread => thread.senderID === userID || thread.recipientID === userID)),
    printThread: (state, senderID, recipientID) => console.log(state.threads.filter(thread => (thread.senderID === senderID && thread.recipientID === recipientID) || (thread.senderID === recipientID && thread.recipientID === senderID)))
  }
})