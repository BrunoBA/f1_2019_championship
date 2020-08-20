import Vue from 'vue'
import Vuex from 'vuex'
import { circuits, teams, points } from "../circuits";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedRace: 0,
    fasterLap: new Array(circuits.length),
    results: [],
    ranking: [],
    points,
    circuits,
    teams
  },
  getters: {
    winnersOfCurrentRace(state) {
      return state.results.filter((winner) => winner.race == state.selectedRace);
    },
    getDriverByNumber: state => (driverNumber) => {
      for (let index = 0; index < state.teams.length; index++) {
        const team = state.teams[index];
        for (let index = 0; index < team.drivers.length; index++) {
          const driver = team.drivers[index];
          if (driver.num == driverNumber) {
            return driver;
          }
        }
      }
    },
    getTeamDriverByDriverNumber: (state) => (driverNumber) => {
      for (let index = 0; index < state.teams.length; index++) {
        const team = state.teams[index];
        for (let index = 0; index < team.drivers.length; index++) {
          const driver = team.drivers[index];
          if (driver.num == driverNumber) {
            return team;
          }
        }
      }
    },
    driverAlreadyOnThisRace: (state) => (driverNumber) => {
      const drivers = state.results
        .filter((result) => result.race == state.selectedRace)
        .map((result) => result.driver);
      return drivers.includes(driverNumber);
    },
    alreadyTenDrivers: (state) => (race) => {
      return state.results.filter((winner) => winner.race == race).length == 10;
    },
    pointsOnSelectedRace(state) {
      return state.points[state.results.filter(result => result.race == state.selectedRace).length]
    },
    calculatePointsByPosition: (state) => (position) => {
      return state.points[position];
    },
    driverPositionOnRace: (state) => (driverNumber) => {
      return state.results.filter(result => result.race == state.selectedRace).findIndex(result => result.driver == driverNumber)
    }
  },
  mutations: {
    SET_CURRENT_RACE(state, raceIndex) {
      state.selectedRace = raceIndex;
    },
    SET_DRIVER_ON_RACE(state, driverNumber) {
      const driver = {
        race: state.selectedRace,
        driver: driverNumber,
      };

      state.results.push(driver);
    },
    REMOVE_DRIVER_FROM_RACE(state, driverNumber) {
      const index = state.results.findIndex(
        (res) => res.driver == driverNumber && res.race == state.selectedRace
      );

      if (index > -1) {
        state.results.splice(index, 1);
      }
    },
    INSERT_POINTS_TO_DRIVER(state, payload) {
      for (let index = 0; index < state.teams.length; index++) {
        const team = state.teams[index];
        for (let index = 0; index < team.drivers.length; index++) {
          let driver = team.drivers[index];
          if (driver.num == payload.driverNumber) {
            driver.points += payload.points;
            console.log(`Adding ${payload.points} to ${driver.name} total: ${driver.points}`);
          }
        }
      }
    },
    REMOVE_POINTS_OF_DRIVER(state, payload) {
      for (let index = 0; index < state.teams.length; index++) {
        const team = state.teams[index];
        for (let index = 0; index < team.drivers.length; index++) {
          let driver = team.drivers[index];
          if (driver.num == payload.driverNumber) {
            driver.points -= payload.points;
            console.log(`Removing ${payload.points} to ${driver.name} total: ${driver.points}`);
          }
        }
      }
    }
  },
  actions: {
    selectRace({ commit }, raceIndex) {
      commit("SET_CURRENT_RACE", raceIndex);
    },
    insertDriverToRace({ commit, getters }, driverNumber) {
      commit("INSERT_POINTS_TO_DRIVER", {
        driverNumber,
        points: getters.pointsOnSelectedRace
      });
      commit("SET_DRIVER_ON_RACE",
        driverNumber
      );
    },
    removeDriverOfRace({ commit, getters }, driverNumber) {
      const driverPositionOnRace = getters.driverPositionOnRace(driverNumber);
      const points = getters.calculatePointsByPosition(driverPositionOnRace);

      commit("REMOVE_POINTS_OF_DRIVER", { driverNumber, points });
      commit("REMOVE_DRIVER_FROM_RACE", driverNumber);
    }
  }
})