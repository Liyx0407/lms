<template>
  <div>
    <template v-for="(menu,index) in data">
      <el-submenu :index="menu.index" v-if="!menu.isContent" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          {{menu.name}}
        </template>
        <tree-menu :data="menu.list"></tree-menu>
      </el-submenu>
      <el-menu-item v-if="menu.isContent" :index="menu.index" :key="index">{{menu.name}}</el-menu-item>
    </template>
  </div>
</template>

<script>
import treeMenu from "./treeMenu.vue";

export default {
  name: "treeMenu",
  components: {
    treeMenu
  },
  props: {
    data: {
      type: Array
    }
  },
  data(){
    return{
      roleType:[]
    }
  },
  methods: {
    //获取需要显示的菜单栏
    getIsShow(roleArr) {
      return FilterData(roleArr, this.roleType);
    },
    //获取用户权限数组
    getRoleList() {
      let roleList = this.$store.state.user.roleList;
      roleList.forEach(v => {
        this.roleType.push(v.rName);
      });

    }
  },
  // mounted() {
  //   this.getRoleList();
  // }
};
</script>

<style>
</style>
