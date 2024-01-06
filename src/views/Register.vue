<template>
  <div class="my-div vh-100">
    <form class="my-form" @submit.prevent="saveData">
      <h1>Register</h1>
      <div class="form-group w-100">
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
      <div class="form-group position-relative w-100">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          :type="returnInputType()"
          class="form-control"
          id="password"
          name="password"
          placeholder="Password"
        />
        <span @click="showPassword = !showPassword">
          <i v-if="!showPassword" class="fa-regular fa-eye eye"></i>
          <i v-else class="fa-regular fa-eye-slash eye"></i>
        </span>
      </div>
      <div class="form-group w-100">
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
      <div class="form-group w-100">
        <label for="summonerName">Select your Region</label>
        <select
          v-model="user.region"
          class="form-control"
          id="region"
          name="region"
        >
          <option selected value="euw1">EUW</option>
          <option value="na1">NA</option>
          <option value="kr">KR</option>
        </select>
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
        region: "euw1",
      },
      showPassword: false,
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
    returnInputType() {
      if (this.showPassword) {
        return "text";
      } else {
        return "password";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../assets/style/partials/variables" as *;
.eye {
  cursor: pointer;
  position: absolute;
  right: 3%;
  top: 55%;
}
.my-div {
  width: 100%;
  display: grid;
  place-items: center;
  background-image: url(../images/Lol-wallpaper/11.png);
  background-size: cover;

  .my-form {
    width: 20%;
    padding: 10px 25px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255, 5%);
    box-shadow: 0 0 5px rgb(0, 0, 0, 15%);
    backdrop-filter: blur(10px);
    font-family: $font-spiegel;
    display: flex;
    flex-direction: column;
    // justify-items: center;
    align-items: center;

    .form-group {
      input,
      select {
        background-color: rgb(255, 255, 255, 10%);
        border: none;
        display: block;

        &:active {
          outline: none;
          border: none;
        }
        &:focus {
          outline: none;
          background-color: rgb(255, 255, 255, 20%);
          border: transparent !important;
          border-bottom: 2px solid black !important;
          border-radius: 10px 10px 0 0;
        }
        // &::placeholder {
        //   color: black;
        //   transition: color 0.2s linear;
        // }
        &:focus::placeholder {
          color: transparent;
          transition: all 0.2s linear;
        }
      }
    }

    h1 {
      color: $color-showpage;
      font-family: $font-LOL;
    }
  }
}
</style>
