<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
    </div>
    <div>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="130px"
        class="demo-form"
      >
        <el-form-item label="分类名称" prop="bTypeName">
          <el-input type="text" v-model="form.bTypeName" ></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="bTypeState">
          <el-radio-group v-model="form.bTypeState">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import {   addType,
  updateType,getTypeById } from "@/api/api.js";
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        bTypeName: "", //类别名
        bTypeState: 1
      },
      title: "添加分类",
      //表单验证规则
      rules: {
        bTypeName: [
          { required: true, message: "请填写类别名称", trigger: "blur" }
        ],
        bTypeState: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.title="修改分类";
      this.id=id;
      this.getTypeById();
    }
  },

  methods: {
    updateType() {
      let _this = this;
      updateType(this.form).then(res => {
        if (res) {
          _this.$message({
            message: "修改成功！",
            type: "success"
          });
          _this.$router.push('/serchCategory');
          _this.resetForm('form');
        }
      });
    },
    getTypeById(){
      let _this=this;
      getTypeById({id:this.id}).then(res=>{
        if (res) {
          _this.form=res.type
          console.log(res
          );
          
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id) {
          this.updateType();
            
          }else{
            this.addType()
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addType(){
      let _this = this;
      addType(this.form).then(res=>{
            _this.$message({
            message: res.msg,
            type: "success"
          });
          _this.resetForm('form');
        
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.demo-form {
  width: 50%;

  .el-input {
    width: 300px；;
  }
}
</style>
