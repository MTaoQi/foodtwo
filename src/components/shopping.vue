<template>
  <div class="box1">
    <van-nav-bar
      title="购物车"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"  
    />
  </div>
</template>
<script>
import { NavBar } from "vant";
import {useRouter} from "vue-router"
export default {
  name: "",
  components: {
    [NavBar.name]: NavBar,
  },
  setup() {
    const router=useRouter();
    const onClickLeft=()=>{
       router.push("/Main");
    };
    return {
        onClickLeft,
    };
  },
};
</script>
<style scoped>

</style>