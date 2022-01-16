<template>
  <div class="app">
    <transition mode="out-in" name="fade" appear>
      <div class="app-card">
        <span class="title">Conversion History</span>
        <v-divider class="py-2"></v-divider>
        <conversion-history :history="history" />
      </div>
    </transition>
  </div>
</template>

<script>
  const conversionHistory = () => import('../components/ConversionHistory');

  export default {
    name: 'History',
    components: {
      conversionHistory
    },
    data: () => ({
      history: [],
    }),
    watch: {
      '$store.state.conversionHistory': {
        handler: 'updateHistory',
        immediate: true,
      }
    },
    methods: {
      updateHistory(history) {
        this.history = history;
      },
    },
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,
  body {
    font-size: 16px;
    background-image: linear-gradient(
      -90deg,
      #05b8a9,
      #136fd8
    );
  }
  .app {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .app-card {
    width: 800px;
    min-height: 400px;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 20px 20px fade(black, 30);
  }
  .title {
    font-size: 38px;
    font-weight: 800;
    color: #136fd8;
  }
</style>