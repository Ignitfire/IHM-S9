import { defineStore } from 'pinia'

function getRandomDate() {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${randomDate.getDate()}-${randomDate.getMonth() + 1}-${randomDate.getFullYear()}`;
}

export const useUserStore = defineStore({
  id: 'users',
  state: () => ({
    users: Array.from({ length: 10}, (_, i) => {
      const following = [];
      while (following.length < 3) {
        let id;
        do {
          id = Math.floor(Math.random() * 10) + 1;
        } while (id === i + 1 || following.includes(id));
        following.push(id);
      }
      return {
        UserID: i + 1,
        UserName: "User" + i,
        UserPdeudo: "Pseudo" + i,
        Following: following,
        CreationDate: getRandomDate(), // Ajoute une date de création pour chaque user
        TotalWatering: Math.floor(Math.random() * 1000),
        TotalPosting: Math.floor(Math.random() * 1000),
        TotalFollowing: Math.floor(Math.random() * 1000),
        TotalFollowers: Math.floor(Math.random() * 1000),
        AvatarPicture: "https://picsum.photos/200/300"
      };
    }),
    
    localUserID: 2,
  }),
  getters: {
    getUserByID: (state) => (userID) => {
      return state.users.find(user => user.UserID === userID)
    },
    getUserByName: (state) => (userName) => {
      return state.users.find(user => user.UserName === userName)
    },
    getLocalUser: (state) => () =>{
      return state.users.find(user => user.UserID === state.localUserID)
    },
    getFollowingByID: (state) => (userID) => {
      return state.users.find(user => user.UserID === userID).Following
    },
  },
  actions: {
    // console log pour tester  
  }
})