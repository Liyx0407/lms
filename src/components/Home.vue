<template>
  <div class="home">
    <el-container style="height: 100%; border: 1px solid #eee">
      <el-aside>
        <div class="left">
          <img src="../../static/images/timg.jpg" alt srcset class="header_Img">
          攀枝花学院图书管理系统
        </div>
        <side-bar/>
      </el-aside>
      <el-container>
        <el-header>
          <my-header/>
        </el-header>
        <el-main>
          <router-view v-if="isRouterAlive"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sideBar from "@/components/sideBar.vue";
import Header from "@/components/Header.vue";
export default {
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
  components: {
    "side-bar": sideBar,
    "my-header": Header
  }
};
</script>

<style lang="scss">
.home {
  .left {
    display: flex;
    align-items: center;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
  }
  .header_Img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 20px;
  }
  .el-main {
    background: #f2f2f2;
  }
}
</style>
