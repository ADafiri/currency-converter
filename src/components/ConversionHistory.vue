<template>
  <v-container class="my-2">
    <v-row>
      <v-col cols="12">
          <v-row justify="space-between">
            <v-col cols="12">
              <v-data-table
                class="elevation-1"
                :headers="headers"
                :items="history"
                :items-per-page="5"
                :footer-props="{
                  showCurrentPage: true,
                  itemsPerPageText: 'Conversions per page',
                }"
              >
                <template v-slot:no-data>
                  <span>No conversion history available</span>
                </template>

                <template v-slot:[`item.actions`]="{ index }">
                  <v-btn
                    color="#05b8a9"
                    icon
                    @click="deleteHistory(index)"
                  >
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ConversionHistory',
    props: {
      history: {
        type: Array,
        default: () => [],
      },
    },
    data: () => ({
      headers: [
        { text: 'Source Currency', value: 'sourceCurrency' },
        { text: 'Target Currency', value: 'targetCurrency' },
        { text: 'Amount', value: 'amount' },
        { text: 'Converted Amount', value: 'convertedAmount' },
        { text: 'Converted At', value: 'convertedAt' },
        { text: '', value: 'actions', sortable: false, align: 'right' },
      ],
    }),
    methods: {
      deleteHistory(index) {
        this.$store.commit("deleteConversionHistory", index);
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