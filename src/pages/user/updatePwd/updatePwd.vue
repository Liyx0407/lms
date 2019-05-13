<template>
  <div class="updatePwd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules2"
          ref="ruleForm"
          label-width="100px"
          class="ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { findUserByCondition,logout,updatePassword} from "@/api/api.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.newPassword !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        oldPassword: "",
        newPassword: "",
        checkPass: "",
        age: "",
        userId: null
      },
      rules2: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  mounted() {
    // this.getUserInfo();
    this.ruleForm.username=this.$store.state.user.user.userLoginName
    this.ruleForm.userId=this.$store.state.user.user.userId
    console.log(this.$store.state);

  },
  methods: {
    //   在此修改密码
    updatedPwd() {
      let {
        newPassword, //新密码
        oldPassword, //原密码
        userId
      } = this.ruleForm;
      updatePassword({
        newPassword, //新密码
        oldPassword, //原密码
        userId
      }).then(res => {
        console.log(res);
        if (res) {
          this.$message({
            message: "密码修改成功!",
            type: "success"
          });
          // add by gw : must send update static cmd to MainSrc after update password  2019-04-24
          logout({}).then(res => {
            if (res) {
              if (res.success) {
                // 在此清除缓存数据
                // 回到登录页面
                this.$router.replace({ path: "/login" });
              }
            }
          });
        }
      });
    },
    getUserInfo() {
      let _this = this;
      getUserInfo({}).then(res => {
        console.log(res);
        if (res) {
          _this.ruleForm.userId = res.userMain.userID;
          _this.ruleForm.username = res.userMain.userName;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updatedPwd();
        } else {
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
.updatePwd {
  .ruleForm {
    width: 500px;
  }
}
</style>
