<template>
  <div id="app">
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 overflow-auto">
          <ul class="list-group my-3 limited-list">
            <label for="exampleFormControlInput1">Circuit</label>
            <li
              @click="selectRace(index)"
              :key="circuit.name"
              v-for="(circuit, index) in circuits"
              v-show="index == selectedRace"
              class="list-group-item list-group-item-action d-flex justify-content-between clickable"
              :class="{
                'active': index == selectedRace,
                'list-group-item-success': alreadyTenDrivers(index)
              }"
            >
              <span>
                <img class="mr-4" />
              </span>
              <span>{{circuit.name}}</span>
            </li>
          </ul>
        </div>
        <div class="col-3 overflow-auto">
          <ul class="list-group my-3 limited-list">
            <label for="exampleFormControlInput1">Drivers</label>
            <template v-for="team in filteredTeams">
              <li
                @click="insertDriverToRace(driver.num)"
                :key="driver.num"
                v-for="driver in team.drivers"
                class="list-group-item list-group-item-action clickable"
                :class="{
                  'disabled list-group-item-dark': driverAlreadyOnThisRace(driver.num) || winnersOfCurrentRace.length == 10,
                }"
              >
                <span>
                  <img class="mr-4" />
                </span>
                <span>#{{driver.num}} - {{driver.name}} ({{team.name}})</span>
              </li>
            </template>
          </ul>
        </div>
        <div class="col-6">
          <form class="my-3">
            <div class="form-row align-items-center">
              <div class="col-10">
                <input
                  v-model="search"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Driver"
                />
              </div>
            </div>
          </form>
          <div class="d-flex my-2">
            <!-- <img :src="circuits[selectedRace].flag.replace('22', '100')" /> -->
            <h1>{{ circuits[selectedRace].name}}</h1>
          </div>
          <table class="table table-sm">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Driver</th>
                <th scope="col">Team</th>
                <th scope="col" class="text-center">Faster Lap</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr :key="winner.driver" v-for="(winner, pos) in winnersOfCurrentRace">
                <th scope="row">{{pos + 1}}</th>
                <td>
                  <!-- <img :src="getDriverByNumber(winner.driver).flag" alt /> -->
                  {{getDriverByNumber(winner.driver).name}}
                </td>
                <td>
                  <!-- <img :src="getTeamDriverByDriverNumber(winner.driver).flag" alt /> -->
                  {{getTeamDriverByDriverNumber(winner.driver).name}}
                </td>
                <td class="text-center">
                  <input @click="selectFasterLap(selectedRace, winner.driver)" type="radio" />
                </td>
                <td>
                  <button
                    @click="removeDriverOfRace(winner.driver)"
                    type="button"
                    class="btn btn-danger btn-sm"
                  >Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- <div class="row mt-5">
        <div class="col-6">
          <h2>Drivers</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-6">
          <h2>Constructors</h2>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>-->
      <pre>
          <!-- {{selectedRace}} -->
          ({{fasterDriver}})
          <!-- {{fasterLap}} -->
      </pre>
    </div>
  </div>
</template>

<script>
// import store from "./store";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      search: "",
    };
  },
  created() {},
  computed: {
    ...mapState(["circuits", "selectedRace", "fasterLap", "teams", "results"]),
    ...mapGetters([
      "winnersOfCurrentRace",
      "getDriverByNumber",
      "getTeamDriverByDriverNumber",
      "driverAlreadyOnThisRace",
      "alreadyTenDrivers",
    ]),
    filteredTeams() {
      return this.teams.filter(
        (team) =>
          team.name.toLowerCase().includes(this.search.toLowerCase()) ||
          team.drivers
            .map((driver) => driver.name)
            .join(" ")
            .toLowerCase()
            .includes(this.search.toLowerCase())
      );
    },
    fasterDriver() {
      return this.fasterLap.find((driver, index) => this.selectedRace == index);
    },
  },
  methods: {
    ...mapActions(["selectRace", "insertDriverToRace", "removeDriverOfRace"]),
    selectFasterLap(race, driver) {
      this.fasterLap[race] = driver;
      console.log(this.fasterLap);
      console.log(this.fasterLap[this.selectedRace]);
    },
  },
};
</script>

<style>
.limited-list {
  max-height: 550px;
}
.clickable {
  cursor: pointer;
}
</style>
