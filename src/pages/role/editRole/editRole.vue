<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="130px"
    class="demo-form"
  >
    <el-form-item label="角色id" prop="rName">
      <el-input type="text" v-model="form.rName" disabled="disabled"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" prop="rDes">
      <el-input v-model="form.rDes"></el-input>
    </el-form-item>
      <el-form-item label="角色状态" prop="rState" >
          <el-radio-group v-model="form.rState">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { updateRole } from "@/api/api.js";
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      form: {
        rName: '', //角色ID
        rDes: "", //角色描述
        rState: '' //角色状态
      },
      //表单验证规则
      rules: {
        rDes: [{ required: true, message: "请填写角色描述", trigger: "blur" }],
        rState: [{ required: true, message: "请选择角色状态", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (this.data) {
      this.form = this.data;
    }
  },

  methods: {
    updateRole() {
      let _this = this;
      updateRole(this.form).then(res => {
        console.log(res);
        if (res) {
          //   _this.options = res.roleList;
          _this.$message({
            message: "修改成功！",
            type: "success"
          });
          _this.$emit("changeData")
          _this.$router.push("/role");
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateRole();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
