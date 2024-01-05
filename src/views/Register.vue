<template>
  <div class="container">
    <h1>Register</h1>
    <div class="row">
      <form class="mx-2">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group position-relative">
          <label for="exampleInputPassword1">Password</label>
          <input
            :type="returnInputType()"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
          <span @click="showPassword = !showPassword">
            <i v-if="!showPassword" class="fa-regular fa-eye eye"></i>
            <i v-else class="fa-regular fa-eye-slash eye"></i>
          </span>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Summoner Name</label>
          <input
            type="text"
            class="form-control"
            id="exampleInputSummonerName1"
            placeholder="Your Summoner Name"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Server</label> <br />
          <select name="server" id="server">
            <option value="#EUW">Europe (EUW)</option>
            <option value="#NA">North America (NA)</option>
            <option value="#KR">South Korea (KR)</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      showPassword: false,
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
