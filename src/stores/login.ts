import { defineStore } from "pinia";

const useLoginStore = defineStore("login", {
  state: () => ({
    counter: 0
  })
});

export default useLoginStore;
