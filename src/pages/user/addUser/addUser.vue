<template>
  <el-card class="box-card" >
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
    </div>
    <div>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-form"
      >
        <el-form-item label="用户账号" prop="userLoginName">
          <el-input type="text" v-model="form.userLoginName" :disabled="isDisable"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="userPhone">
          <el-input v-model="form.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="userRealName">
          <el-input type="text" v-model="form.userRealName"></el-input>
        </el-form-item>
        <el-form-item label="班级" prop="userGrade">
          <el-input v-model="form.userGrade"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword" v-if="show">
          <el-input type="password" v-model="form.userPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" v-if="show">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="form.roleIds" multiple collapse-tags placeholder="请选择">
            <el-option v-for="item in options" :key="item.rId" :label="item.rDes" :value="item.rId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <el-radio-group v-model="form.userSex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户状态" prop="userState" :disabled="isDisable">
          <el-radio-group v-model="form.userState">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <!-- <el-button @click="resetForm('form')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import {
  getAllAvailableRole,
  getUserByUserId,
  addUser,
  updateUser
} from "@/api/api.js";
export default {
  inject: ["reload"],
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // show: true,
      form: {
        roleIds: [],
        userGrade: "",
        userId: null,
        userPassword: "", //密码
        userLoginName: "",
        checkPass: "",
        userPhone: "",
        userRealName: "",
        userSex: "男",
        userState: 1
      },
      id: "",
      show: true,
      user: {},
      title: "添加用户",
      isDisable: false,
      options: [],

      //表单验证规则
      rules: {
        userPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        userLoginName: [
          { required: true, message: "请填写用户账号", trigger: "blur" }
        ],
        userRealName: [
          { required: true, message: "请填写姓名", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "请填写电话号码", trigger: "blur" }
        ],
        userGrade: [{ required: true, message: "请填写班级", trigger: "blur" }],
        userState: [
          { required: true, message: "请选择用户状态", trigger: "blur" }
        ],
        userSex: [{ required: true, message: "请选择性别", trigger: "change" }],
        userRealName: [
          { required: true, message: "请填写真实姓名", trigger: "change" }
        ],
        roleIds: [
          { required: true, message: "请选择用角色", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.getId();
    this.getAllAvailableRole();
  },
  watch: {
    $route: function(to, from) {
      if (to.fullPath !== from.fullPath) {
        this.getAllAvailableRole();
         this.resetForm('form');
        this.isDisable =false;
        this.show = true;

      }
    }
  },

  methods: {
    getId() {
      let id = this.$route.query.id;
      if (id) {
        this.id = id;
        this.title = "修改用户信息";
        this.isDisable = true;
        this.show = false;
        this.getUserByUserId();
      }
    },
    getAllAvailableRole() {
      let _this = this;
      getAllAvailableRole().then(res => {
        if (res) {
          _this.options = res.roleList;
        }
      });
    },
    getUserByUserId() {
      let _this = this;
      getUserByUserId({ userId: this.id }).then(res => {
        if (res) {
          //es6 语法 解构同名属性并且赋值
          let {
            userGrade,
            userId,
            userLoginName,
            userPassword,
            userPhone,
            userRealName,
            userSex,
            userState
          } = res.user;
          _this.form = {
            userGrade, //es6语法 相当于 userGrade:res.user
            userId,
            userLoginName,
            userPassword,
            userPhone,
            userRealName,
            userSex,
            userState,
            roleIds: []
          };
          //格式化角色数组 弄成 [1,2]这样的格式
          res.user.roleList.forEach(v => {
            _this.form.roleIds.push(v.rId);
          });
        }
      });
    },
    //修改用户
    updateUserInfo() {
      let _this = this;
      let {
        roleIds,
        userGrade,
        userId,
        userLoginName,
        userPhone,
        userRealName,
        userSex,
        userState
      } = this.form;
      updateUser({
        userId,
        roleIds,
        userGrade,
        userLoginName,
        userPhone,
        userRealName,
        userSex,
        userState
      }).then(res => {
        if (res) {
          _this.$message({
            message: res.msg,
            type: "success"
          });
          this.$router.push("/serchUser");
        }
      });
    },
    //添加用户
    addUser() {
      let {
        roleIds,
        userGrade,
        userLoginName,
        userPassword,
        userPhone,
        userRealName,
        userSex,
        userState
      } = this.form;
      let _this = this;
      addUser({
        roleIds,
        userGrade,
        userLoginName,
        userPassword,
        userPhone,
        userRealName,
        userSex,
        userState
      }).then(res => {
        console.log(res);
        if (res) {
          _this.$message({
            message: res.msg,
            type: "success"
          });
          this.$router.push("/serchUser");
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.id) {
            //修改用户资料
            this.updateUserInfo();
          } else {
            //添加用户
            this.addUser();
          }
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
