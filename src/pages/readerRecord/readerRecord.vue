<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>借阅记录</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="bookName" label="图书名"></el-table-column>
          <el-table-column prop="bTime" label="借阅时间"></el-table-column>
           <el-table-column prop="bTerm" label="借阅期限（天）"></el-table-column>
          <el-table-column prop="bDueTime" label="到期时间"></el-table-column>
          <el-table-column prop="bPeopleName" label="借阅人姓名"></el-table-column>
          <el-table-column prop="bOperatorName" label="借阅操作人"></el-table-column>
          <el-table-column prop="isReturn" label="状态"></el-table-column>
          <el-table-column prop="rOperatorName" label="归还操作人"></el-table-column>
          <el-table-column prop="returnTime" label="归还时间"></el-table-column>
        </el-table>
      </div>
    </el-card>
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
</template>

<script>
import { getBorrowsByUserId } from "@/api/api.js";
export default {
  methods: {
    getBorrowsByUserId() {
      let _this=this;
      getBorrowsByUserId(this.form).then(res => {
        if (res) {
          _this.total=res.total;
          _this.tableData=res.list;
          
        }
      });
    },
    currentChange(v) {
      this.form.currentPage = v;
      this.getBorrowsByUserId();
    }
  },
  mounted() {
    //获取到期提醒
    this.getBorrowsByUserId();
  },
  data() {
    return {
      tableData: [],
      total: 0,
      form: {
        currentPage: 1,
        pageSize: 0
      }
    };
  }
};
</script>

<style>
</style>

