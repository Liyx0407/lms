<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>到期提醒</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <!--  "rId": 3,					//角色ID
      "rName": "employee",		//角色的名称
      "rDes": "员工",				//描述（用于前端显示）
          "rState": 1,-->
          <el-table-column prop="rName" label="角色的代号"></el-table-column>
          <el-table-column prop="rDes" label="角色的名称"></el-table-column>
          <el-table-column label="用户状态">
            <template slot-scope="scope">
              <span :class="scope.row.rState==1?'green':'red'">{{scope.row.rState==1?"启用":"禁用"}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="edit(scope.row)" type="text" size="small">
                <i class="el-icon-edit"></i>
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog title="提示" v-if="dialogVisible" :visible.sync="dialogVisible" width="80%">
      <edit-role @changeData="changeData" :data="selectObj"/>
    </el-dialog>
  </div>
</template>

<script>
import { getAllRole, updateRole } from "@/api/api.js";
import editRole from "./editRole/editRole";

export default {
  components: {
    editRole
  },
  methods: {
    edit(row) {
      this.dialogVisible = true;
      this.selectObj = row;
    },
    changeData() {
      this.dialogVisible = false;
      this.getAllRole();
    },
    getAllRole() {
      let _this = this;
      getAllRole().then(res => {
        if (res) {
          _this.tableData = res.roleList;
          console.log(res);
        }
      });
    }
  },
  mounted() {
    //获取到期提醒
    this.getAllRole();
  },
  data() {
    return {
      dialogVisible: false,
      selectObj: {},
      tableData: []
    };
  }
};
</script>

<style>
</style>
