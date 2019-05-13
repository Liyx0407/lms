<template>
  <div class="manage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图书查询</span>
      </div>
      <div class="text item">
        <all-book/>
      </div>
    </el-card>
  </div>
</template>
<script>
import allBook from "../allBook/allBook.vue";
import { getAllBook } from "@/api/api.js";
export default {
  components: {
    "all-book": allBook
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab);
    }
  }
};
</script>
<style lang="scss">
.manage {
  // background: #fff;
  padding: 0 20px;
}
</style>
