<template>
  <!-- 上导航 -->
  <div>
    <!-- <van-nav-bar title="店铺详情" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar> -->
    <van-nav-bar
      title="店铺详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft()"
    />
  </div>

  <button>20201010131马晓惠{{ style }}</button>{{ userid }}

  <div class="box1">
    <span>{{ info.shopname }} </span>
    <span
      :style="style"
      id="sc"
      class="iconfont icon-shoucang"
      @click="disshoucang131()"
    >
      收藏店铺
    </span>
  </div>
  <!-- 标签 -->
  <div class="box2">
    <span class="iconfont icon-order">月销售{{ num1 }}单</span>
    <span class="iconfont icon-meiyuan">免费配送</span>
    <span class="iconfont icon-shizhong">出餐时长{{ num2 }}min</span>
  </div>
  <!-- tab选项卡 -->
  <div class="box3">
    <van-tabs v-model:active="activeshow">
      <van-tab title="点餐">
        <div class="sumt">
          <div class="box3t">
            <van-sidebar v-model="active">
              <div v-for="(v, i) in list" :key="i">
                <!-- {{ v.intro }} -->
                <van-sidebar-item :title="v.intro" />
              </div>
              <!-- <van-sidebar-item title="香肉饭" /> 
              <van-sidebar-item title="韩式拌饭" />
              <van-sidebar-item title="单加" /> -->
            </van-sidebar>
          </div>
          <div class="box4t">
            <p>{{ info.shopname }}</p>
            <div v-for="(v, i) in list" :key="i">
              <div class="dt">
                <div class="d1t">
                  <img :src="img + v.pic" @click="showcai(v.food_id)" alt="" />
                </div>
                <div class="d2t">
                      <div class="i1t">
                          <span>{{ v.foodname }}</span>
                          <span>{{ v.intro }}</span>
                      </div> 
                    <div class="i2t">
                      <span>￥{{ v.price }}</span>
                      <span class="iconfont icon-add-fill-gray"></span>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </van-tab>
      <van-tab title="评价"></van-tab>
      <van-tab title="店铺">
        <div class="box4">
          <img :src="img + info.pic" alt="" />
        </div>
        <!-- 单元格 -->
        <div class="box5">
          <div class="b1">
            <span class="iconfont icon-dizhi">店铺地址:{{ info.address }}</span>
          </div>
          <div class="b1">
            <span class="iconfont icon-dian_hua"
              >店铺电话:{{ info.phonenum }}</span
            >
          </div>
          <div class="b1">
            <span class="iconfont icon-xiangqing"
              >店铺详情:{{ info.intro }}</span
            >
          </div>
        </div></van-tab
      >
    </van-tabs>
  </div>
