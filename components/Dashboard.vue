<template>
  <div>
    <h2>Dashboard</h2>
    <button @click="handleLogout">Logout</button>
    <div>
    <h1>User Details</h1>
    <div v-if="profile">
      <p>Name: {{ profile.name }}</p>
      <p>Email: {{ profile.email }}</p>
      <p>Age: {{ profile.age }}</p>
      <!-- Other user details -->
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      profile : {} 
    };
  },
  async mounted(){
    const response = await fetch("http://localhost:3001/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
        .then((res1) => res1.json())
        .then((res) => res);
      this.profile = response.data;
  },
  methods: {
    async handleLogout() {
      const response = await fetch("http://localhost:3001/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      })
        .then((res1) => res1.json())
        .then((res) => res);
      if(response.statusCode == 200) {
        localStorage.clear()
        this.$router.push("/login")
      }
    },
  },
};
</script>
