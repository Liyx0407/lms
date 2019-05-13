<template>
  <div class="bookDetials">
    <p>书籍名称:{{data.bookName}}</p>
    <p>作者:{{data.bookAuther}}</p>
    <p>出版社:{{data.bookPress}}</p>
    <p>存放地址:{{data.bookAddress}}</p>
    <p>简介:{{data.bookDes}}</p>封面:
    <ul class="img-list">
      <li>
        <img :src="data.bookPicture" @click="innerVisible=true" alt srcset>
      </li>
      <!-- <li>
        <img src="../../../../static/images/book2.jpg" alt srcset>
      </li>-->
    </ul>

    <el-dialog
      :lock-scroll="true"
      width="70%"
      title="图片详情"
      :visible.sync="innerVisible"
      append-to-body
    >
      <img :src="data.bookPicture" class="img_detials" alt srcset>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      innerVisible: false
    };
  },
  mounted() {
    console.log(this.data);
  }
};
</script>

<style lang="scss">
.img_detials {
  // max-width: 800px;
  width: 100%;
}

.bookDetials {
  .el-dialog__body {
    text-align: center;
  }
  .img-list {
    li {
      list-style: none;
      cursor: pointer;
      img {
        // width: 400px;
        width: 100%

      }
    }
  }
}
</style>
