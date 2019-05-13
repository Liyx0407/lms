
<template>
  <div class="sidebar" v-if='show'>
    <el-menu
      theme="dark"
      :collapse-transition="true"
      :unique-opened="true"
      class="el-menu"
      @select="handleSelect"
    >
      <template v-for="(item,index) in menuList">
        <el-submenu :index="item.index" :key="index" v-if="!item.isContent&&getIsShow(item.role)">
          <!-- <el-submenu :index="item.index" :key="index" v-if="!item.isContent"> -->
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </template>
          <tree-menu :data="item.list"></tree-menu>
        </el-submenu>
        <el-menu-item :index="item.index" :key="index" v-if="item.isContent&&getIsShow(item.role)">
          <!-- <el-menu-item :index="item.index" :key="index" v-if="item.isContent"> -->
          <i :class="item.icon"></i>
          {{item.name}}
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import treeMenu from "./treeMenu.vue";
import { FilterData } from "@/assets/js/utils";
export default {
  components: {
    treeMenu
  },
  data() {
    return {
      show:false,
      roleType: [],
      menuList: [
        {
          name: "用户管理",
          index: "1",
          isContent: false,
          icon: "el-icon-s-custom",
          role: ["systemAdmin"],
          list: [
            {
              name: "用户列表",
              index: "serchUser",
              role: ["systemAdmin"],
              isContent: true,
              icon: "el-icon-notebook-1",
              list: []
            },
            {
              name: "添加用户",
              role: ["systemAdmin"],
              index: "addUser",
              isContent: true,
              icon: "el-icon-notebook-1",
              list: []
            }
          ]
        },
        {
          name: "角色管理",
          role: ["systemAdmin"],
          index: "2",
          isContent: false,
          icon: "el-icon-user-solid",
          list: [
            {
              name: "角色列表",
              index: "role",
              role: ["systemAdmin"],
              role: [],
              isContent: true,
              icon: "el-icon-notebook-1",
              list: []
            }
          ]
        },
        {
          name: "图书类别管理",
          index: "3",
          role: ["systemAdmin", "admin"],
          isContent: false,
          icon: "el-icon-s-management",
          list: [
            {
              name: "类别列表",
              index: "serchCategory",
              role: ["systemAdmin", "admin"],

              isContent: true,
              icon: "el-icon-notebook-1",
              list: []
            },
            {
              name: "添加类别",
              index: "addCategory",
              role: ["systemAdmin", "admin"],
              isContent: true,
              icon: "el-icon-notebook-1",
              list: []
            }
          ]
        },
        {
          name: "图书管理",
          role: ["systemAdmin", "admin"],
          index: "4",
          isContent: false,
          icon: "el-icon-notebook-1",
          list: [
            {
              name: "图书列表",
              role: ["systemAdmin", "admin"],
              index: "serchBook",
              isContent: true,
              icon: "el-icon-notebook-1",
              list: []
            },
            {
              name: "添加图书",
              role: ["systemAdmin", "admin"],
              index: "addBook",
              isContent: true,
              icon: "el-icon-notebook-1",
              list: []
            }
          ]
        },
        {
          name: "图书列表",
          role: ["reader"],
          index: "readerSerch",
          isContent: true,
          icon: "el-icon-search",
          list: []
        },
        {
          name: "借阅与归还",
          index: "record",
          role: ["systemAdmin", "admin"],
          isContent: false,
          icon: "el-icon-document",
          list: [
            {
              name: "借阅与归还信息",
              role: ["systemAdmin", "admin"],
              index: "serchRecode",
              isContent: true,
              icon: "el-icon-notebook-1",
              list: []
            },
            {
              name: "添加借阅信息",
              role: ["systemAdmin", "admin"],
              index: "addRecode",
              isContent: true,
              icon: "el-icon-notebook-1",
              list: []
            }
          ]
        },
        //读者
        {
          name: "借阅记录",
          role: ["reader"],
          index: "readerRecord",
          isContent: true,
          icon: "el-icon-document",
          list: []
        },
        {
          name: "到期提醒",
          role: ["reader"],
          index: "dueInfo",
          isContent: true,
          icon: "el-icon-pie-chart",
          list: []
        }
      ]
    };
  },
  methods: {
    // 点击菜单栏跳转页面
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      // location.reload();
      this.$router.push({ path: `/${key}` });
    },
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
      // window.location.reload();
      this.show=true;
      console.log(this.roleType, "this.roleType");
    }
  },
  mounted() {
    console.log(this.$store.state);
    this.getRoleList();
  }
};
</script>

<style lang="scss">
.sidebar {
  // height: 100vh;
  .icon {
    width: 20px;
    height: 20px;
  }
  .el-menu {
    height: 100%;
    .el-menu-item {
      // border-bottom: 1px solid #ccc;
    }
  }
}
</style>
