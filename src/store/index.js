import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        src:
          "https://images.unsplash.com/photo-1586272778445-ccec18ea579c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=500&q=60",
        id: "gtrgtrgrtrththt",
        title: "static",
        time: "6:58pm",
        location: "Kaduna",
        date: "2019-05-06"
      }
    ],
    user: null,
    loading: false,
    error: null,
    registerForMeetups: null
  },
  mutations: {
    registerMeetups(state, payload) {
      state.registerForMeetups = payload
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetUp(state, payload) {
      const meetup = state.setLoadedMeetups.find(meetup => {
        return meetup.id === payload.id;
      });
      if (payload.title) {
        meetup.title = payload.title;
      }
      if (payload.location) {
        meetup.location = payload.location;
      }
      if (payload.description) {
        meetup.description = payload.description;
      }
      if (payload.date) {
        meetup.date = payload.date;
      }
      if (payload.time) {
        meetup.time = payload.time;
      }
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    loadedMeetups({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("meetups")
        .once("value")
        .then(data => {
          const meetups = [];
          const obj = data.val();
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              location: obj[key].location,
              time: obj[key].time,
              date: obj[key].date,
              src: obj[key].imageUrl,
              createdBy: obj[key].createdBy
            });
          }
          commit("setLoadedMeetups", meetups);
          commit("setLoading", false);
        })
        .catch(error => {
          console.log(error);
          commit("setLoading", true);
        });
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        // src: payload.src,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        createdBy: getters.user.id
        // id: 'hgvheguyrgyugfreyre'
      };
      let imageUrl;
      let key;
      //Saving to firebase database
      firebase
        .database()
        .ref("meetups")
        .push(meetup)
        .then(data => {
          key = data.key;
          console.log(data);
          // commit('createMeetup', {
          //   ...meetup,
          //   id: key
          // })
          return key;
        })
        .then(key => {
          const filename = payload.image.name;
          const ext = filename.slice(filename.lastIndexOf("."));
          return firebase.storage().ref("meetups/" + key + "." + ext).put(payload.image);
        }).
        then(snapshot => {
          return new Promise((resolve) => {
            snapshot.ref.getDownloadURL().then(url => {
              snapshot.downloadURL = url
              resolve(snapshot);
            })
          })
        }).then((snapshot) => {
          imageUrl = snapshot.downloadURL;
          return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl });
        })
        // .then(fileData => {
        //   imageUrl = fileData.metadata.downloadURLs[0]
        //   return firebase.database().ref("meetups").child(key).update({ imageUrl: imageUrl });
        // })
        .then(() => {
          commit("createMeetup", {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          });
        }).catch(error => {
          console.log(error);
        });
    },
    signUserUps({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid,
            registerMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    signUserIn({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit("setLoading", false);
          const newUser = {
            id: user.user.uid,
            registerMeetups: []
          };
          commit("setUser", newUser);
        })
        .catch(error => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    clearError({ commit }) {
      commit("clearError");
    },
    authSignIn({ commit }, payload) {
      commit("setUser", {
        id: payload.uid,
        registerMeetups: []
      });
    },
    logout({ commit }) {
      firebase.auth().signOut().then(response => console.log(response)).catch(error => console.log(error));
      commit("setUser", null);
    },
    updateMeetUpData({ commit }, payload) {
      commit("setLoading", true);
      const updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.location) {
        updateObj.location = payload.location
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      if (payload.time) {
        updateObj.time = payload.time
      }
      firebase.database().ref("meetups").child(payload.id).update(updateObj).then(() => {
        commit("setLoading", false);
        commit('updateMeetUp', payload);

      }).catch((error) => {
        commit("setLoading", false);
        console.log(error);
      });
    },
    registerForMeetups({ commit }, payload) {
      commit("setLoading", true);
      const register = {
        name: payload.name,
        location: payload.location,
        email: payload.email,
      };
      firebase.database().ref("Register").push(register).then((data) => {
        commit("registerMeetups", register)
        console.log(data);
      }).catch((error) => {
        console.log(error);
      })
    }
  },

  modules: {},
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },

    featureMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 10);
    },
    loadedMeetup(state) {
      return meetupId => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId;
        });
      };
    },
    user(state) {
      return state.user;
    },
    error(state) {
      return state.error;
    },
    loading(state) {
      return state.loading;
    }
  },
  setters: {}
});
