<template>
  <div class="top">
    <div class="select">
      <h1>JWT Generator - Select type</h1>
    </div>
    <div class="options">
      <button class="Messaging-opt" v-on:click="components = 'messaging-select'">
        <h1>Messaging</h1>
      </button>
      <button class="SSO-opt" v-on:click="components = 'sso-select'">
        <h1>SSO</h1>
      </button>
    </div><br>
    <hr>
  </div>



  <div class="main">
    <component v-bind:is="components"></component>
  </div>
</template>

<script>
import Messaging_jwt from './Messaging_jwt.vue';
import Sso_jwt from './Sso_jwt.vue';

export default {
  name: 'HelloWorld',
  components: {
    "messaging-select": Messaging_jwt,
    "sso-select": Sso_jwt
  },
  props: {
    msg: String
  },
  data() {
    return {
      components: 'Messaging_jwt'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 768px) {
  .Messaging-opt, .SSO-opt {
    flex-basis: 100% !important;
    vertical-align: middle;
    cursor: pointer;
    font-family: "Roboto", Helvetica, Arial;
    background-color: #b2c2c4;
  }
  .options {
    margin: auto;
    text-align: center;
    display: flex;
    vertical-align: middle;
    font-size: 8px !important;
    width: 100% !important;
  }
  .select {
    font-family: "Roboto", Helvetica, Arial;
    font-weight: 300;
    font-size: 12px !important;
    color: black;
  }
}
@font-face {
  font-family: "Roboto";
  src: local("Roboto"),
   url(../assets/fonts/roboto/Roboto-Black.ttf) format("truetype");
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  background-color: white;
  border: 0px !important;
}
.select {
  font-family: "Roboto", Helvetica, Arial;
  font-weight: 300;
  font-size: 12px;
  color: black;
}
.options {
  margin: auto;
  text-align: center;
  display: flex;
  width: 30%;
  vertical-align: middle;
}
.Messaging-opt, .SSO-opt {
  flex: 1;
  vertical-align: middle;
  cursor: pointer;
  font-family: "Roboto", Helvetica, Arial;
  font-size: 12px !important;
  background-color: #b2c2c4;
}
.Messaging-opt:hover, .SSO-opt:hover {
  background-color: #00363d;
  color: white;
}
</style>
