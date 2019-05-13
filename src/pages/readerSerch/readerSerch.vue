<template>
  <div>
    <my-form @getTableData="getTableData" :currentPage='currentPage'/>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(v,i) in tableData" :key="i">
        <book-desc :data="v"/>
      </el-col>
    </el-row>
    <div class="page_content">
      <el-pagination
        background
        layout="pager"
        :current-change="currentChange"
        :page-size="20"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
// import bookDetials from "../bookDetials/bookDetials.vue";
import form from "./form/form.vue";
import bookDesc from "./bookDesc/bookDesc.vue";

export default {
  components: {
    "my-form": form,
    bookDesc
  },
  data() {
    return {
      // selectObj:,
      total: 0,
      currentPage:1,
      tableData: [],
      show: false
    };
  },

  methods: {
    currentChange(v) {
      _this.currentPage=v;
    },
    getTableData(res) {
      if (res) {
        this.total = res.total;
        this.tableData = res.tableData;
      }
    },
    handleClick(row) {
      console.log(row);
      this.data = row;
      this.show = true;
    }
  }
};
</script>