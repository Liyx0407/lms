<template>
  <div class="bookDetials">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图书详情</span>
      </div>
      <div class="text item">
        <div class="top">
          <div class="img_box">
            <img v-if="data.bookPicture" :src="data.bookPicture" alt srcset>
            <img src="../../../../static/images/book2.jpg" v-else alt srcset>
          </div>
          <div>
            <p>图书名:{{data.bookName}}</p>
            <p>作者：{{data.bookAuther}}</p>
            <p>编号：{{data.bookNo}}</p>
          </div>
        </div>

        <div class="bottom">
          <p>出版社:{{data.bookPress}}</p>

          <p>出版时间：{{data.bookPublish}}</p>
          <p>图书描述：{{data.bookDes}}</p>
          <p>图书类型：{{data.bookType}}</p>
          <p>图书数量：{{data.bookNum}}</p>
          <p>存放位置：{{data.bookAddress}}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getBookById } from "@/api/api.js";

export default {
  data() {
    return {
      data: {},
      id: ""
    };
  },
  mounted() {
    let id = this.$route.query.id;
    if (id) {
      this.id = id;
      this.getBookById();
    }
  },
  methods: {
    getBookById() {
      let _this = this;
      getBookById({ id: this.id }).then(res => {
        if (res) {
          _this.data = res.book;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.bookDetials {
  .top {
    display: flex;
    .img_box {
      width: 30%;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
