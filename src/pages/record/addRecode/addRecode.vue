<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>添加借阅信息</span>
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
        <el-form-item label="借阅人账号" prop="loginName">
          <el-input type="text" v-model="form.loginName"></el-input>
        </el-form-item>
        <el-form-item label="借阅人姓名" prop="userName">
          <el-input v-model="form.userName" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="图书编号" prop="bookNo">
          <el-input type="text" v-model="form.bookNo"></el-input>
        </el-form-item>
        <el-form-item label="图书名称" prop="bookName">
          <el-input v-model="form.bookName" disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="借阅到期时间" prop="bDueTime">
          <!-- <el-input v-model="form.bDueTime"></el-input> -->
          <el-date-picker
            v-model="form.bDueTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import { addBorrow, getUserByLoginName, getBookByBookNo } from "@/api/api.js";
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户账号"));
      } else {
        let _this = this;
        getUserByLoginName({ loginName: this.form.loginName }).then(res => {
          if (res) {
            _this.form.userName = res.user.userRealName;
            _this.form.bPeople = res.user.userId;
            callback();
          } else {
            callback(new Error(res.msg));
          }
        });
      }
    };
    var validateBook = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入图书编号"));
      } else {
        let _this = this;
        getBookByBookNo({ bookNo: this.form.bookNo }).then(res => {
          if (res) {
            _this.form.bookName = res.book.bookName;
            _this.form.bookId = res.book.bookId;
            callback();
          } else {
            callback(new Error(res.msg));
          }
        });
      }
    };

    return {
      form: {
        loginName: "",
        userName: "",
        bDueTime: "",
        bPeople: "",
        bookNo: "",
        bookName: "",
        bookId: ""
      },
      //表单验证规则
      rules: {
        loginName: [
          //   { required: true, message: "请填写借阅人账号", trigger: "blur" },
          { validator: validateUser, trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请填写借阅人", trigger: "blur" }
        ],
        bDueTime: [
          { required: true, message: "请填写借阅到期时间", trigger: "blur" }
        ],
        bookNo: [{ validator: validateBook, trigger: "blur" }],
        bookName: [
          { required: true, message: "请填写图书名称", trigger: "change" }
        ]
      }
    };
  },
  mounted() {},

  methods: {
    addBorrow() {
      let {
        bDueTime, //借阅到期时间
        bPeople, //借阅人ID
        bookId
      } = this.form;
      let _this = this;
      addBorrow({
        bDueTime, //借阅到期时间
        bPeople, //借阅人ID
        bookId
      }).then(res => {
        if (res) {
          _this.$message({
            message: "添加成功！",
            type: "success"
          });
        }
      });
    },

    getAllAvailableRole() {
      let _this = this;
      getAllAvailableRole().then(res => {
        console.log(res);
        if (res) {
          _this.options = res.roleList;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addBorrow();
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
