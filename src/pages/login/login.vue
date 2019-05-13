<template>
  <div class="login_wrapper">
    <h2 class="title">攀枝花学院图书管理平台</h2>

    <div class="login">
      <p class="login_title title">登录</p>
      <el-form :model="formLogin" ref="ruleform" :rules="rules">
        <el-form-item prop="userLoginName">
          <el-input v-model="formLogin.userLoginName" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input v-model="formLogin.userPassword" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">保存密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="dologin()">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login, getUserInfo } from "@/api/api.js";
export default {
  name: "login",
  data() {
    return {
      formLogin: {
        //表单对象
        userLoginName: "", //登录账号
        userPassword: "" //用户密码
      },
      vehicleList: [],
      checked: false,
      yhsdp: null,
      rules: {
        userLoginName: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // this.getUserInfo();
    let user = localStorage.getItem("userPwd");
    if (user) {
      this.formLogin.userLoginName = JSON.parse(user).userLoginName;
      this.formLogin.userPassword = JSON.parse(user).userPassword;
      this.checked = true;
    }

    document.onkeydown = event => {
      var router = this.$route.path;
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13 && this.$route.path == "/login") {
        // enter 键
        this.dologin();
      }
    };
  },
  methods: {
    dologin() {
      //调用后端登陆接口
      // this.getUserinfo();
      let _this = this;
      this.$refs["ruleform"].validate(valid => {
        if (valid) {
          login(this.formLogin).then(res => {
            if (res) {
              if (_this.checked) {
                localStorage.setItem("userPwd", JSON.stringify(this.formLogin));
              }
              localStorage.setItem("token", res.token);
              _this.getUserInfo();
            }
          });
        } else {
          return false;
        }
      });
    },
    getUserInfo() {
      let _this=this;
      getUserInfo({}).then(res => {
        if (res) {
          this.$store.dispatch("add_UserInfo",res);
              this.$router.push({ path: "/index" });

        }
      });
    }
  }
};
</script>



<style lang="scss">
$input_width: 300px;
.login_wrapper {
  height: 100%;
  // background: url("../../../static/images/tushu.jpg") no-repeat;
  background: #f2f2f2;
  background-size: 100% auto;
  padding-top: 200px;
  box-sizing: border-box;
  .title {
    text-align: center;
    color: #66b1ff;
    width: 100%;
    font-size: 30px;
    font-weight: 400;
  }

  .login {
    width: 460px;
    height: 296px;
    margin: 0 auto;
    .login_title {
      font-size: 28px;
      margin-top: 30px;
      font-weight: 700;
    }
    .el-button {
      width: $input_width;
    }
    .el-form {
      margin: 30px 80px auto 80px;
      .error {
        display: block;
        text-align: center;
        color: red;
      }
    }
  }
}
.recover {
  position: absolute;
  bottom: 0px;
  cursor: pointer;
  color: #e6a23c;
  display: none;
}
.bei {
  position: absolute;
  bottom: 20px;
  cursor: pointer;
  color: #505458;
}
</style>

