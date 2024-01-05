<template>
  <div>
    <h1>Register</h1>
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
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
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
</template>

<script>
export default {
  name: "Register",
  beforeCreate() {
    this.$root.showHeader = false;
    this.$root.showFooter = false;
  },
};
</script>

<style lang="scss" scoped></style>
