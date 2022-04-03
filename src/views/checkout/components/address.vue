<template>
  <div class="address">
    <div class="left">
      <div class="text" v-if="defaultAddresser.receiver">
        <p>收货人：{{ defaultAddresser.receiver }}</p>
        <p>联系方式：{{ defaultAddresser.contact }}</p>
        <p>收货地址：{{ defaultAddresser.fullLocation }}</p>
      </div>
      <div class="noAddress" v-else>请添加地址</div>
      <a class="del" @click="Modify"> 修改地址 </a>
    </div>
    <div class="right">
      <div class="switch" @click="addActive = !addActive">
        切换地址
        <teleport to="#app">
          <div class="mask" v-if="addActive">
            <div class="content">
              <h3>
                切换地址
                <close-outlined @click="addActive = false" />
              </h3>
              <div
                class="text"
                v-for="item in userAddresses"
                :key="item.id"
                :class="activeAddresses == item.id ? 'activeAddresses' : ''"
                @click="addToAddresses(item)"
              >
                <p>收货人：{{ item.receiver }}</p>
                <p>联系方式：{{ item.contact }}</p>
                <p>收货地址：{{ item.fullLocation }}</p>
              </div>
            </div>
          </div>
        </teleport>
      </div>
      <div class="add" @click="addTo">
        添加地址
        <teleport to="#app">
          <div class="mask" v-if="active">
            <div class="content">
              <h3>
                添加收货地址
                <close-outlined @click="active = false" />
              </h3>
              <a-form
                :model="formState"
                name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 16 }"
                autocomplete="off"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
              >
                <a-form-item
                  label="收货人："
                  name="receiver"
                  :rules="[{ required: true, message: '请填写收货人!' }]"
                >
                  <a-input
                    v-model:value="formState.receiver"
                    placeholder="请输入收货人"
                  />
                </a-form-item>

                <a-form-item
                  label="手机号："
                  name="contact"
                  :rules="[{ required: true, validator: contact }]"
                >
                  <a-input
                    v-model:value="formState.contact"
                    placeholder="请输入手机号"
                  />
                </a-form-item>
                <a-form-item
                  label="地区："
                  name="fullLocation"
                  :rules="[{ required: true, message: '请填写地区!' }]"
                >
                  <a-input
                    v-model:value="formState.fullLocation"
                    placeholder="请选择所在地区"
                  />
                </a-form-item>
                <a-form-item
                  label="详细地址："
                  name="address"
                  :rules="[{ required: true, message: '请填写详细地址!' }]"
                >
                  <a-input
                    v-model:value="formState.address"
                    placeholder="请输入详细地址"
                  />
                  <down-outlined @click="City = !City" />
                  <div class="CityData" v-show="City">
                    <ul>
                      <li
                        v-for="item in CityData"
                        :key="item.code"
                        @click="addressName(item, item.name)"
                      >
                        {{ item.name }}
                      </li>
                    </ul>
                  </div>
                </a-form-item>
                <a-form-item
                  label="邮政编码："
                  name="postalCode"
                  :rules="[{ required: true, validator: postalCode }]"
                >
                  <a-input
                    v-model:value="formState.postalCode"
                    placeholder="请输入邮政编码"
                  />
                </a-form-item>
                <a-form-item
                  label="地址标签："
                  name="addressTags"
                  :rules="[{ required: true, message: '请填写地址标签!' }]"
                >
                  <a-input
                    v-model:value="formState.addressTags"
                    placeholder="请输入地址标签"
                  />
                </a-form-item>
                <a-radio-group v-model:value="formState.isDefault">
                  <a-radio :value="0">设为默认地址</a-radio>
                  <a-radio :value="1">不设为默认地址</a-radio>
                </a-radio-group>
                <div class="button">
                  <a-button @click="active = false">取消</a-button>
                  <a-button type="primary" html-type="submit">确定</a-button>
                </div>
              </a-form>
            </div>
          </div>
        </teleport>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watch, watchEffect } from "vue";
