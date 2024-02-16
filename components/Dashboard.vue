<!-- <template>
  <div>
    <h2>Dashboard</h2>
    <button @click="handleLogout">Logout</button>
    <div>
      <h1>User Details</h1>
      <div v-if="profile">
        <p>Name: {{ profile.name }}</p>
        <p>Email: {{ profile.email }}</p>
        <p>Age: {{ profile.age }}</p>
        Other user details
      </div>
      <button @click="editProfile(profile)" v-if="profile">Edit Profile</button>
    </div>

    <div v-if="isEdit">
      <h1>Edit Profile</h1>
      <form @submit.prevent="saveProfile">
        <div>
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="editData.name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="editData.email" required />
        </div>
        <div>
          <label for="age">Age:</label>
          <input type="number" id="age" v-model.number="editData.age" required />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template> -->

<template>
  <div>
    <h2>Dashboard</h2>
    <button class="logout-btn" @click="handleLogout">Logout</button>
    <div class="user-details">
      <h1>User Details</h1>
      <div v-if="profile">
        <p><strong>Name:</strong> {{ profile.name }}</p>
        <p><strong>Email:</strong> {{ profile.email }}</p>
        <p><strong>Age:</strong> {{ profile.age }}</p>
        <!-- Other user details -->
      </div>
      <button
        class="edit-btn"
        @click="editProfile(profile)"
        v-if="profile && !isEdit"
      >
        Edit Profile
      </button>
      <button
        class="delete-btn"
        @click="handleDelete()"
        v-if="profile && !isEdit"
      >
        Delete Profile
      </button>
    </div>

    <div v-if="isEdit" class="edit-profile">
      <h1>Edit Profile</h1>
      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="editData.name" required />
        </div>
        <div class="form-group">
          <label for="age">Age:</label>
          <input
            type="number"
            id="age"
            v-model.number="editData.age"
            required
          />
        </div>
        <button type="submit" class="save-btn">Save</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Styles for the dashboard */
.logout-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
}

.user-details {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.delete-btn {
  background-color: #9e4636;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

/* Styles for the edit profile form */
.edit-profile {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 16px;
}

.save-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}
</style>

<script>
export default {
  data() {
    return {
      profile: {},
      editData: {},
      isEdit: false,
    };
  },
  async mounted() {
    await this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      try {
        const response = await fetch("http://localhost:3001/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        this.profile = data.data;
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    },
    async handleLogout() {
      try {
        const response = await fetch("http://localhost:3001/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        if (data.statusCode === 200) {
          localStorage.clear();
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    editProfile(data) {
      this.isEdit = true;
      // Assign a copy of the profile data to editData to avoid directly modifying the profile state
      this.editData = { ...data };
    },
    async saveProfile() {
      try {
        const response = await fetch("http://localhost:3001/user/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: this.editData.name,
            age: this.editData.age,
          }),
        });
        const data = await response.json();
        if (data.statusCode === 200) {
          // Update the profile with edited data
          this.profile = { ...data.data };
          this.isEdit = false;
        }
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    },
    async handleDelete() {
      const response = await fetch("http://localhost:3001/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      if (data.statusCode == 200) {
        this.$router.push("/register");
      }
    },
  },
};
</script>
