<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" :age="12" />
  <p>{{ name }}:{{ name2 }}:{{ ref2 }}</p>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  ref,
  computed,
  watchEffect,
} from 'vue'
import HelloWorld from './components/HelloWorld.vue'

interface Config {
  name: string
}
export default defineComponent({
  name: 'App',
  props: {
    age: {
      type: Number as PropType<number>,
    },
    config: {
      type: Object as PropType<Config>,
      required: true,
    },
  },
  components: {
    HelloWorld,
  },
  setup(props, { slots, attrs, emit }) {
    const nameRef = ref('jocky')
    const ref2 = ref(123)
    setInterval(() => {
      // state.name+='1'
      nameRef.value += '1'
    }, 5000)
    setInterval(() => {
      // state.name+='1'
      ref2.value += 10
    }, 1000)
    const computedNameRef = computed(() => {
      return nameRef.value + '2'
    })
    watchEffect(() => {
      console.log(nameRef.value)
      // console.log(ref2.value)
    })
    return { name: nameRef, name2: computedNameRef, ref2 }
  },
  mounted() {
    // this.config.name
    console.log(this.name, 'oooo')
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
