<template>
  <div>
    <h3>Company Holdings</h3>
    <p><small>Enter 'Bitcoin' or 'Ethereum' to see public companies holding them.</small></p>
    <input type="string" v-model="Coin">
    <button v-on:click="getCompanies" v-bind:disabled="Coin != 'Ethereum' && Coin != 'Bitcoin'">Fetch</button>
    <table>
        <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Country</th>
            <th>Total Holdings</th>
            <th>Entry Value</th>
            <th>Current Value</th>
        </tr>
        <tr v-for="(u,pos) in companyArr" :key="pos">
            <td>{{u.name}}</td>
            <td>{{u.symbol}}</td>
            <td>{{u.country}}</td>
            <td>{{u.total_holdings}}</td>
            <td>${{u.total_entry_value_usd}}</td>
            <td>${{u.total_current_value_usd}}</td>
        </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios, { AxiosResponse } from "axios";

import { Companies, CompanyHoldings } from  '@/datatypes'
@Component
export default class Holdings extends Vue {
    companyArr: Array<Companies> = [];
    Coin = "Bitcoin";

    mounted():void {
        this.getCompanies();
    }
    getCompanies():void{
        axios.request({
            method: "GET",
            url: `https://api.coingecko.com/api/v3/companies/public_treasury/${this.Coin.toLowerCase()}`,
        })
        .then((r: AxiosResponse) => r.data)
        .then((myData: CompanyHoldings) => {
            this.companyArr.splice(0)
            this.companyArr.push(...myData.companies);
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
