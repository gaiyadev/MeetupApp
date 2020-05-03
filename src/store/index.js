import Vue from "vue";
import Vuex from "vuex";
import * as firebase from 'firebase';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        id: "rgrgrththththththt",
        title: "Meet ups in Ghana",
        time: "12:40",
        location: "USA",
        date: '2017-17-7'
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        id: "fbnmhmjgfgfgfgfg",
        title: "Meet ups in Nigeria",
        date: '2017-7-7',
        location: "USA",
        time: '12:00'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
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
    createMeetup({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        src: payload.src,
        description: payload.description,
        date: payload.date,
        time: payload.time,
        id: 'hgvheguyrgyugfreyre'
      }
      //firebase
      commit('createMeetup', meetup)
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
        commit('setLoading', true)
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
      return getters.loadedMeetups.slice(0, 5);
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
