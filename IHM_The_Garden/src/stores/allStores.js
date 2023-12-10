import { defineStore } from 'pinia';

function getRandomDate() {
  const start = new Date(2000, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate;
}
function getRandomUserPseudo(){
  const pseudos = ["Superman", "WonderWoman", "IronMan", "BlackWidow", "Spiderman", "Batwoman", "AquaMan", "Catwoman", "Flash", "GreenLantern", "Hulk", "Thor", "CaptainAmerica", "BlackPanther", "Hawkeye", "Falcon", "StarLord", "Groot", "Rocket", "DrStrange"];
  const pseudo = pseudos[Math.floor(Math.random() * pseudos.length)];
  return "@"+pseudo;
}


const createUserStore = () => {
  const userArray = [];
  const user1 = {
    userID: 0,
    userName: "Jean de la fontaine",
    userPseudo: "@JeanDLF",
    following: Array.from({ length: 46 }, (_, index) => index + 3),
    creationDate: getRandomDate(), 
    totalWatering: 600,
    totalPosting: 1620,
    totalFollowing: 49,
    totalFollowers: 20,
    avatarPicture: "https://picsum.photos/200/300"
  };
  user1.following.unshift(1);
  const user2 = {
    userID: 1,
    userName: "PatrickPatrick",
    userPseudo: "@patrick-patrick",
    following: Array.from({ length: 12 }, (_, index) => index),
    creationDate: getRandomDate(), 
    totalWatering: 523,
    totalPosting: 23,
    totalFollowing: 12,
    totalFollowers: 16,
    avatarPicture: "https://picsum.photos/200/300"
  };
  const user3 = {
    userID: 2,
    userName: "Paul pas de bol",
    userPseudo: "@polnobol",
    following: Array.from({ length: 12 }, (_, index) => index),
    creationDate: getRandomDate(), 
    totalWatering: 523,
    totalPosting: 23,
    totalFollowing: 12,
    totalFollowers: 16,
    avatarPicture: "https://picsum.photos/200/300"
  };
  userArray.push(user1, user2, user3);
  for(let i = 3; i < 50; i++){
    const following = [];
    while (following.length < 3) {
      let id;
      do {
        id = Math.floor(Math.random() * 10) + 1;
      } while (id === i || following.includes(id));
      following.push(id);
    }
    const user = {
      userID: i,
      userName: "User"+i,
      userPseudo: getRandomUserPseudo(),
      following: following,
      creationDate: getRandomDate(),
      totalWatering: Math.floor(Math.random() * 1000),
      totalPosting: Math.floor(Math.random() * 1000),
      totalFollowing: Math.floor(Math.random() * 1000),
      totalFollowers: Math.floor(Math.random() * 1000),
      avatarPicture: "https://picsum.photos/200/300"
    };
    userArray.push(user);
  }
  return userArray;
};


const createThreadStore = () => {
  const messagesArray = Array.from({ length: 100 }, (_, i) => ({
    postID: i + 1,
    senderID: Math.floor(Math.random() * 10), // Simule 10 envoyeurs
    recipientID: Math.floor(Math.random() * 10), // Simule 10 destinataires
    sentDate: getRandomDate(), // Ajoute une date d'envoi pour chaque thread
  }));
  
  for(let i= 0; i < 10; i++){
    messagesArray.push({
      postID: Math.floor(Math.random() * 300),
      senderID: 0,
      recipientID: 1,
      sentDate: getRandomDate(),
    });
  }
  for(let i= 0; i < 22; i++){
    messagesArray.push({
      postID: Math.floor(Math.random() * 500),
      senderID: 1,
      recipientID: 0,
      sentDate: getRandomDate(),
    });
  }
  messagesArray.push({
    postID: 22,
    senderID: 1,
    recipientID: 0,
    sentDate: Date.now(),
  });
  return messagesArray;
};

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

const createPostsStore = () => {
  const posts = [];
  
  for(let i = 0; i < 10; i++){
    posts.push({
      userID: 0,
      postID: i,
      content: generateFrenchText(),
      creationDate: getRandomDate(),
      totalWatering: Math.floor(Math.random() * 100),
    });
  }
  for(let i = 10; i < 21; i++){
    posts.push({
      userID: 1,
      postID: i,
      content: generateFrenchText(),
      creationDate: getRandomDate(),
      totalWatering: Math.floor(Math.random() * 100),
    });
  }
  for(let i = 21; i < 30; i++){
    posts.push({
      userID: 2,
      postID: i,
      content: generateFrenchText(),
      creationDate: getRandomDate(),
      totalWatering: Math.floor(Math.random() * 100),
    });
  }
  
  for(let i = 3; i<50; i++){
    for(let j = 0; j < 10; j++){
      posts.push({
        userID: i,
        postID: i*10+j,
        content: generateFrenchText(),
        creationDate: getRandomDate(),
        totalWatering: Math.floor(Math.random() * 100),
      });
    }
  }
  return posts;
};

export const useUserStore = defineStore({
  id: 'users',
  state: () => ({
    users: createUserStore(),
    localUserID: 0,
  }),
  getters: {
    getUserByID: (state) => (userID) => {
      return state.users.find(user => user.userID === userID);
    },
    getUserByName: (state) => (userName) => {
      return state.users.find(user => user.userName === userName);
    },
    getLocalUser: (state) => () =>{
      return state.users.find(user => user.userID === state.localUserID);
    },
    getFollowingByID: (state) => (userID) => {
      return state.users.find(user => user.userID === userID).following;
    },
  },
});

export const useThreadStore = defineStore({
  id: 'threads',
  state: () => ({
    threads: createThreadStore(),
  }),
  getters: {
    getThread: (state) => (senderID, recipientID) => {
      return state.threads.filter(thread => (thread.senderID === senderID && thread.recipientID === recipientID) || (thread.senderID === recipientID && thread.recipientID === senderID));
    },
    getThreadByPostID: (state) => (postID) => {
      return state.threads.find(thread => thread.postID === postID);
    }
  },
});

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    posts: createPostsStore(),
  }),
  getters: {
    getPostsByUser: (state) => (userID) => {
      return state.posts.filter(post => post.userID === userID);
    },
    getPostByID: (state) => (postID) => {
      return state.posts.find(post => post.postID === postID);
    }
  },
});

const getGardenGrid = (userID) => {
  const userPostsIds = usePostStore().getPostsByUser(userID).map(post => post.postID);
  const grid = [];
  for(let i = 0; i < 7; i++){
    grid.push([]);
    for(let j = 0; j < 4; j++){
      let postID = null;
      if(userPostsIds.length > 0 && Math.floor(Math.random() * 3)===0){
        postID =  userPostsIds.shift();
      }
      grid[i].push({
        postID: postID,
        waterCount: Math.floor(Math.random() * 100) + 5,
      });
    }
  }
  while(userPostsIds.length > 0){
    const i = Math.floor(Math.random() * 7);
    const j = Math.floor(Math.random() * 4);
    if(grid[i][j].postID === null){
      grid[i][j].postID = userPostsIds.shift();
    }
  }
  return grid;
};

export const useGardenStore = defineStore({
  id: 'gardens',
  state: () => ({
    gardens: Array.from({ length: 100 }, (_, i) => ({
      userID: i,
      grid: getGardenGrid(i),
    })),
  }),
  getters: {
    getGardenByUser: (state) => (userID) => {
      return state.gardens.find(garden => garden.userID === userID);
    },
  },
});
