<template>
  <v-container class="my-2">
    <v-row>
      <v-col cols="12">
        <v-row justify="space-between">
          <v-col cols="12">
            <v-text-field 
              v-model="amount"
              label="Amount"
              :rules="rules"
              outlined
              @keydown="canShowResult = false"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col cols="5">
            <v-autocomplete 
              v-model="firstSelect"
              label="Convert From"
              :items="currencies"
              item-value="code"
              item-text="name"
              return-object
              outlined
              @change="fetchRates($event)"
            ></v-autocomplete>
          </v-col>
          <v-col cols="1" class="d-flex justify-center mt-2">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="#05b8a9"
                  icon
                  large
                  :disabled="amount === '' || firstSelect === null || secondSelect === null || !/^\d+$/.test(amount)"
                  @click="convert"
                >
                  <v-icon>mdi-sync</v-icon>
                </v-btn>
              </template>
              <span>Convert</span>
            </v-tooltip>
          </v-col>
          <v-col cols="5">
            <v-autocomplete
              v-model="secondSelect"
              label="Convert To"
              :items="currencies"
              item-value="code"
              item-text="name"
              return-object
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row justify="space-between" v-if="result !== null && canShowResult">
          <v-col cols="12" align="center">
            <span class="result">{{ amount }} {{ firstSelect.code }}</span>
            <span class="result"> = </span>
            <span class="result">{{ result }} {{ secondSelect.code }}</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'BaseConverter',
    props: {
      currencies: {
        type: Array,
        required: true,
      },
    },
    data: () => ({
      firstSelect: { code: 'GBP', name: 'U.K. Pound Sterling' },
      secondSelect: { code: 'USD', name: 'U.S. Dollar' },
      amount: 1,
      result: null,
      rules: [v => /^\d+$/.test(v) || 'Amount must be an integer'],
      allRates: [],
      canShowResult: false,
    }),
    methods: {
      fetchRates(obj) {
        if (obj && obj.hasOwnProperty('code')) {
          this.result = null;
          const param = obj.code.toLowerCase();
          axios
            .get(`http://www.floatrates.com/daily/${param}.json`)
            .then(response => {
              const rates = Object.values(response.data);
              this.allRates.splice(0, rates.length, ...rates);
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      convert() {
        const convertTo = this.secondSelect.code;
        let rate = 0;
        let result = this.amount;
        switch (this.firstSelect.code) {
          case 'GBP':
            rate = this.currencies.find(i => i.code === convertTo).rate;
            break;
          default:
            if (this.firstSelect.code !== convertTo && this.allRates.length > 0) {
              rate = this.allRates.find(i => i.code === convertTo).rate;
            }
            break;
        }
        if (rate !== 0) {
          result = rate * Number(this.amount);
          result = (Math.round(result * 100) / 100).toFixed(2);
        }
        this.result = result;
        this.canShowResult = true;

        this.addToConversionHistory();
      },
      addToConversionHistory() {
        this.$store.commit("setConversionHistory", {
          sourceCurrency: this.firstSelect.code,
          targetCurrency: this.secondSelect.code,
          amount: this.amount,
          convertedAmount: this.result,
          convertedAt: new Date(),
        });
      },
    },
  }
</script>

<style scoped>
  .result {
    font-size: 38px;
    font-weight: 800;
    color: #05b8a9;
  }
</style>