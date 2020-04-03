<template>
  <div class="dialog-group yl-use">
    <el-dialog :title="dialogContent.title" :visible.sync="dialogFormVisible">
      <div class="bd-content" v-if="dialogContent.content">{{dialogContent.content}}</div>
      <slot v-else></slot>
      <div v-if="dialogContent.dialogType === 'form'" slot="footer" class="dialog-footer">
        <div class="btn-item">
          <el-button @click="cancelBtn">{{dialogContent.leftBtnName}}</el-button>
        </div>
        <div class="btn-item">
          <el-button type="primary" @click="confirmBtn">{{dialogContent.rightBtnName}}</el-button>
        </div>
      </div>
      <div v-if="dialogContent.dialogType === 'tips'" slot="footer" class="dialog-footer">
        <div class="btn-item">
          <el-button @click="dialogFormVisible = false">{{dialogContent.tipName}}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogContent: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  created () {},
  destroyed () {},
  mounted () {
    console.log(this.dialogContent)
  },
  computed: {},
  watch: {},
  methods: {
    cancelBtn (e) {
      this.$emit('left', e)
    },
    confirmBtn (e) {
      this.$emit('right', e)
    }
  }
}
</script>

<style scope lang="scss">
.yl-use /deep/ {
  .el-dialog {
    border-radius: 5px;width:446px;
    /* === 头部 === */
    .el-dialog__header {
      padding:14px 30px 14px;text-align:left;border-bottom:solid 1px #ddd;
      .el-dialog__title {font-size:16px;font-weight: 500;}
      .el-dialog__headerbtn{top:10.5px;right:10.5px;font-size:25px;color:#d8d8d8;}
    }
    /* === 内容 === */
    .el-dialog__body {
      .bd-content{white-space: pre-line;}
      padding: 30px 30px;
      .el-form-item {
        margin-bottom:0;
        .el-form-item__content {
          .flex-li.lf-show{text-align: left;}
          .star {margin-right:10px;min-width:70px;}
          .add-option{text-align: right;color:#1890ff;text-decoration: underline;cursor: pointer;}
          .el-checkbox-group .el-checkbox{
            width:100%;text-align: left;
            .span-checkbox{display: inline-block;width:100px;}
            .span-input{width:88px;}
            .span-input .el-input__inner {height:23px;}
          }
        }
      }
      /* 标签设置 */
      .setLabel {
        .label-line-group {margin-top:15px;}
        .el-form-item {
          .el-form-item__content {
            .li-info{
              .el-tag{
                position:relative;text-align:center;margin-right:12px;width:90px;height:30px;color:#333;font-size:12px;border-radius: 2px;background:#e9e9e9;border:none;
                .el-tag__close{position: absolute;font-size:16px;top:-8px;right:-8px;border-radius: 16px;width:16px;height:16px;border:solid 1px #1890ff;}
              }
            }
          }
        }
      }
    }
    /* === 底部 === */
    .el-dialog__footer {
      padding: 15px 47px;border-top:solid 1px #ddd;
      .dialog-footer {
        display: flex;
        .btn-item {flex:1;text-align: center;}
        .el-button{width:80px;padding:10px 20px;background-color: #fff;border-color: #1890ff;color:#1890ff;}
        .el-button--primary{background-color: #1890ff;border-color:#1890ff;color:#fff;}
      }
    }
  }
}
</style>
