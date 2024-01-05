<template>
  <div>
    <h1>Register</h1>
    <form class="mx-2" @submit.prevent="saveData">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          v-model="user.email"
          type="email"
          class="form-control"
          id="email"
          name="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <div class="form-group">
        <label for="summonerName">Summoner Name</label>
        <input
          v-model="user.name"
          type="text"
          class="form-control"
          id="summonerName"
          placeholder="Your Summoner Name"
          name="summonerName"
        />
      </div>
      <!-- <div class="form-group">
        <label for="server">Server</label> <br />
        <select name="server" id="server">
          <option value="#EUW">Europe (EUW)</option>
          <option value="#NA">North America (NA)</option>
          <option value="#KR">South Korea (KR)</option>
        </select>
      </div> -->
      <button type="submit" value="Save" class="btn btn-primary my-2">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import router from "@/router/router";
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      result: {},
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  beforeCreate() {
    this.$root.showHeader = false;
    this.$root.showFooter = false;
  },
  methods: {
    saveData() {
      axios
        .post("http://127.0.0.1:8000/api/register", this.user)
        .then((res) => {
          ({ data }) => {
            console.log(data);
            try {
              alert(data.message);
            } catch (error) {
              alert(error);
            }
          };
        });
      router.push({
        path: "/login",
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
