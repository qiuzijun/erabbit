<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>

    <div class="form">
      <template v-if="!isMsgLogin">
        <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
        >
          <a-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, validator: username }]"
          >
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, validator: password }]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <div class="login-form-wrap">
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember"
                >我已同意《隐私条款》《服务条款》</a-checkbox
              >
            </a-form-item>
          </div>

          <a-form-item>
            <a-button
              :disabled="disabled"
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </template>
      <template v-else>
        <a-form
          :model="formState_1"
          name="normal_login"
          class="login-form"
          @finish="onFinish_1"
        >
          <a-form-item
            label="手机号"
            name="mobile"
            :rules="[{ required: true, validator: mobile }]"
          >
            <a-input v-model:value="formState_1.mobile">
              <template #prefix>
                <TabletOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="验证码"
            name="code"
            :rules="[{ required: true, validator: code }]"
          >
            <a-input v-model:value="formState_1.code">
              <template #prefix>
                <SafetyOutlined class="site-form-item-icon" />
              </template>
            </a-input>
            <a-button type="primary" v-if="primary == 0" @click="sendOutCode"
              >发送验证码</a-button
            >
            <a-button type="primary" loading v-else-if="primary == 1"
              >Loading</a-button
            >
            <a-button type="primary" v-else>{{ time }}秒后重新发送</a-button>
          </a-form-item>

          <div class="login-form-wrap">
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState_1.remember"
                >我已同意《隐私条款》《服务条款》</a-checkbox
              >
            </a-form-item>
          </div>

          <a-form-item>
            <a-button
              :disabled="disabled_1"
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </template>
    </div>
    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, computed, watch } from "vue";
import {
  Form,
  FormItem,
  Input,
  InputPassword,
  Button,
  Checkbox,
  message,
} from "ant-design-vue";
import {
  UserOutlined,
  LockOutlined,
  SafetyOutlined,
  TabletOutlined,
} from "@ant-design/icons-vue";
import veeSchema from "@/utils/vee-validate-schema";
import { userAccountLogin } from "@/api/user.js";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "LoginForm",
  components: {
    AForm: Form,
    AFormItem: FormItem,
    AInput: Input,
    AInputPassword: InputPassword,
    AButton: Button,
    ACheckbox: Checkbox,
    UserOutlined,
    LockOutlined,
    SafetyOutlined,
    TabletOutlined,
  },

  setup() {
    // 是否短信登录
    const isMsgLogin = ref(false);
    const primary = ref(0);
    const time = ref(60);
    const formState = reactive({
      username: "",
      password: "",
      remember: true,
    });
    const formState_1 = reactive({
      mobile: "",
      code: "",
      remember: true,
    });
    let username = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入用户名!");
      } else {
        if (formState.username !== "") {
          const account = veeSchema.account(formState.username);
          if (account == true) {
            return Promise.resolve();
          } else {
            return Promise.reject(account);
          }
        }

        return Promise.resolve();
      }
    };
    let password = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入密码!");
      } else {
        if (formState.password !== "") {
          const password = veeSchema.password(formState.password);
          if (password == true) {
            return Promise.resolve();
          } else {
            return Promise.reject(password);
          }
        }

        return Promise.resolve();
      }
    };
    let mobile = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入手机号!");
      } else {
        if (formState_1.mobile !== "") {
          const mobile = veeSchema.mobile(formState_1.mobile);
          if (mobile == true) {
            return Promise.resolve();
          } else {
            return Promise.reject(mobile);
          }
        }

        return Promise.resolve();
      }
    };
    let code = async (_rule, value) => {
      if (value === "") {
        return Promise.reject("请输入验证码!");
      } else {
        if (formState_1.code !== "") {
          const code = veeSchema.code(formState_1.code);
          if (code == true) {
            return Promise.resolve();
          } else {
            return Promise.reject(code);
          }
        }

        return Promise.resolve();
      }
    };
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    // 账号密码登录
    const onFinish = (values) => {
      if (!values.remember) {
        message.warning("请勾选《隐私条款》《服务条款》");
      } else {
        console.log("Success:", values);
        userAccountLogin({
          account: values.username,
          password: values.password,
        })
          .then(({ result }) => {
            // console.log(result);
            // 1. 存储信息
            const { id, account, nickname, avatar, token, mobile } = result;
            store.commit("user/setUser", {
              id,
              account,
              nickname,
              avatar,
              token,
              mobile,
            });
            // 2. 提示
            message.success("登录成功");
            // 3. 跳转
            router.push(route.query.redirectUrl || "/");
          })
          .catch((err) => {
            message.error(`${err}登录失败`);
          });
      }
    };
    const onFinish_1 = (values) => {
      if (!values.remember) message.warning("请勾选《隐私条款》《服务条款》");
      else console.log("Success:", values);
    };

    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    const disabled_1 = computed(() => {
      return !(formState_1.mobile && formState_1.code);
    });
    const sendOutCode = () => {
      primary.value = 1;
      setTimeout(() => {
        primary.value = 2;
      }, 1000);
      const timer = setInterval(() => {
        time.value--;
      }, 1000);
      watch(time, (newVal) => {
        if (newVal == 0) {
          clearInterval(timer);
          primary.value = 0;
          time.value = 60;
        }
      });
    };
    return {
      isMsgLogin,
      formState,
      formState_1,
      username,
      password,
      mobile,
      code,
      onFinish,
      onFinish_1,
      disabled,
      disabled_1,
      sendOutCode,
      time,
      primary,
    };
  },
};
</script>
<style lang="less" scoped>
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    .login-form-button {
      width: 100%;
    }
    /deep/.ant-form-item-control-input-content {
      display: flex;
      .ant-btn {
        margin-left: 15px;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
