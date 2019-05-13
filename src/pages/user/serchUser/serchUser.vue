<template>
  <div class="serchUser">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>查询用户</span>
      </div>
      <div>
        <el-form :inline="true" :model="form">
          <el-form-item label="学号">
            <el-input v-model="form.userLoginName" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.userRealName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="form.userState" placeholder="请选择状态">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="serch">查询</el-button>
          </el-form-item>
        </el-form>
        <user-table :data="tableData" @changData="changData" class="table"/>
        <div class="page_content">
          <el-pagination
            background
            layout="pager"
            :current-change="currentChange"
            :page-size="5"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { findUserByCondition, delUserById } from "@/api/api.js";
import userTable from "./userTable/userTable";
export default {
  components: {
    userTable
  },
  data() {
    return {
      total: 0,
      tableData: [],
      form: {
        userLoginName: null, //账号
        userRealName: null, //姓名
        userSex: null, //性别
        userState: 0, //状态 1启用  2禁用
        currentPage: 1, //当前页
        pageSize: 5 //页面大小
      }
    };
  },
  methods: {
    serch() {
      this.form.currentPage = 1;
      this.findUserByCondition();
    },
    changData() {
      this.serch();
    },
    currentChange(v) {
      this.form.currentPage = v;
      this.findUserByCondition();
    },
    findUserByCondition() {
      let _this = this;
      findUserByCondition(this.form).then(res => {
        console.log(res);
        if (res) {
          _this.tableData = res.userList;
          _this.total=res.total;
        }
      });
    }
  },
  mounted() {
    this.findUserByCondition();
  }
};
</script>

<style lang="scss">
.serchUser {
  display: flex;
  flex-direction: column;
  .table {
    flex: 1;
  }
}
</style>
