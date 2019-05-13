<template>
  <el-table :data="data" style="width: 100%" class="user-table">
    <el-table-column fixed prop="bookName" label="图书名"></el-table-column>
    <el-table-column fixed prop="bookNo" label="图书编号"></el-table-column>
    <el-table-column prop="bPeopleName" label="借阅人姓名"></el-table-column>
    <el-table-column prop="bTime" label="借阅时间"></el-table-column>
    <el-table-column prop="bTerm" label="借阅期限"></el-table-column>
    <el-table-column prop="bDueTime" label="到期时间"></el-table-column>
    <el-table-column prop="bOperatorName" label="借阅操作人"></el-table-column>
    <el-table-column prop="isReturn" label="是否归还"></el-table-column>
    <el-table-column prop="rOperatorName" label="归还操作人"></el-table-column>
    <el-table-column prop="returnTime" label="归还时间"></el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button v-if="scope.row.isReturn==='未归还'" @click="handClick(scope.row)" type="text" size="small">
          归还
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { returnBook } from "@/api/api.js";

export default {
  props: {
    data: {
      type: Array
    }
  },
  components: {
  },
  data() {
    return {
      type: 0
    };
  },
  methods: {
    handClick(row) {
      let _this=this;
      returnBook({bId:row.bId}).then(res=>{
        if (res) {
          _this.$message({
          message: '归还成功！',
          type: 'success'
        });
        _this.$emit("changData");
        }
      })
      
    }
  }
};
</script>
<style lang="scss">
.user-table {
  .red {
    color: red;
  }
  .green {
    color: green;
  }
}
</style>