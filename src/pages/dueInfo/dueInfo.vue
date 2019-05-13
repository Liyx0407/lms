<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>到期提醒</span>
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
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getExpirationReminderInfo } from "@/api/api.js";
export default {
  methods: {
    getExpirationReminderInfo() {
      let _this = this;
      getExpirationReminderInfo().then(res => {
        console.log(res);
        if (res) {
          _this.tableData = res.list;
        }
      });
    }
  },
  mounted() {
    //获取到期提醒
    this.getExpirationReminderInfo();
  },
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style>
</style>
