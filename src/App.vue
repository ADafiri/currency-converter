<template>
  <v-app>
    <v-app-bar app class="app">
      <v-app-bar-title>
        <v-btn
          href="https://github.com/ADafiri"
          target="_blank"
          color="white"
          icon
        >
          <v-icon large>mdi-github</v-icon>
        </v-btn>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="ml-1"
        v-for="item in appBarItems"
        :key="item.title"
        :to="item.path"
      >
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data: () => ({
      appBarItems: [
        { title: 'Home', path: '/', icon: 'mdi-home' },
        { title: 'History', path: '/history', icon: 'mdi-clipboard-text-clock' },
      ],
    }),
    methods: {
      fetchCurrencies() {
        //Check if currencies exist in localStorage
        let currencies = localStorage.getItem('currencies');
        if (currencies) {
          this.currencies = JSON.parse(currencies);
          return;
        }
        //If not, fetch currencies from API and add to localStorage
        axios
          .get('http://www.floatrates.com/daily/gbp.json')
          .then(response => {
            const rates = Object.values(response.data);
            let currencies = [];
            for (let i = 0, max = rates.length; i < max; i++) {
              currencies.push({ code: rates[i].code, name: rates[i].name, rate: rates[i].rate });
            }
            currencies.push({ code: 'GBP', name: 'U.K. Pound Sterling' });
            localStorage.setItem('currencies', JSON.stringify(currencies));
          })
          .catch(error => {
            console.log(error);
          });
      },
    },
    created() {
      this.fetchCurrencies();
    },
  };
</script>

<style scoped>
  .app {
    font-size: 16px;
    background-image: linear-gradient(
      -90deg,
      #05b8a9,
      #136fd8
    );
  }
</style>