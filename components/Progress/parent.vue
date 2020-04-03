<template>
  <div class="container">
    <Progress :max="progress.max" :value="progress.value" :show="progress.show"></Progress>
  </div>
</template>

<script>
import Progress from '../../components/Progress'
export default {
  data () {
    return {
      progress: {
        value: 1,
        max: 100,
        show: false
      },
      timeId: ''
    }
  },
  components: { Progress },
  created () {},
  destroyed () {},
  mounted () {
    this.timeId = setInterval(this.runProgress, 1000)
  },
  computed: {},
  watch: {},
  methods: {
    runProgress () {
      this.progress.show = true
      this.progress.value += 30
      if (this.progress.value >= this.progress.max) {
        this.progress.value = 100
        clearInterval(this.timeId)
        this.progress.show = false
        // this.progress.show = false
      }
      console.log(this.progress)
    }
  }
}
</script>

<style>
</style>
