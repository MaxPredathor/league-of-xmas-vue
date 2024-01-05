<template>
  <div class="container">
    <div class="alert alert-danger text-center" v-if="loginFailed">
      {{ loginFailed }}
    </div>
    <h1>Login</h1>
    <div class="row">
      <form class="mx-2" @submit.prevent="loginData">
        <div class="form-group">
          <label for="email">Email address</label>
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
        <div class="form-group position-relative">
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
.eye {
  cursor: pointer;
  position: absolute;
  right: 1%;
  top: 55%;
}
</style>
