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
              class="list-group-item list-group-item-action d-flex justify-content-between"
              :class="{
                'active': index == selectedRace,
                'list-group-item-success': alreadyTenDrivers(index)
              }"
            >
              <span>
                <img class="mr-4" :src="circuit.flag" />
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
                @click="insertDriverToRace(selectedRace, driver.num)"
                :key="driver.num"
                v-for="driver in team.drivers"
                class="list-group-item list-group-item-action"
                :class="{'disabled list-group-item-dark': driverAlreadyOnThisRace(driver.num) || winnersOfCurrentRace.length == 10}"
              >
                <span>
                  <img class="mr-4" :src="driver.flag" />
                </span>
                <span>#{{driver.num}} - {{driver.name}} ({{team.name}})</span>
              </li>
            </template>
          </ul>
        </div>
        <div class="col-6">
          <form class="my-3">
            <div class="form-row align-items-center">
              <div class="col-sm-6">
                <input
                  v-model="search"
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Driver"
                />
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
          <div class="d-flex my-2">
            <img :src="circuits[selectedRace].flag.replace('22', '100')" alt />
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
                  <img :src="getDriverByNumber(winner.driver).flag" alt />
                  {{getDriverByNumber(winner.driver).name}}
                </td>
                <td>
                  <img :src="getTeamDriverByDriverNumber(winner.driver).flag" alt />
                  {{getTeamDriverByDriverNumber(winner.driver).name}}
                </td>
                <td class="text-center">
                  <input
                    @click="selectFasterLap(selectedRace, winner.driver)"
                    :checked="fasterLap.get(selectedRace) == winner.driver"
                    type="radio"
                  />
                </td>
                <td>
                  <button
                    @click="removeDriverOfRace(selectedRace, winner.driver)"
                    type="button"
                    class="btn btn-danger btn-sm"
                  >Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row mt-5">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      circuits: [
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/22px-Flag_of_Australia.svg.png",
          name: "Grande Prêmio da Austrália",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Flag_of_Bahrain.svg/22px-Flag_of_Bahrain.svg.png",
          name: "Grande Prêmio do Bahrein",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/22px-Flag_of_the_People%27s_Republic_of_China.svg.png",
          name: "Grande Prêmio da China",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/22px-Flag_of_Azerbaijan.svg.png",
          name: "Grande Prêmio do Azerbaijão",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/22px-Flag_of_Spain.svg.png",
          name: "Grande Prêmio da Espanha",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/22px-Flag_of_Monaco.svg.png",
          name: "Grande Prêmio de Mônaco",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/22px-Flag_of_Canada_%28Pantone%29.svg.png",
          name: "Grande Prêmio do Canadá",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png",
          name: "Grande Prêmio da França",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/22px-Flag_of_Austria.svg.png",
          name: "Grande Prêmio da Áustria",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
          name: "Grande Prêmio da Grã-Bretanha",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/22px-Flag_of_Germany.svg.png",
          name: "Grande Prêmio da Alemanha",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/22px-Flag_of_Hungary.svg.png",
          name: "Grande Prêmio da Hungria",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Flag_of_Belgium_%28civil%29.svg/22px-Flag_of_Belgium_%28civil%29.svg.png",
          name: "Grande Prêmio da Bélgica",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/22px-Flag_of_Italy.svg.png",
          name: "Grande Prêmio da Itália",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Flag_of_Singapore.svg/22px-Flag_of_Singapore.svg.png",
          name: "Grande Prêmio de Singapura",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/22px-Flag_of_Russia.svg.png",
          name: "Grande Prêmio da Rússia",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Flag_of_Japan.svg/22px-Flag_of_Japan.svg.png",
          name: "Grande Prêmio do Japão",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/22px-Flag_of_Mexico.svg.png",
          name: "Grande Prêmio do México",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/22px-Flag_of_the_United_States.svg.png",
          name: "Grande Prêmio dos Estados Unidos",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png",
          name: "Grande Prêmio do Brasil",
        },
        {
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Flag_of_the_United_Arab_Emirates.svg/22px-Flag_of_the_United_Arab_Emirates.svg.png",
          name: "Grande Prêmio de Abu Dhabi",
        },
      ],
      teams: [
        {
          name: "Mercedes",
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/22px-Flag_of_Germany.svg.png",
          drivers: [
            {
              num: 44,
              name: "Lewis Hamilton",
              flag:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
            },
            {
              num: 77,
              name: "Valtteri Bottas",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/22px-Flag_of_Finland.svg.png",
            },
          ],
        },
        {
          name: "Ferrari",
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/22px-Flag_of_Italy.svg.png",
          drivers: [
            {
              num: 5,
              name: "Sebastian Vettel",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/22px-Flag_of_Germany.svg.png",
            },
            {
              num: 16,
              name: "Charles Leclerc",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Flag_of_Monaco.svg/22px-Flag_of_Monaco.svg.png",
            },
          ],
        },
        {
          name: "Alfa Romeo",
          flag:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/24px-Flag_of_Switzerland.svg.png",
          drivers: [
            {
              num: 7,
              name: "Kimi Raikkonen",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_Finland.svg/22px-Flag_of_Finland.svg.png",
            },
            {
              num: 99,
              name: "Antonio Giovinazzi",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/22px-Flag_of_Italy.svg.png",
            },
          ],
        },
        {
          name: "Racing Point",
          flag:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
          drivers: [
            {
              num: 11,
              name: "Sergio Perez",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Flag_of_Mexico.svg/22px-Flag_of_Mexico.svg.png",
            },
            {
              num: 18,
              name: "Lance Stroll",
              flag:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/22px-Flag_of_Canada_%28Pantone%29.svg.png",
            },
          ],
        },
        {
          name: "Toro Rosso",
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/22px-Flag_of_Italy.svg.png",
          drivers: [
            {
              num: 10,
              name: "Pierre Gasly",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png",
            },
            {
              num: 26,
              name: "Daniil Kvyat",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/22px-Flag_of_Russia.svg.png",
            },
          ],
        },
        {
          name: "Williams",
          flag:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
          drivers: [
            {
              num: 63,
              name: "George Russell",
              flag:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
            },
            {
              num: 88,
              name: "Robert Kubica",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Flag_of_Poland.svg/22px-Flag_of_Poland.svg.png",
            },
          ],
        },
        {
          name: "Red Bull",
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/22px-Flag_of_Austria.svg.png",
          drivers: [
            {
              num: 23,
              name: "Alexander Albon",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/22px-Flag_of_Thailand.svg.png",
            },
            {
              num: 33,
              name: "Max Verstappen",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/22px-Flag_of_the_Netherlands.svg.png",
            },
          ],
        },
        {
          name: "Renault",
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png",
          drivers: [
            {
              num: 3,
              name: "Daniel Ricciardo",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/22px-Flag_of_Australia.svg.png",
            },
            {
              num: 27,
              name: "Nico Hulkenberg",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/22px-Flag_of_Germany.svg.png",
            },
          ],
        },
        {
          name: "Haas",
          flag:
            "http://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/22px-Flag_of_the_United_States.svg.png",
          drivers: [
            {
              num: 8,
              name: "Romain Grosjean",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png",
            },
            {
              num: 20,
              name: "Kevin Magnussen",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/22px-Flag_of_Denmark.svg.png",
            },
          ],
        },
        {
          name: "McLaren",
          flag:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/22px-Flag_of_the_United_Kingdom.svg.png",
          drivers: [
            {
              num: 4,
              name: "Bruno Barros",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/22px-Flag_of_Brazil.svg.png",
            },
            {
              num: 55,
              name: "Anthony Pct",
              flag:
                "http://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/22px-Flag_of_France.svg.png",
            },
          ],
        },
      ],
      results: [],
      fasterLap: new Map(),
      selectedRace: 0,
      search: "",
    };
  },
  methods: {
    selectRace(raceIndex) {
      this.selectedRace = raceIndex;
    },
    insertDriverToRace(raceIndex, driverNumber) {
      const driver = {
        race: raceIndex,
        driver: driverNumber,
      };
      this.results.push(driver);
    },
    getDriverByNumber(driverNumber) {
      for (let index = 0; index < this.teams.length; index++) {
        const team = this.teams[index];
        for (let index = 0; index < team.drivers.length; index++) {
          const driver = team.drivers[index];
          if (driver.num == driverNumber) {
            return driver;
          }
        }
      }
    },
    getTeamDriverByDriverNumber(driverNumber) {
      for (let index = 0; index < this.teams.length; index++) {
        const team = this.teams[index];
        for (let index = 0; index < team.drivers.length; index++) {
          const driver = team.drivers[index];
          if (driver.num == driverNumber) {
            return team;
          }
        }
      }
    },
    selectFasterLap(race, driver) {
      this.fasterLap.set(race, driver);
    },
    driverAlreadyOnThisRace(driver) {
      const drivers = this.results
        .filter((result) => result.race == this.selectedRace)
        .map((result) => result.driver);
      return drivers.includes(driver);
    },
    alreadyTenDrivers(race) {
      return this.results.filter((winner) => winner.race == race).length == 10;
    },
    removeDriverOfRace(selectedRace, driverNum) {
      const index = this.results.findIndex(
        (res) => res.driver == driverNum && res.race == selectedRace
      );

      if (index > -1) {
        this.results.splice(index, 1);
      }
    },
  },
  computed: {
    winnersOfCurrentRace() {
      return this.results.filter((winner) => winner.race == this.selectedRace);
    },
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
  },
};
</script>

<style>
.limited-list {
  max-height: 550px;
}
</style>
