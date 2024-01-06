<template>
  <div class="my-div vh-100">
    <div class="alert alert-danger text-center" v-if="loginFailed">
      {{ loginFailed }}
    </div>
    <form class="my-form" @submit.prevent="loginData">
      <h1>Login</h1>
      <div class="form-group w-100">
        <label for="email">Email address</label>
        <span
          @click="$router.push({ name: 'Register' })"
          class="ps-5 ms-4 text-primary text-decoration-underline"
          ><small>If you are not registered yet</small>
        </span>
        <input
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          name="email"
          v-model="user.email"
        />
      </div>
      <div class="form-group position-relative w-100">
        <label for="password">Password</label>
        <input
          :type="returnInputType()"
          class="form-control"
          id="password"
          placeholder="Password"
          name="password"
          v-model="user.password"
        />
        <span @click="showPassword = !showPassword">
          <i v-if="!showPassword" class="fa-regular fa-eye eye"></i>
          <i v-else class="fa-regular fa-eye-slash eye"></i>
        </span>
      </div>
      <button type="submit" class="btn btn-primary my-2">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "../router/router";
import { store } from "../data/store";
export default {
  name: "Login",
  data() {
    return {
      result: {},
      showPassword: false,
      user: {
        email: "",
        password: "",
      },
      store,
      loginFailed: "",
    };
  },
  methods: {
    returnInputType() {
      if (this.showPassword) {
        return "text";
      } else {
        return "password";
      }
    },
    loginData() {
      axios
        .post("http://127.0.0.1:8000/api/login", this.user)
        .then(({ data }) => {
          try {
            if (data.status === true) {
              router.push({ path: "/" });
              store.activeUser = data.name;
              store.activeServer = data.region;
              //console.log(store.activeUser);
            } else {
              this.loginFailed =
                "Please register first or check your credentials";
            }
          } catch (error) {
            this.loginFailed =
              "Please register first or check your credentials";
          }
        });
    },
  },
  beforeCreate() {
    this.$root.showHeader = false;
    this.$root.showFooter = false;
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
      input {
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
      span {
        cursor: pointer !important;
      }
    }

    h1 {
      color: $color-showpage;
      font-family: $font-LOL;
    }
  }
}
</style>
