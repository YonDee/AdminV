var Lang = {}
Lang.install = function (Vue, options) {
  Vue.prototype.$lang = {
    sign_in: '登录',
    sign_up: '注册',
    name: '姓名',
    name_required: '请填写姓名',
    account_or_email: '账号 / 邮箱',
    account: '账号',
    account_required: '请填写账号',
    email: '邮箱',
    email_required: '请填写邮箱地址',
    email_valid: '请填写正确的邮箱',
    password: '密码',
    password_required: '请填写密码',
    confirm_password: '确认密码',
    confirm_password_required: '请填写确认密码',
    confirm_password_same: '密码输入不一致，请重新输入',
    register: '注册',
    register_success: '注册成功',
    login: '登录',
    login_success: '登录成功',
    submit_invalid: '无效的提交，请确认后重新提交',
    account_and_pass_required: '请填写账号密码',
    account_or_pass_error: '账号或密码错误',
    user_manage: '用户管理',
    add_user: '添加用户',
    back: '返回',
    search: '搜索',
  }
}
module.exports = Lang;

