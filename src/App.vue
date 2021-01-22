<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-success">
      <router-link :to="{ name: 'Employees' }" class="navbar-brand"
        >Employee Manager</router-link
      >
      <div class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link :to="{ name: 'Create' }" class="nav-link"
            >Add</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Employees' }" class="nav-link"
            >View</router-link
          >
        </li>
      </div>
    </nav>
    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
  overflow: hidden;
}
#app {
  font-family: Georgia, Times, "Times New Roman", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
button {
  margin: 2px !important;
}
.nav-item {
  padding: 3px;
}
.nav-link {
  color: #ffffff !important;
  border: 1px solid #ffffff;
  border-radius: 3px;
}

.nav-link:hover {
  color: #28a745 !important;
  background-color: #ffffff;
}

.nav-link.router-link-exact-active.router-link-active {
  color: #000000 !important;
  background-color: #ffffff;
}

a:hover {
  text-decoration: none;
}
</style>
