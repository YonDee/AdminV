var Lang = {}
Lang.install = function (Vue, options) {
  Vue.prototype.$lang = {
    sign_in: 'sign_in',
    sign_up: 'sign_up',
    name: 'Name',
    name_required: 'Name is required.',
    account_or_email: 'Account / E-mail',
    account: 'Account',
    account_required: 'Account is required.',
    email: 'E-mail',
    email_required: 'E-mail is required.',
    email_valid: 'Must be valid e-mail.',
    password: 'Password',
    password_required: 'Password is required.',
    confirm_password: 'Confirm password',
    confirm_password_required: 'Confirm password is required.',
    confirm_password_same: 'Inconsistent password input twice.',
    register: 'Register',
    register_success: 'Register success.',
    login: 'Login',
    login_success: 'Login success.',
    submit_invalid: 'Submit invalid.',
    account_and_pass_required: 'Account and password is required.'
    user_manage: 'User Manage'
  }
}
module.exports = Lang;

