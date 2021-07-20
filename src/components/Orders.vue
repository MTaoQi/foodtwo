<template>
  <div class="box1">
    <van-nav-bar
      title="我的订单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>
  <div class="box2">
    <div class="box3">
      <van-row gutter="20">
        <van-col span="8" class="b1">
          <div v-for="(v, i) in list" :key="i">
            <img :src="img + v.pic" alt="" />
          </div>
          <!--   <div v-for="(v, i) in plist" :key="i">
            <div class="p1"><img :src="img + v" alt="" /></div>
          </div> -->
        </van-col>
        <van-col span="8" class="b2">
          <div v-for="(v, i) in list" :key="i">
            <div class="p2">
              <span>{{ v.shopname }}</span
              ><br />
              <span>{{ v.foodname }}</span>
            </div>
          </div>
        </van-col>
        <van-col span="8" class="b3">
          <div v-for="(v, i) in list" :key="i">
            <div class="p3">
              <span>{{ v.order_time }}</span
              ><br />
              <span>￥:{{ v.price }}</span
              ><br />
              <van-button type="primary" @click="showPopup(v.item_id)">
                评价
              </van-button>
            </div>
          </div>
        </van-col>
      </van-row>
      <van-popup
        v-model:show="show"
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-cell-group inset>
          <van-field v-model="value" label="评价" placeholder="请输入评价" />
        </van-cell-group>
        <button @click="success">确认</button>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { NavBar, Col, Row, Button, Popup, Field, CellGroup, Toast } from "vant";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  name: "我的订单",
  components: {
    [NavBar.name]: NavBar,
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
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
  setup() {
    const userid = ref(sessionStorage.getItem("k"));
    const router = useRouter();
    const onClickLeft = () => {
      router.push("/My");
    };
    const list = ref([]);
    /*  const plist = ref([]); */
    const img = ref("http://172.24.10.130:8080/foodService");
    const show = ref(false);
    const pj = ref();
    const varitemid = ref();
    const showPopup = (itemid) => {
      show.value = true;
      varitemid.value = itemid;
    };
    const success = () => {
      // 向给定ID的用户发起请求
      axios
        .get(
          "http://172.24.10.130:8080/foodService/insertComment.do?item_id=" +
            varitemid.value +
            "&content=" +
            value.value
        )
        .then(function (response) {
          // 处理成功情况
          console.log(response);
          pj.value = response.data.success;
          if (pj.value == 1) {
            Toast("评价成功");
          }
        })
        .catch(function (error) {
          // 处理错误情况
          console.log(error);
        })
        .then(function () {
          // 总是会执行
        });
    };
    const value = ref("");
    const axios = require("axios");

    // 向给定ID的用户发起请求
    //表15获取当前用户所有订单

    axios
      .get(
        "http://172.24.10.130:8080/foodService/getAllOrdersByUser.do?user_id=" +
          userid.value
      )
      .then(function (response) {
        // 处理成功情况
        console.log(response);
        list.value = response.data;
        /*   //表7 菜谱详情
        for (let i = 0; i <= list.value.length; i++) {
          axios
            .get(
              "http://172.24.10.130:8080/foodService/getFoodById.do?food_id=" +
                list.value[i].food_id
            )

            .then(function (response) {
              // 处理成功情况
              console.log(response);
              // plist.value = response.data.pic;
              plist.value.push(response.data.pic);
            })
            .catch(function (error) {
              // 处理错误情况
              console.log(error);
            })
            .then(function () {
              // 总是会执行
            });
        } */

        // 向给定ID的用户发起请求
      })

      .catch(function (error) {
        // 处理错误情况
        console.log(error);
      })
      .then(function () {
        // 总是会执行
      });

    return {
      onClickLeft,
      list,
      img,
      /*    plist, */
      show,
      showPopup,
      value,
      success,
    };
  },
};
</script>
<style scoped>
.box2 {
  background-color: #ccc;
  width: 100%;

  position: absolute;
}
.box3 {
  margin: 20px;
  /*   background-color: #fff; */
}
.b1 img {
  width: 100px;
  height: 122px;
  margin-bottom: 5px;
  border-radius: 1rem;
}
.p2 {
  margin-bottom: 90px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 1rem;
}
.p3 {
  margin-bottom: 30px;
}
</style>