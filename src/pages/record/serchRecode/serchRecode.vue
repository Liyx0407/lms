<template>
  <div class="serchUser">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>查询借阅记录</span>
      </div>
      <div>
        <el-form :inline="true" :model="form">
          <el-form-item label="账号">
            <el-input v-model="form.loginName" placeholder="请输入学号"></el-input>
          </el-form-item>
          <el-form-item label="图书编号">
            <el-input v-model="form.bookNo" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="是否归还">
            <el-select v-model="form.isReturn" placeholder="请选择状态">
              <el-option label="全部" :value="0"></el-option>
              <el-option label="未归还" :value="1"></el-option>
              <el-option label="已归还" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="serch">查询</el-button>
          </el-form-item>
        </el-form>
        <recode-table :data="tableData" @changData="changData" class="table"/>
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
import { getBorrowByCondition } from "@/api/api.js";
import recodeTable from "./recodeTable/recodeTable.vue";
export default {
  components: {
    "recode-table": recodeTable
  },
  data() {
    return {
      total: 0,
      tableData: [],
      form: {
        bookNo: "", //图书编号
        currentPage: 0, //当前页
        isReturn: 0, //是否归还 1未归还 2归还
        loginName: "", //登录账号  学号
        pageSize: 5 //页面大小
      }
    };
  },
  methods: {
    serch() {
      this.form.currentPage = 1;
      this.getBorrowByCondition();
    },
    changData() {
      this.serch();
    },
    currentChange(v) {
      this.form.currentPage = v;
      this.getBorrowByCondition();
    },
    getBorrowByCondition() {
      let _this = this;
      getBorrowByCondition(this.form).then(res => {
        console.log(res);
        if (res) {
            _this.tableData = res.list;
        }
      });
    }
  },
  mounted() {
    this.getBorrowByCondition();
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
