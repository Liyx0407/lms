<template>
  <div v-if="dataArr" class="report_table">
    <el-table
      style="width: 100%"
      :load="true"
      :data="dataArr"
      :fit="true"
      class="table_con"
      height="100%"
    >
      <el-table-column type="index" label="序号" fixed="left"></el-table-column>
      <div v-if="dataArr.length>0">
        <el-table-column
          :label="getLableName(key)"
          v-for="(value,key) in dataArr[0]"
          v-if="getLableName(key)"
          :key="key"
          :fixed="getFixed(key)"
        >
          <template slot-scope="scope" v-if="getLableName(key)">
            <span>{{scope.row[key]}}</span>
          </template>
        </el-table-column>
      </div>
      <div v-else>
        <el-table-column :label="value" v-for="(value,key) in headerObj" :key="key"></el-table-column>
      </div>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    dataArr: {
      type: Array,
    },
    headerObj: {
      type: Object,
    },
    filterObj: {
      type: Object
    },
    fixedArr: {
      type: Array
    }
  },
  methods: {
    getLableName(v) {
      return this.headerObj[v];
    },
    getFixed(v) {
      if (this.fixedArr) {
        for (const item of this.fixedArr) {
          if (item.key === v) {
            return item.position;
          }
        }
      }
    },
    mounted() {
      console.log(this.dataArr);
    }
  }
};
</script>

<style>
.report_table {
  height: 100%;
}
</style>
