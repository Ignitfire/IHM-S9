import { defineStore } from 'pinia';

function getRandomDate() {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return `${randomDate.getDate()}-${randomDate.getMonth() + 1}-${randomDate.getFullYear()}`;
}
function getRandomUserName(){
  const firstNames = ["Jean", "Marie", "Pierre", "Julie", "Sophie", "Nicolas", "Paul", "Lucas", "Emma", "Chloé", "François", "Louis", "René", "Margot", "Élise", "Claire", "Guillaume", "Benoît", "Mathilde", "Céline"];
  const lastNames = ["Dupont", "Lefevre", "Martin", "Bernard", "Robert", "Petit", "Girard", "Moreau", "Leroy", "Simon", "Lemoine", "Leroux", "Marchand", "Dumont", "Blanc", "Thomas", "Lambert", "Fournier", "Morel", "Chevalier"];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return firstName + " " + lastName;
}
function getRandomUserPseudo(){
  const pseudos = ["Superman", "WonderWoman", "IronMan", "BlackWidow", "Spiderman", "Batwoman", "AquaMan", "Catwoman", "Flash", "GreenLantern", "Hulk", "Thor", "CaptainAmerica", "BlackPanther", "Hawkeye", "Falcon", "StarLord", "Groot", "Rocket", "DrStrange"];
  const pseudo = pseudos[Math.floor(Math.random() * pseudos.length)];
  return "@"+pseudo;
}

function getWaterGrid(){
  const grid = [];
  for (let i = 0; i < 7; i++) {
    grid.push([]);
    for (let j = 0; j < 4; j++) {
      grid[i].push(Math.floor(Math.random() * 600));
    }
  }
  return grid;
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
        UserName: "User"+i,
        UserPdeudo: getRandomUserPseudo(),
        Following: following,
        CreationDate: getRandomDate(), // Ajoute une date de création pour chaque user
        TotalWatering: Math.floor(Math.random() * 1000),
        gardenWaterGrid: getWaterGrid(),
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
      return state.users.find(user => user.UserID === userID);
    },
    getUserByName: (state) => (userName) => {
      return state.users.find(user => user.UserName === userName);
    },
    getLocalUser: (state) => () =>{
      return state.users.find(user => user.UserID === state.localUserID);
    },
    getFollowingByID: (state) => (userID) => {
      return state.users.find(user => user.UserID === userID).Following;
    },
    getUserWaterGrid: (state) => (userID) => {
      return state.users.find(user => user.UserID === userID).gardenWaterGrid;
    }
  },
  actions: {
    // console log pour tester  
  }
});