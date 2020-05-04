import Vue from "vue";
import Vuex from "vuex";
import * as firebase from 'firebase';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        src: "https://images.unsplash.com/photo-1586272778445-ccec18ea579c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=500&q=60",
        id: 'rgregergegr',
        title: 'static',
        time: '6:58pm',
        location: 'Kaduna',
        date: '2019-05-06'
      },
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }

  },
  actions: {
    loadedMeetups({ commit }) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value').then((data) => {
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            location: obj[key].location,
            time: obj[key].time,
            date: obj[key].date,
            src: obj[key].src
          })
        }
        commit('setLoadedMeetups', meetups)
        commit('setLoading', false)
      }).catch((error) => {
        console.log(error)
        commit('setLoading', true)
      })
    },
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        src: payload.src,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        // id: 'hgvheguyrgyugfreyre'
      }
      //Saving to firebase database
      firebase.database().ref('meetups').push(meetup).then((data) => {
        const key = data.key
        console.log(data);
        commit('createMeetup', {
          ...meetup,
          id: key
        })
      }).catch((error) => {
        console.error(error);

      })
    },
    signUserUps({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.user.uid,
          registerMeetups: []
        }
        commit('setUser', newUser)
      }).catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      }
      )
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(user => {
        commit('setLoading', false)
        const newUser = {
          id: user.user.uid,
          registerMeetups: []
        }
        commit('setUser', newUser)
      }).catch(error => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
    },
    clearError({ commit }) {
      commit('clearError')
    },
    authSignIn({ commit }, payload) {
      commit('setUser', {
        id: payload.uid, registerMeetups: []
      })
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
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
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId;
        });

      };
    },
    user(state) {
      return state.user
    },
    error(state) {
      return state.error
    },
    loading(state) {
      return state.loading
    }
  },
  setters: {}
});
