<template>
  <div id="app">
    <h1> Crypto Market</h1>
    <div id = "flex">
      <Holdings />
      <TopCoins />
    </div>
    <p>Data source <a href="https://www.coingecko.com/en/api"><code>https://www.coingecko.com/en/api</code></a></p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Holdings from './components/CompanyHoldings.vue';
import TopCoins from './components/TopCoins.vue';

@Component({
  components: {
    Holdings, TopCoins
  },
})
export default class App extends Vue {}
</script>

<style>
#app{
  align-items: center;
  text-align: center;
  color: white;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

#flex{
  vertical-align: middle;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

body{
  background-color: hsl(0, 0%, 12%);
}

p:last-of-type {
  font-style: italic;
  font-size: smaller;
}

p:last-of-type > a:hover {
  color: yellow;
}

a:link {
  color: hsl(86, 54%, 51%);
}

a:visited {
  color: darkgray;
}



</style>