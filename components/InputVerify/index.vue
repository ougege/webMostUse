<template>
  <section class="input-wrap">
    <el-input
      :suffix-icon="suffixIcon"
      :type="type"
      :placeholder="placeholder"
      :clearable="clearable"
      :disabled="disabled"
      @blur="blur"
      @focus="focus"
      @change="change"
      @input="input"
      v-model="inputObj.value">
      <template v-if="prepend" slot="prepend">{{prepend}}</template>
      <template v-if="append" slot="append">{{append}}</template>
    </el-input>
    <section class="error" v-if="inputObj.errmsg">{{inputObj.errmsg}}</section>
  </section>
</template>

<script>
export default {
  props: {
    inputObj: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    },
    minlength: {
      type: Number
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    prepend: {
      type: String,
      default: ''
    },
    append: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  created () {},
  destroyed () {},
  mounted () {
  },
  computed: {},
  watch: {},
  methods: {
    blur (e) {
      this.$emit('blur', e)
    },
    focus (e) {
      this.$emit('focus', e)
    },
    change (e) {
      this.$emit('change', e)
    },
    input (e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style scope lang="scss">
.input-wrap {
  display: inline-block;position: relative;
  .error {position:absolute;color:red;text-align: left;font-size:12px;margin-top:4px;margin-left:4px;}
}
</style>
