<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="@/assets/images/head-photo.png" alt="" />
      </div>

      <!-- login input -->
      <el-form ref="loginFormRef" class="login_form" :model="form" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="form.username"
            placeholder="请输入用户名"
            type="text"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="form.password"
            placeholder="请输入密码"
            show-password
            type="password"
          ></el-input>
        </el-form-item>

        <el-form-item class="login_btn">
          <el-button type="primary" @click="handleClickLogin">登录</el-button>
          <el-button type="info" @click="()=>this.$refs.loginFormRef.resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClickLogin () {
      this.$refs.loginFormRef.validate(res => {
        if (!res) return false
        request({
          url: '/login',
          method: 'post',
          params: this.form
        }).then(res => {
          console.log(res)
          // 将登陆成功返回的 token 存储在 sessionStore 中
          window.sessionStorage.setItem('token', res.data.token)
          this.$Message.success(res.meta.msg)
          this.$router.push('/home')
        }).catch(res => {
          this.$Message.error(res.meta.msg)
        })
      })
    }
  },
  created () {
    document.onkeydown = e => {
      if (e.keyCode === 13) this.handleClickLogin()
    }
  }
}
</script>
<style lang="scss" scoped>
.login_container {
  height: 100%;
  background: #2b4b6b;
  display: flex;
  align-items: center;
  justify-content: center;

  .login_box {
    width: 450px;
    height: 300px;
    background: #fff;
    border-radius: 5px;
    position: relative;

    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 5px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #fff;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .login_form {
      position: absolute;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      bottom: 0;

      .login_btn {
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