import { memberOrderPre, memberAddress } from "@/api/member";
import { toRefs } from "@vueuse/shared";
import {
  message,
  FormItem,
  Form,
  Button,
  Input,
  RadioGroup,
  Radio,
} from "ant-design-vue";
import { CloseOutlined, DownOutlined } from "@ant-design/icons-vue";
import { getCityData } from "@/api/api";
import veeSchema from "@/utils/vee-validate-schema";
export default {
  name: "Address",
  components: {
    CloseOutlined,
    AFormItem: FormItem,
    AForm: Form,
    AButton: Button,
    AInput: Input,
    ARadio: Radio,
    ARadioGroup: RadioGroup,
    DownOutlined,
  },
  setup(props) {
    const active = ref(false);
    const addActive = ref(false);
    const activeAddresses = ref(null);
    const City = ref(false);
    const CityData = ref([]);
    const state = reactive({
      userAddresses: [],
      defaultAddresser: {},
    });
    const formState = reactive({
      receiver: "",
      contact: "",
      fullLocation: "",
      address: "",
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      postalCode: "",
      addressTags: "",
      isDefault: 0,
    });
    let contact = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入手机号!");
      } else {
        if (formState.contact !== "") {
          const mobile = veeSchema.mobile(formState.contact);
          if (mobile == true) {
            return Promise.resolve();
          } else {
            return Promise.reject(mobile);
          }
        }

        return Promise.resolve();
      }
    };
    let postalCode = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入邮政编码!");
      } else {
        if (value !== "") {
          const postalCode = veeSchema.postalCode(value);
          if (postalCode == true) {
            return Promise.resolve();
          } else {
            return Promise.reject(postalCode);
          }
        }

        return Promise.resolve();
      }
    };
    const onFinish = () => {
      //   console.log(formState);
      memberAddress(formState)
        .then((data) => {
          message.success("添加成功");
          getMemberOrderPre();
        })
        .catch(({ message }) => {
          message.error(message);
        });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const Modify = () => {
      if (state.defaultAddresser.receiver) active.value = true;
      else message.warning("请添加地址后在修改");
      formState.receiver = state.defaultAddresser.receiver;
      formState.contact = state.defaultAddresser.contact;
      formState.fullLocation = state.defaultAddresser.fullLocation;
      formState.address = state.defaultAddresser.address;
      formState.provinceCode = state.defaultAddresser.provinceCode;
      formState.cityCode = state.defaultAddresser.cityCode;
      formState.countyCode = state.defaultAddresser.countyCode;
      formState.postalCode = state.defaultAddresser.postalCode;
      formState.addressTags = state.defaultAddresser.addressTags;
      formState.isDefault = state.defaultAddresser.isDefault;
    };
    const addTo = () => {
      active.value = true;
      formState.receiver = "";
      formState.contact = "";
      formState.fullLocation = "";
      formState.address = "";
      formState.provinceCode = "";
      formState.cityCode = "";
      formState.countyCode = "";
      formState.postalCode = "";
      formState.addressTags = "";
      formState.isDefault = 0;
    };
    const getMemberOrderPre = () => {
      memberOrderPre()
        .then(({ result }) => {
          console.log(result);
          state.userAddresses = result.userAddresses;
          result.userAddresses.forEach((data) => {
            if (data.isDefault == 0) {
              state.defaultAddresser = data;
            }
          });
        })
        .catch((err) => {});
    };
    // 获取城市数据
    const getCity = async () => {
      let res;
      try {
        res = await getCityData();
      } catch (error) {
        console.log(error);
        return;
      }
      //console.log(res);
      CityData.value = res;
    };
    const addressName = (item, name) => {
      if (item.level == 0) {
        formState.address = "";
        formState.address += name + " ";
        formState.provinceCode = item.code;
        CityData.value = item.areaList;
      }
      if (item.level == 1) {
        formState.address += name + " ";
        formState.cityCode = item.code;
        CityData.value = item.areaList;
      }
      if (item.level == 2) {
        formState.address += name;
        formState.countyCode = item.code;
        City.value = false;
        getCity();
      }
    };
    const addToAddresses = (item) => {
      state.defaultAddresser = item;
    };
    watchEffect(() => {
      let defaultAddresser = state.defaultAddresser;
      activeAddresses.value = defaultAddresser.id;
      console.log(activeAddresses.value);
    });
    getMemberOrderPre();
    getCity();
    return {
      active,
      addActive,
      activeAddresses,
      contact,
      postalCode,
      Modify,
      addTo,
      City,
      CityData,
      addressName,
      formState,
      onFinish,
      onFinishFailed,
      addToAddresses,
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less" scoped>
.address {
  width: 100%;
  height: 150px;
  border: 1px solid #f5f5f5;
  margin-top: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .left {
    width: 800px;
    height: 100%;
    padding: 30px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .del {
      color: @xtxColor !important;
      height: 100%;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
      padding-right: 15px;
      display: block;
    }
    .noAddress {
      width: 600px;
      margin-top: 15px;
      margin-bottom: 20px;
      text-align: center;
      line-height: 150pc;
    }
  }
  .right {
    width: 420px;
    height: 100%;
    padding: 10px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .switch,
    .add {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      color: #666;
      appearance: none;
      border: none;
      outline: none;
      background: #fff;
      text-align: center;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  .content {
    width: 780px;
    height: 650px;
    border-radius: 4px;
    background-color: white;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: auto;
    h3 {
      font-size: 18px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      .anticon {
        float: right;
      }
    }
    .text {
      padding: 20px;
      border: 1px solid #f5f5f5;
      margin-bottom: 20px;
      cursor: pointer;
      &:hover {
        border: 1px solid @xtxColor;
      }
    }
    .activeAddresses {
      border: 1px solid @xtxColor;
    }
    .button {
      display: flex;
      justify-content: center;
      .ant-btn-primary {
        background: @xtxColor;
        border-color: @xtxColor;
        &:hover {
          background: rgba(39, 186, 155, 0.8);
          border-color: rgba(39, 186, 155, 0.8);
        }
      }
    }
    .ant-btn:first-child {
      margin-right: 100px;
      &:hover {
        color: rgba(39, 186, 155, 0.8);
        border-color: rgba(39, 186, 155, 0.8);
      }
    }
  }
}
/deep/.ant-form {
  .ant-form-item-control-input-content {
    position: relative;
    .anticon {
      transform: translateX(-25px);
      cursor: pointer;
    }

    .CityData {
      width: 532px;
      height: 292px;
      background-color: white;
      position: absolute;
      top: 52px;
      border: 1px solid #999;
      padding: 5px;
      z-index: 2;
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 130px;
          height: 30px;
          border-radius: 5px;
          line-height: 30px;
          text-align: center;
          &:hover {
            background-color: #f5f5f5;
          }
        }
      }
    }
  }
  .ant-radio-group {
    display: flex;
    justify-content: center;
    .ant-radio-wrapper {
      margin-bottom: 20px;
    }
  }
  .ant-input {
    width: 320px;
    height: 50px;
    &:hover {
      border-color: @xtxColor;
    }
    &:focus {
      border-color: @xtxColor;
    }
  }
}
</style>
