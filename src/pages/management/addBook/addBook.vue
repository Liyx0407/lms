<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
    </div>
    <div>
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="demo-form"
      >
        <el-form-item label="图书名称" prop="bookName">
          <el-input type="text" v-model="form.bookName" :disabled="isDisable"></el-input>
        </el-form-item>
        <el-form-item label="图书编号" prop="bookNo">
          <el-input v-model="form.bookNo"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="bookAuther">
          <el-input type="text" v-model="form.bookAuther"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="bookPress">
          <el-input v-model="form.bookPress"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="bookNum">
          <el-input v-model="form.bookNum"></el-input>
        </el-form-item>
        <el-form-item label="存放位置" prop="bookAddress">
          <el-input v-model="form.bookAddress"></el-input>
        </el-form-item>
        <el-form-item label="图书描述" prop="bookDes">
          <el-input v-model="form.bookDes"></el-input>
        </el-form-item>
        <el-form-item label="出版时间" prop="bookPublish">
          <el-date-picker
            v-model="form.bookPublish"
            type="datetime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="书籍类型" prop="bookType">
          <el-select v-model="form.bookType" placeholder="书籍类型">
            <el-option :label="v.bTypeName" :value="v.bTypeId" v-for="(v,i) in typeList" :key="i"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="书籍状态" prop="bookState">
          <el-radio-group v-model="form.bookState">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="封面" prop="bookPicture">
          <input
            type="file"
            name="test"
            ref="bookPicture"
            @change="getImgSrc"
            accept="image/gif, image/jpeg, image/png, image/jpg"
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- <img :src="this.form.bookPicture" alt="图书封面"> -->
    </div>
  </el-card>
</template>
<script>
import { getBase64Image } from "@/assets/js/utils";
import {
  addBook,
  updateBook,
  getAvaiableType,
  getBookById
} from "@/api/api.js";
export default {
  inject: ["reload"],
  data() {
    return {
      // show: true,
      bTypeId: [],
      typeList: [],
      form: {
        bookName: "",
        bookNo: "", //图书编号
        bookAuther: "",
        bookPress: "",
        bookPublish: "",
        bookDes: "",
        bookType: "",
        bookState: 1,
        bookNum: 0,
        bookAddress: "",
        bookPicture: "" //图片进行BASE64编码
      },
      id: "",
      show: true,
      user: {},
      title: "添加图书",
      isDisable: false,
      options: [],

      //表单验证规则
      rules: {
        bookName: [
          { required: true, message: "请填写书籍名称", trigger: "blur" }
        ],
        bookNo: [
          { required: true, message: "请填写图书编号", trigger: "blur" }
        ],
        bookAuther: [
          { required: true, message: "请填写作者", trigger: "blur" }
        ],
        bookPress: [
          { required: true, message: "请填写出版社", trigger: "blur" }
        ],
        bookPublish: [
          { required: true, message: "请填写出版时间", trigger: "blur" }
        ],
        bookDes: [
          { required: true, message: "请填写图书描述", trigger: "change" }
        ],
        bookType: [
          { required: true, message: "请选择图书类型", trigger: "change" }
        ],
        bookState: [
          { required: true, message: "请选择书籍状态", trigger: "change" }
        ],
        bookNum: [
          { required: true, message: "请填写书籍数量", trigger: "change" }
        ],
        bookAddress: [
          { required: true, message: "请填写存放位置", trigger: "change" }
        ],
        bookPicture: [
          { required: true, message: "请选择图片", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.getId();
    this.getAvaiableType();
  },
  watch: {},

  methods: {
    getBookById() {
      let _this = this;
      getBookById({ id: this.id }).then(res => {
        if (res) {
          for (let i = 0; i < _this.typeList.length; i++) {
            const v = _this.typeList[i];
            if (v.bTypeName == res.book.bookType) {
              res.book.bookType = v.bTypeState;
            }
          }
          _this.form = res.book;
        }
      });
    },
    getAvaiableType() {
      let _this = this;
      getAvaiableType().then(res => {
        if (res) {
          _this.typeList = res.typeList;
        }
      });
    },
    getId() {
      let id = this.$route.query.id;
      if (id) {
        this.id = id;
        this.title = "修改图书信息";
        this.getBookById();
      }
    },
    updateBook() {
      let _this = this;
      this.form.bookId = this.id;
      updateBook(this.form).then(res => {
        if (res) {
          _this.$message({
            message: res.msg,
            type: "success"
          });
          _this.$router.push('/serchBook')
          _this.resetForm("form");
        }
      });
    },
    addBook() {
      let _this = this;
      addBook(this.form).then(res => {
        if (res) {
          _this.$message({
            message: res.msg,
            type: "success"
          });
          _this.resetForm("form");
        }
      });
    },
    getImgSrc(e) {
      let self = this;
      const file = e.target.files[0];
      let reader = new FileReader();
      if (file) {
        //通过文件流将文件转换成Base64字符串
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          self.form.bookPicture = reader.result;
        };
      } else {
        self.form.bookPicture = reader.result;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let self = this;
        if (valid) {
          if (this.id) {
            //修改图书
            this.updateBook();
          } else {
            //添加图书
            this.addBook();
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.demo-form {
  width: 50%;

  .el-input {
    width: 300px；;
  }
}
</style>
