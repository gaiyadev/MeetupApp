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
        date: '2017-17-7'
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        id: "fbnmhmjgfgfgfgfg",
        title: "Meet ups in Nigeria",
        date: '2017-7-7'
      }
    ],
    user: {
      id: 'ghdhgghthtrhrhr',
      registerMeetups: ['bjgnbdgrtgjtrgioejotigher']
    }
  },
  mutations: {},
  actions: {},
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
