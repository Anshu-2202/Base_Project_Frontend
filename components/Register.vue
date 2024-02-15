<template>
  <div class="registration-form">
    <form @submit.prevent="handleSubmit">
      <h2>Register</h2>
      <div class="field">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="formData.email"
          id="email"
          required
          placeholder="Enter your email address"
        />
        <error-message v-if="errors.email">{{ errors.email }}</error-message>
      </div>
      <div class="field">
        <label for="name">Name</label>
        <input
          type="text"
          v-model="formData.name"
          id="name"
          required
          placeholder="Create a name"
        />
        <error-message v-if="errors.username">{{ errors.username }}</error-message>
      </div>
      <div class="field">
        <label for="age">Age</label>
        <input
          type="age"
          v-model="formData.age"
          id="age"
          required
          placeholder="age"
        />
        <error-message v-if="errors.age">{{ errors.age }}</error-message>
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="formData.password"
          id="password"
          required
          placeholder="Enter your password"
        />
        <error-message v-if="errors.password">{{ errors.password }}</error-message>
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Registering...' : 'Register' }}
      </button>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formData: {
        email: '',
        name: '',
        age: '' ,
        password: '',
      },
      errors: {},
      isLoading: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      this.errors = {}; // Reset errors

      try {
        const response = await fetch('http://localhost:3001/user/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        if (response.status !=200) {
          const errorData = await response.json();
          this.errors = errorData.errors || { error: 'Registration failed' };
          throw new Error(errorData.message || 'An error occurred');
        }
      } catch (error) {
        console.error('Registration error:', error);
        // Handle error gracefully (e.g., show a general error message)
        this.errors = { error: 'Registration failed' };
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
