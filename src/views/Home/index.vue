<template>
  <div>
    shou ye
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>
<script>
export default {
  name: 'Home',
  methods: {
    logout () {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>
