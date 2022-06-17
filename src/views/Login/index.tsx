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
        loginName: 'zhangsan',
        loginPw: '',
      },
    })

    // 登录
    const handleFinish = () => {
      const { loginName, loginPw } = state.loginForm
      if (loginName === 'zhangsan' && loginPw === 'zhangsan') {
        state.loading = true
        setTimeout(() => {
          state.loading = false
          message.success('登录成功！', 1, () => {
            router.push('/myself')
          })
        }, 1000)
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