</template>
<script>
import "../assets/font/iconfont.css";
import {
  NavBar,
  Tab,
  Tabs,
  Sidebar,
  SidebarItem,
  Toast,

} from "vant";
// import router from "../router/index.js";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Checkbox, CheckboxGroup, } from "vant";
export default {
  name: "店铺详情",
  components: {
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
  },
  //路由参数更新页面不刷新
  watch: {
    $route(to, from) {
      // 对路由变化作出响应
      if (to != from) {
        window.location.reload();
      }
    },
  },

  // props:{ path:String},
  setup() {
     const showcai = (cai) => {
      
      router.push("/Recipedetails/"+ cai);
    };
    const style = reactive({ color: "Green" });

    // let style = ({color:"black"});
    const onClickLeft = () => {
      router.push("/Main");
    };
    const checked = ref(true);
    const activeshow = ref(0);
    const route = useRoute();
    const router = useRouter();
    const id = route.params.id;
    const info = ref();
    const collected=ref(0);//未收藏
    const shoucang = ref();
    const dpisshoucang = ref();
    const list = ref([]);
    const active = ref(0);
    const img = ref("http://172.24.10.130:8080/foodService");
    const num1 = ref();
    const num2 = ref();
    const userid = ref(sessionStorage.getItem("k"));
    
    const onSubmit = () => Toast("提交成功");
    const onClickLink = () => Toast("修改地址");
    onMounted(() => {
      num1.value = parseInt(Math.random() * (400 - 100 + 1) + 400);
      num2.value = parseInt(Math.random() * (15 - 10 + 10) + 15);
    });
    const axios = require("axios");
    //店铺详情 表6
    const getShopById = () => {
      return axios.get(
        "http://172.24.10.130:8080/foodService/getShopById.do?shop_id=" + id
      );
    };
    //菜品列表 表4
    const getFoodByShop = () => {
      return axios.get(
        "http://172.24.10.130:8080/foodService/getFoodByShop.do?shop_id=" + id
      );
    };
    //收藏// 向给定ID的用户发起请求 1
    /*     const getuserCollectShop = () => {
      return axios.get(
        "http://172.24.10.130:8080/foodService/userCollectShop.do?user_id=468&shop_id=" +
          id
      );
    }; */
    //店铺是否收藏2改进   表12
    const getisCollected = () => {
      return axios.get(
        "http://172.24.10.130:8080/foodService/isCollected.do?user_id=" +
          userid.value +
          "&shop_food_id=" +
          id +
          "&flag=" +
          0
      );
    };
    // const getuserCollectShop = () => {
    //   return axios.get(
    //       "http://172.24.10.130:8080/foodService/userCollectShop.do?user_id=" +
    //         userid.value +
    //         "&shop_id=" +
    //         id
    //     )
    // };
    axios
      .all([getShopById(), getFoodByShop(), getisCollected()])

      // .get("http://172.24.10.130:8080/foodService/getShopById.do?shop_id=" + id)
      .then(function (response) {
        // 处理成功情况
        info.value = response[0].data;
        list.value = response[1].data;
        /*   shop.value = response[2].data.success; */
        shoucang.value = response[2].data.collected;
        console.log(response);
        console.log(shoucang.value);
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        /*                //总会执行 
       let fbox = document.getElementById("sc");
                if (shop.value==1){
                //这是把css里把id叫做sc的函数提到js里面，进而修改它的样式
                fbox.style.color='red';
                }   
        */
        console.log(style);
        if (shoucang.value == "1") {
          style.color = "red";
        } else {
          style.color = "";
        }
      });
    //  店铺收藏/取消收藏  表10
    const disshoucang131 = () => {

      // 向给定ID的用户发起请求
       axios
        .get(
          "http://172.24.10.130:8080/foodService/userCollectShop.do?user_id=" +
            userid.value +
            "&shop_id=" +
            id
        )
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          dpisshoucang.value = response.data.success;
         
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
            if(dpisshoucang.value==1){
              if(collected.value==0){
              Toast("收藏成功");
               style.color = "red";
               collected.value=1;
              }
              else if(collected.value==1){
                Toast("取消收藏");
                style.color = "";
                collected.value=0;
              }

            }
        });
    };
    return {
      info,
      img,
      active,
      onClickLeft,
      list,
      num1,
      num2,
      activeshow,
      onSubmit,
      onClickLink,
      checked,
      userid,
      style,
      disshoucang131,
      showcai,
    };
  },
};
</script>
<style scoped>
#sc {
  font-size:25px ;
}
.box2 {
  padding-top: 18px;
  text-align: center;
}
.box2 span {
  padding-left: 5px;
}
.box1 {
  /* padding-left: 40px; */
  display: flex;
  justify-content: space-around;
  font-size: 20px;
}
.box5 {
  text-align: center;
}
.b1 {
  border: 1px solid black;
  /* border-radius: 1rem; */
  width: 100%;
  height: 200%;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.box4t img {
  width: 150px;
  height: 150px;
}
.sumt {
  display: flex;
}
.box4t {
  display: flex;
  flex-flow: column;
}
.dt {
  display: flex;
  margin-bottom: 8px;
}

.i1t {
  display: flex;
  flex-flow: column;
  padding-left: 30px;
}
.i1t :nth-child(1) {
  font-size: 25px;
}
.i2t {
 
  display: flex;
  justify-content:space-around;
  font-size: 20px;
  color:red;
  

}

.d2t {
  flex-grow: 1;
  display: flex;
  flex-flow: column;
  /* flex-wrap: wrap;
  align-content: space-around; */

  /* flex-direction: column;  */

}
.i1t{
flex-grow: 1;
}
</style>
