<template>
  <div>
    <my-form @getTableData="getTableData" :currentPage="currentPage"/>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="bookName" label="书籍名称"></el-table-column>
      <el-table-column prop="bookAuther" label="作者"></el-table-column>
      <el-table-column prop="bookNo" label="图书编号"></el-table-column>
      <el-table-column prop="bookPress" label="出版社"></el-table-column>
      <el-table-column prop="bookPublish" label="出版时间"></el-table-column>
      <el-table-column prop="bookDes" label="书籍描述"></el-table-column>
      <el-table-column prop="bookNum" label="书籍数量"></el-table-column>
      <el-table-column prop="bookType" label="图书类型"></el-table-column>
      <el-table-column label="图书状态">
        <template slot-scope="scope">
          <span :class="scope.row.bookState==1?'green':'red'">{{scope.row.bookState==1?"启用":"禁用"}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="bookAddress" label="图书存放位置"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="书籍详情" v-if="show" :visible.sync="show">
      <book-detials :data="data"/>
    </el-dialog>
    <div class="page_content">
      <el-pagination
        background
        layout="pager"
        @current-change="currentChange"
        :page-size="5"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import bookDetials from "../bookDetials/bookDetials.vue";
import form from "../form/form.vue";
export default {
  components: {
    bookDetials,
    "my-form": form
  },
  data() {
    return {
      data: {},
      currentPage:1,
      total: 0,
      tableData: [],
      show: false
    };
  },


  methods: {
    currentChange(v) {
      this.currentPage = v;
    },
    getTableData(res) {
      if (res) {
        this.total = res.total;
        this.tableData = res.tableData;
      }
    },
    edit(row) {
      console.log(row);
      this.$router.push({
        path: "/addBook",
        query: {
          id: row.bookId
        }
      });
    },
    handleClick(row) {
      console.log(row);
      this.data = row;
      this.show = true;
    }
  }
};
</script>