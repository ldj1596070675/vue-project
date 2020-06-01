<template>
    <div class="detailtitle">
        <i class="iconfont icon-fanhui" @click="handleBank"></i>
        <span class="spa"><slot></slot></span>
    </div>
</template>

<script>
export default {
  methods: {
    handleBank () {
      this.$emit('back')
    }
  }
}
</script>
<style lang="scss" scoped>
    .detailtitle{
        width: 100%;
        height: .44rem;
        line-height: .44rem;
        position: fixed;
        top:0;
        left: 0;
        background: #ffffff;
        padding: 0 0.1rem;
        font-size: 0.17rem;
        .spa{
          margin-left: 1.1rem;
        }
  }
</style>
