<template>
  <div class="bookDesc">
    <div class="img_boox">   
      <img :src="data.bookPicture" v-if="data.bookPicture" alt srcset>
      <img src="../../../../static/images/book2.jpg" v-else alt srcset>
    </div>
    <div class="bottom">
      <p>图书名:{{data.bookName}}</p>
      <p>作者：{{data.bookAuther}}</p>
      <p>出版社:{{data.bookPress}}</p>
      <p class="more" @click="toMore">详情>></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  mounted(){
      console.log(this.data);
      
  },
  methods: {
    toMore() {
      this.$router.push({
        path: "/bookDetials",
        query: {
          id: this.data.bookId
        }
      });
    }
  }
};
</script>

<style lang="scss" >
.bookDesc {
  background: #fff;
  width: 100%;
//   max-height: 200px;
  .img_boox {
    width: 100%;
    // height:100%;
  height:200px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    margin: 0;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bottom {
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 10px;
    flex: 1;
  }
  .more {
    color: #09f;
    cursor: pointer;
    text-align: right;
    font-size: 12px;
  }
}
</style>
