<script setup>
import { ElForm, ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';

const loading = ref(false);
const isCapslock = ref(false); 
const passwordVisible = ref(false);
const loginFormRef = ref(null);

const loginData = reactive({
  username: '',
  password: ''
});

const loginRules = reactive({
  username: [
    {
      required: true,
      message: 'ユーザー名を入力してください',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: 'パスワードを入力してください',
      trigger: 'blur'
    }
  ]
});

function onEye() {
  passwordVisible.value = !passwordVisible.value;
}

function checkCapslock(e) {
  const { key } = e;
  isCapslock.value = key.length === 1 && key >= 'A' && key <= 'Z';
}

// Không gọi API, chỉ hiển thị thông báo giả lập
function handleLogin() {
  if (!loginFormRef.value) return;

  loginFormRef.value.validate((valid) => {
    if (valid) {
      console.log('Username:', loginData.username);
      console.log('Password:', loginData.password);
      if(ElMessage.success('ログインボタンが押されました')){
        localStorage.setItem('userLogin', JSON.stringify(loginData));
        window.location.href = 'http://localhost:5173/user/user_management';
      }
    
    } else {
      ElMessage.error('入力内容を確認してください');
    }
  });
}

onMounted(() => {
  const userLogin = localStorage.getItem('userLogin');
  if (userLogin) {
    Object.assign(loginData, JSON.parse(userLogin));
  }
});
</script>

<template>
    <div class="loginbg">
        <div class="login">
            <div class="login-logo">
                <img src="@/assets/images/UZmanager_logo.svg" alt="logo" />
            </div>
            <el-form
                ref="loginFormRef"
                :model="loginData"
                :rules="loginRules"
                label-position="top"
                style="max-width: 496px"
            >
                <el-form-item prop="username" label="ユーザー名">
                    <el-input
                        v-model="loginData.username"
                        placeholder="ユーザー名を入力"
                    />
                </el-form-item>
                <el-form-item prop="password" label="パスワード">
                    <el-input
                        v-model="loginData.password"
                        :type="passwordVisible ? 'text' : 'password'"
                        placeholder="パスワードを入力"
                        @keyup="checkCapslock"
                        @keyup.enter="handleLogin"
                    >
                        <template #suffix>
                            <img 
                                v-if="passwordVisible"
                                src="@/assets/images/eye-open.svg"
                                class="eye"
                                alt=""               
                                @click="onEye"     
                            />
                            <img 
                                v-else
                                src="@/assets/images/eye-close.svg"
                                class="eye"
                                alt=""
                                @click="onEye"
                            />
                        </template>
                    </el-input>
                </el-form-item>
                <el-checkbox 
                    v-model="loginData.checkedFlag"
                    label="ログイン状態を保持する"
                    class="logincheck"
                />
                <el-button 
                    type="primary"
                    class="h-[48px] w-full relative text-[18px]"
                    @click="handleLogin"
                >
                    ログイン
                </el-button>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login {
  max-width: 496px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
}

.login .el-form-item {
  margin-bottom: 20px;
}

.login .el-form-item__label {
  font-size: 14px;
  font-weight: 500;
  color: #999;
}

.login .login-logo {
  margin-bottom: 24px;
}

.login .login-logo img {
  margin: auto;
}

.login .logincheck {
  margin-bottom: 38px;
  height: 22px;
}

.login .eye {
  cursor: pointer;
}

.loginbg {
  background-color: #f9fafa;
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>