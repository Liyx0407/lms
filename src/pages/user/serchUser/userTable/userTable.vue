<template>
  <el-table :data="data" style="width: 100%" class="user-table">
    <el-table-column fixed prop="userLoginName" label="用户账号"></el-table-column>
    <el-table-column prop="userRealName" label="姓名"></el-table-column>
    <el-table-column prop="userPhone" label="电话号码"></el-table-column>
    <el-table-column prop="userGrade" label="班级"></el-table-column>
    <el-table-column prop="userBorrow" label="总借阅图书(本)"></el-table-column>
    <el-table-column label="用户状态">
      <template slot-scope="scope">
        <span :class="scope.row.userState==1?'green':'red'">{{scope.row.userState==1?"启用":"禁用"}}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row)" type="text" size="small">
          <i class="el-icon-edit"></i>
          修改
        </el-button>

        <el-button type="text" @click="handClick(scope.row)" size="small">
          <span :class="scope.row.userState==1?'red':'green'">{{scope.row.userState==1?"禁用":"启用"}}</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { delUserById } from "@/api/api.js";
// import editUser from "../editUser/editUser";

export default {
  props: {
    data: {
      type: Array
    }
  },
  components: {
    // "edit-user": editUser
  },
  data() {
    return {
      type: 0
    };
  },
  methods: {
    edit(row) {
      console.log(row);
      this.$router.push({
        // name:"addUser",
        path: "/addUser",
        query: {
          id:row.userId
        }
      });
    },
    handClick(row) {
      if (row.userState == 1) {
        this.type = 2;
      } else {
        this.type = 1;
      }
      delUserById({ id: row.userId, type: this.type }).then(res => {
        if (res) {
          this.$emit("changData");
        }
      });
    }
  }
};
</script>
<style lang="scss">
.user-table {
  .red {
    color: red;
  }
  .green {
    color: green;
  }
}
</style>
