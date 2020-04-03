<template>
  <div class="container">
    <!-- 带表单的Dialog -->
    <Dialog :dialogContent="dialogContent" ref="dialogContent1" @left="doCancel" @right="doSubmit"></Dialog>
    <!-- 仅用于提示的Dialog -->
    <Dialog :dialogContent="dialogContent" ref="dialogContent2" @left="doCancel" @right="doSubmit"></Dialog>
    <!-- 内容自定的Dialog -->
    <Dialog :dialogContent="dialogContent3" ref="dialogContent3" @left="doCancel" @right="doSubmit">
      <el-form :model="dialogContent3Form" :rules="dialogContent3Rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="dialogContent3Form.name"></el-input>
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '../../components/Dialog_e'
export default {
  data () {
    return {
      dialogContent1: {
        title: '删除',
        dialogType: 'form', // form或则tips(后者只有一个关闭的button)
        content: '确认要删除吗',
        leftBtnName: '取消',
        rightBtnName: '确定',
        tipName: '习大大来杭州啦'
      },
      dialogContent2: {
        title: '删除',
        dialogType: 'tips',
        content: '确认要删除吗',
        leftBtnName: '取消',
        rightBtnName: '确定',
        tipName: '关闭'
      },
      dialogContent3: {
        title: '删除',
        dialogType: 'form',
        content: '',
        leftBtnName: '取消',
        rightBtnName: '确定',
        tipName: ''
      },
      dialogContent3Form: {
        name: ''
      },
      dialogContent3Rules: {}
    }
  },
  components: { Progress },
  created () {},
  destroyed () {},
  mounted () {
    this.$refs.dialogContent3.dialogFormVisible = true
  },
  computed: {},
  watch: {},
  methods: {
    // 左键触发事件
    doCancel () {
      this.$refs.dialogContent2.dialogFormVisible = false
    },
    // 右键触发事件
    doSubmit () {
      // 提交逻辑
      // this.submit()
      this.$refs.dialogContent2.dialogFormVisible = false
    }
  }
}
</script>

<style>
</style>
