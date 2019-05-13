//api.js
import service from './request'

//用户登录
const login = data => {
  return service({
    url: '/user/login',
    method: 'post',
    data
  })
};

//退出登录
const logout = data => {
  return service({
    url: '/user/logout',
    method: 'get',
    data
  })
};




//查询当前用户信息
const getUserInfo = data => {
  return service({
    url: '/user/getUserInfo',
    method: 'get',
    data
  })
};




//查询用户信息
const getAllUser = data => {
  return service({
    url: '/user/getAllUser',
    method: 'post',
    data
  })
};



//查询所有图书
const getAllBook = data => {
  return service({
    url: '/book/getAllBook',
    method: 'post',
    data
  })
};

//条件查询用户

const findUserByCondition = data => {
  return service({
    url: '/user/findUserByCondition',
    method: 'post',
    data
  })
};

//删除用户
const delUserById = data => {
  return service({
    url: '/user/delUserById',
    method: 'post',
    data
  })
};

//添加用户
const addUser = data => {
  return service({
    url: '/user/addUser',
    method: 'post',
    data
  })
};
//修改用户信息


const updateUser = data => {
  return service({
    url: '/user/updateUser',
    method: 'post',
    data
  })
};


//查询所有可用角色

const getAllAvailableRole = data => {
  return service({
    url: '/role/getAllAvailableRole',
    method: 'get',
    data
  })
};

//通过id获取用户
const getUserByUserId = data => {
  return service({
    url: '/user/getUserByUserId',
    method: 'get',
    data
  })
};
//到期提醒

const getExpirationReminderInfo = data => {
  return service({
    url: '/expirationReminder/getExpirationReminderInfo',
    method: 'get',
    data
  })
};

//借阅记录
const getBorrowsByUserId = data => {
  return service({
    url: 'borrow/getBorrowsByUserId',
    method: 'post',
    data
  })
};

//查询所有借阅信息
const getAllBorrows = data => {
  return service({
    url: '/borrow/getAllBorrows',
    method: 'post',
    data
  })
};
//条件查询借阅信息
const getBorrowByCondition = data => {
  return service({
    url: '/borrow/getBorrowByCondition',
    method: 'post',
    data
  })
};
//归还图书
const returnBook = data => {
  return service({
    url: '/return/returnBook',
    method: 'get',
    data
  })
};

//添加借阅信息
const addBorrow = data => {
  return service({
    url: '/borrow/addBorrow',
    method: 'post',
    data
  })
};

//通过用户名查询用户信息
const getUserByLoginName = data => {
  return service({
    url: '/user/getUserByLoginName',
    method: 'get',
    data
  })
};

//通过图书编号查询图书信息


const getBookByBookNo = data => {
  return service({
    url: '/book/getBookByBookNo',
    method: 'get',
    data
  })
};

//角色查询

const getRoleByRoleId = data => {
  return service({
    url: '/role/getRoleByRoleId',
    method: 'get',
    data
  })
};

//修改角色信息

const updateRole = data => {
  return service({
    url: '/role/updateRole',
    method: 'post',
    data
  })
};


//查询所有角色

const getAllRole = data => {
  return service({
    url: '/role/getAllRole',
    method: 'get',
    data
  })
};

//查询图书类别
const getAvaiableType = data => {
  return service({
    url: '/type/getAvaiableType',
    method: 'get',
    data
  })
};
//添加分类
const addType = data => {
  return service({
    url: '/type/addType',
    method: 'post',
    data
  })
};

//修改分类
const updateType = data => {
  return service({
    url: '/type/updateType',
    method: 'post',
    data
  })
};
//通过id查询类别信息
const getTypeById = data => {
  return service({
    url: '/type/getTypeById',
    method: 'get',
    data
  })
};

//查询所有类别
const getAllType = data => {
  return service({
    url: '/type/getAllType',
    method: 'get',
    data
  })
};

//查询图书（管理员）
const findBookByConditionForSys = data => {
  return service({
    url: '/book/findBookByConditionForSys',
    method: 'post',
    data
  })
};

//添加图书
const addBook = data => {
  return service({
    url: '/book/addBook',
    method: 'post',
    data
  })
};


//修改图书
const updateBook = data => {
  return service({
    url: '/book/updateBook',
    method: 'post',
    data
  })
};

//查询图书（用户）
const findBookByConditionForUser = data => {
  return service({
    url: '/book/findBookByConditionForUser',
    method: 'post',
    data
  })
};

//查询图书
const getBookById = data => {
  return service({
    url: '/book/getBookById',
    method: 'get',
    data
  })
};


//修改密码
const updatePassword = data => {
  return service({
    url: '/user/updatePassword',
    method: 'post',
    data
  })
};










export {
  login,
  logout,
  addBook,
  updateBook,
  getBookById,
  updatePassword,
  getAvaiableType,
  findBookByConditionForSys,
  findBookByConditionForUser,
  getAllUser,
  addType,
  getTypeById,
  updateType,
  getAllBook,
  getAllType,
  updateUser,
  getAllRole,
  getUserInfo,
  addBorrow,
  addUser,
  updateRole,
  getRoleByRoleId,
  findUserByCondition,
  delUserById,
  getAllAvailableRole,
  getUserByUserId,
  getExpirationReminderInfo,
  getBorrowsByUserId,
  getAllBorrows,
  getBorrowByCondition,
  returnBook,
  getUserByLoginName,
  getBookByBookNo

}
