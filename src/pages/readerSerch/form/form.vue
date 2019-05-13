<template>
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="书名">
      <el-input v-model="form.bookName" placeholder="输入书名"></el-input>
    </el-form-item>
    <el-form-item label="作者">
      <el-input v-model="form.bookAuther" placeholder="输入作者"></el-input>
    </el-form-item>

    <el-form-item label="书籍类型">
      <el-select v-model="form.bookType" placeholder="书籍类型">
        <el-option :label="v.bTypeName" :value="v.bTypeId" v-for="(v,i) in typeList" :key="i"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { getAvaiableType, findBookByConditionForUser } from "@/api/api.js";

export default {
  props: {
    currentPage: {
      type: Number
    }
  },
  data() {
    return {
      form: {
        bookName: "", //书名
        bookAuther: "", //作者
        bookType: "", //类型
        currentPage: 1, //当前页
        pageSize: 5
      },
      typeList: []
    };
  },
  watch: {
    currentPage(v) {
      this.findBookByConditionForUser();
    }
  },
  mounted() {
    this.getAvaiableType();
    this.findBookByConditionForUser();
  },
  methods: {
    getAvaiableType() {
      let _this = this;
      getAvaiableType().then(res => {
        if (res) {
          _this.typeList = res.typeList;
          console.log(res);
        }
      });
    },
    findBookByConditionForUser() {
      let _this = this;
      findBookByConditionForUser(this.form).then(res => {
        if (res) {
          this.$emit("getTableData", {
            total: res.total,
            tableData: res.bookList
          });
        }
      });
    },
    onSubmit() {
      console.log("submit!");
      this.form.currentPage = 1;
      this.findBookByConditionForUser();
    }
  }
};
</script>
</script>

<style>
</style>
