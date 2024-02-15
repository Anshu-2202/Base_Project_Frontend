<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>

    <!-- <nuxt-link @click="handleLogout">Logout</nuxt-link> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      token: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.username,
            password: this.password,
          }),
        })
          .then((res1) => res1.json())
          .then((res) => res);
        if (response.data.tokenResponse.token)
          localStorage.setItem("token", response.data.tokenResponse.token);
        this.$router.push("/dashbaord");
      } catch (error) {
      }
    },
    async handleLogout() {
      const response = await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyYWRtaW5AYmx1ZXN0YXJlbGQuY29tIiwiaWQiOjIsImlhdCI6MTcwNzk5MzExMH0.v11ugVVcAnXjOIPVd0IXCDfYdc8_fBcyEqbmeFVbzQ8`,
        },
      })
        .then((res1) => res1.json())
        .then((res) => res);
    },
  },
};
</script>
