<template>
  <div>
    <h3>Coins Ranked by Market Cap</h3>
    <p><small>Input the number of coins you would like to see (up to 250 at once). Press 'Next' to see the next page and 'Previous' to go back.</small></p>
    <input type="number" min="1" max="250" v-model.number="numCoins">
    <button v-on:click="newLimit">Fetch</button>
    <button v-bind:disabled="currentPage === 1" @click="previousPage">Previous {{numCoins}}</button>
    <button v-if="currentPage <= 50" @click="fetchNextPage">Next {{numCoins}}</button>
    <table>
        <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>Rank (By Market Cap)</th>
        </tr>
        <tr v-for="(u,pos) in tokenArr" :key="pos">
            <td>{{u.name}}</td>
            <td>{{u.symbol.toUpperCase()}}</td>
            <td v-bind:style="[u.price_change_percentage_24h >= 0 ? {'color' : 'green' } : {'color' : 'red'}]">${{u.current_price}}</td>
            <td>${{u.market_cap}}</td>
            <td>{{u.market_cap_rank}}</td>
        </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from "axios";

import { Token } from  '@/datatypes'
@Component
export default class TopCoins extends Vue {
    tokenArr: Array<Token> = [];
    numCoins = 25;
    currentPage = 1;

    mounted():void {
        this.moreCoins(1);
    }

    newLimit():void{
        this.currentPage = 1;
        this.moreCoins(this.currentPage);
    }

    previousPage():void{
        this.currentPage--;
        this.moreCoins(this.currentPage);
    }

    fetchNextPage(): void {
        this.currentPage++;
        this.moreCoins(this.currentPage);
    }


    moreCoins(startAt : number):void{
        axios.request({
            method: "GET",
            url: "https://api.coingecko.com/api/v3/coins/markets",
            params: { 
                vs_currency: "usd", 
                order: "market_cap_desc", 
                per_page: this.numCoins, 
                page: startAt, 
                sparkline: false },
        })
        .then((r: AxiosResponse) => r.data)
        .then((myData: Array<Token>) => {
            this.tokenArr.splice(0);
            this.tokenArr.push(...myData);
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

h3 {
  color: hsl(86, 54%, 51%);
}

table {
  border: hsl(86, 54%, 51%);
}

table tr:nth-child(odd) {
  background-color: hsl(0, 0%, 40%);
}

table tr:nth-child(even) {
  background-color: hsl(0, 0%, 27%);
}

input:out-of-range{
    color: red;
}

button {
  background-color: hsl(86, 54%, 51%);
  color: white;
}

table tr:first-child {
  background-color: hsl(86, 54%, 51%);
}

input {
  margin-bottom: 5px;
}
</style>
