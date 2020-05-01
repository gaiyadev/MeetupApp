import Vue from "vue";
import Vuex from "vuex";

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
    user: {
      id: 'ghdhgghthtrhrhr',
      registerMeetups: ['bjgnbdgrtgjtrgioejotigher']
    }
  },
  mutations: {
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
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
    }
  },
  setters: {}
});
