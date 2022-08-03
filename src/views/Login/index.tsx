import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Form, Input, message } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import { LoginBgm } from '@/assets'
import styles from './index.module.less'

export default defineComponent({
  name: 'Login',
  setup() {
    const router = useRouter()

    const state = reactive({
      loading: false,
      loginForm: {
        loginName: undefined,
        loginPw: undefined,
      },
    })

    const handleLogin = () => {
      state.loading = true
      message.success('登录成功！', 1, () => {
        state.loading = false
        router.push('/myself')
      })
    }

    // 登录
    const handleFinish = () => {
      const { loginName, loginPw } = state.loginForm
      if (loginName === '岳磊' && loginPw === '123') {
        window.localStorage.setItem('userName', '岳磊')
        handleLogin()
      } else if (loginName === 'liuteng' && loginPw === '123123666') {
        window.localStorage.setItem('userName', '刘腾')
        handleLogin()
      } else {
        message.error('用户名或密码错误！')
      }
    }

    return () => (
      <div class={styles.page_warpper}>
        <img src={LoginBgm} class={styles.login_bgm} />
        <div class={styles.warpper}>
          <Form
            layout="horizontal"
            model={state.loginForm}
            onFinish={handleFinish}
            wrapperCol={{ span: 24 }}
          >
            <Form.Item
              name="loginName"
              rules={[{ required: true, message: '用户名不能为空' }]}
            >
              <Input
                prefix={<UserOutlined />}
                v-model={[state.loginForm.loginName, 'value']}
                size="large"
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="loginPw"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                v-model={[state.loginForm.loginPw, 'value']}
                type="loginPw"
                size="large"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                block
                type="primary"
                htmlType="submit"
                loading={state.loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  },
})
