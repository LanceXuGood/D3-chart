<template>
  <div id="app">
    <div id="nav">
      <router-link v-for="(item, index) in routes" :to="`/${item.name}`" :key="index">{{item.name}}</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { routes } from '@/router.js'

export default {
  name: 'home',
  data () {
    return {
      routes
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  display: flex;
  justify-content: center;
  padding: 30px;
  a {
    padding: 5px 10px;
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.d3-tip {
  line-height: 1.71;
  font-family: Rubik;
  font-size: 14px;
  padding: 4px;
  background: #344563;
  color: #fff;
  border-radius: 4px;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}

/* Creates a small triangle extender for the tooltip */
.d3-tip:after {
  box-sizing: border-box;
  font-size: 10px;
  width: 100%;
  line-height: 1;
  opacity: 0.8;
  color: #344563;
  position: absolute;
  pointer-events: none;
}

/* Northward tooltips */
.d3-tip.n:after {
  content: "\25BC";
  margin: -1px 0 0 0;
  top: 100%;
  left: 0;
  text-align: center;
}

/* Eastward tooltips */
.d3-tip.e:after {
  content: "\25C0";
  margin: -4px 0 0 0;
  top: 50%;
  left: -8px;
}

/* Southward tooltips */
.d3-tip.s:after {
  content: "\25B2";
  margin: 0 0 1px 0;
  top: -8px;
  left: 0;
  text-align: center;
}

/* Westward tooltips */
.d3-tip.w:after {
  content: "\25B6";
  margin: -4px 0 0 -1px;
  top: 50%;
  left: 100%;
}
</style>
