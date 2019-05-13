<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>类别查询</span>
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%">
          <!-- 
              "bTypeId": 1,
      "bTypeName": "小说类",
      "bTypeState": 1

          -->
          <el-table-column prop="bTypeName" label="类别名称"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <span
                :class="scope.row.bTypeState==1?'green':'red'"
              >{{scope.row.bTypeState==1?"启用":"禁用"}}</span>
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

    <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="80%">
      <edit-role @changeData="changeData" :data="selectObj"/>
    </el-dialog>-->
  </div>
</template>

<script>
import { getAllType } from "@/api/api.js";

export default {
  components: {},
  methods: {
    edit(row) {
      this.$router.push({
        // name:"addUser",
        path: "/addCategory",
        query: {
          id: row.bTypeId
        }
      });
    },
    changeData() {
      this.dialogVisible = false;
      this.getAllType();
    },
    getAllType() {
      let _this = this;
      getAllType().then(res => {
        if (res) {
          _this.tableData = res.typeList;
          console.log(res);
        }
      });
    }
  },
  mounted() {
    //获取到期提醒
    this.getAllType();
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
