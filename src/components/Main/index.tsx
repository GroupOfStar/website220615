import { defineComponent, reactive, watch, computed } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
import {
  Menu,
  Avatar,
  Layout,
  Dropdown,
  Modal,
  Form,
  Input,
  Alert,
  message,
} from 'ant-design-vue'
import {
  HomeOutlined,
  LogoutOutlined,
  FormOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  ReadOutlined,
  SettingOutlined,
  UserOutlined,
  LayoutOutlined,
} from '@ant-design/icons-vue'
import Logo from '@/assets/logo.png'
import { useStore } from '@/store'
import wxRequest from '@/utils/wxRequest'
import styles from './index.module.less'

interface IState {
  /** 左侧菜单收缩展开状态 */
  collapsed: boolean
  /** 当前选中的菜单 */
  currentMenu: string[]
  /** 修改密码弹窗visible */
  pwVisible: boolean
  /** 修改密码loading */
  pwLoading: boolean
  /** 修改密码弹窗form */
  pwForm: {
    /** 用户名 */
    userName: string
    /** 旧密码 */
    oldPassword: string
    /** 新密码 */
    newPassword: string
    /** 确认密码 */
    confirmPassword: string
  }
}

export default defineComponent(function Main() {
  const store = useStore()
  const router = useRouter()
  const route = useRoute()

  const firstLoginFlag = computed(() => store.state.userInfo.firstLoginFlag)

  const state = reactive<IState>({
    collapsed: false,
    currentMenu: [],
    pwVisible: firstLoginFlag.value === '0',
    pwLoading: false,
    pwForm: {
      userName: store.state.userInfo.userName || '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  /** 效验 */
  const rulesRef = reactive({
    userName: [{ required: true, message: '不能为空！' }],
    oldPassword: [{ required: true, message: '不能为空！', trigger: 'blur' }],
    newPassword: [{ required: true, message: '不能为空！', trigger: 'blur' }],
    confirmPassword: [
      { required: true, message: '不能为空！', trigger: 'blur' },
      {
        validator: (_: object, value: string) => {
          if (value === state.pwForm.newPassword) {
            return Promise.resolve()
          } else {
            return Promise.reject(new Error('两次输入的密码不一致'))
          }
        },
        trigger: 'blur',
      },
    ],
  })

  const { resetFields, validate, validateInfos } = Form.useForm(
    state.pwForm,
    rulesRef
  )

  /** 隐藏修改密码弹窗 */
  const onCancelPass = () => {
    resetFields()
    state.pwVisible = false
  }

  /** 修改密码 */
  const onConfirmPass = () => {
    validate().then((feilds: any) => {
      for (let [k, v] of Object.entries<string>(feilds)) {
        feilds[k] = k === 'userName' ? v : btoa(v)
      }
      state.pwLoading = true
      wxRequest
        .callFunction<WxResponseDefine>({
          name: 'wx-digital-manage-web',
          data: { type: 'updatePassword', payload: feilds },
        })
        .then(res => {
          const { code, msg } = res.result
          if (code === 0) {
            message.success('密码修改成功!')
            localStorage.clear()
            onCancelPass()
            router.push('/')
          } else {
            message.error(msg)
          }
        })
        .finally(() => (state.pwLoading = false))
    })
  }

  // 切换菜单
  const onMenuChange = (item: { key: string }) => {
    router.push(`/main/${item.key}`)
  }

  // 退出登录
  const logout = () => {
    localStorage.clear()
    router.push('/')
  }

  watch(
    () => route.fullPath,
    newValue => {
      const currentRouteExp = (newValue || '').match(/\/main\/(\S[^\?]*)/)
      const currentPage = currentRouteExp ? currentRouteExp[1] : 'users'
      state.currentMenu = [currentPage]
    },
    {
      immediate: true,
    }
  )

  return () => (
    <Layout class={styles.layout_warpper}>
      <Layout.Sider
        v-model={[state.collapsed, 'collapsed']}
        theme="dark"
        breakpoint="xl"
      >
        <div class={styles.logo_warpper} onClick={() => router.push('/main/')}>
          <img class={styles.logo_img} src={Logo} />
          <div class={styles.logo_title}>数字管家后台</div>
        </div>
        <Menu
          v-model={[state.currentMenu, 'selectedKeys']}
          theme="dark"
          mode="inline"
          onClick={onMenuChange}
        >
          <Menu.Item key="project">
            <HomeOutlined />
            <span>首页产品</span>
          </Menu.Item>
          <Menu.Item key="example">
            <AppstoreOutlined />
            <span>案例中心</span>
          </Menu.Item>
          <Menu.Item key="solution" disabled>
            <LayoutOutlined />
            <span>解决方案</span>
          </Menu.Item>
          <Menu.Item key="dict">
            <ReadOutlined />
            <span>字典管理</span>
          </Menu.Item>
          <Menu.Item key="setting">
            <SettingOutlined />
            <span>系统设置</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>

      <Layout>
        <Layout.Header class={styles.header_warpper}>
          <div class={styles.left_header}>
            {state.collapsed ? (
              <MenuUnfoldOutlined
                onClick={() => (state.collapsed = !state.collapsed)}
              />
            ) : (
              <MenuFoldOutlined
                onClick={() => (state.collapsed = !state.collapsed)}
              />
            )}
          </div>
          <div class={styles.right_header}>
            <Dropdown placement="bottomRight">
              {{
                default: () => (
                  <span class={styles.account_avatar}>
                    <Avatar
                      size="small"
                      class={styles.right_header_avatar}
                      icon={<UserOutlined />}
                    />
                    <span>{store.state.userInfo.name}</span>
                  </span>
                ),
                overlay: () => (
                  <Menu mode="horizontal">
                    <Menu.Item
                      key="updatePassword"
                      onClick={() => (state.pwVisible = true)}
                    >
                      <FormOutlined />
                      修改密码
                    </Menu.Item>
                    <Menu.Item key="logout" onClick={logout}>
                      <LogoutOutlined />
                      退出系统
                    </Menu.Item>
                  </Menu>
                ),
              }}
            </Dropdown>
          </div>

          {/* 修改密码 */}
          <Modal
            v-model={[state.pwVisible, 'visible']}
            title="修改密码"
            onOk={onConfirmPass}
            onCancel={onCancelPass}
            cancelButtonProps={{ disabled: firstLoginFlag.value === '0' }}
            maskClosable={false}
            keyboard={false}
            closable={firstLoginFlag.value !== '0'}
            confirmLoading={state.pwLoading}
          >
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
              {firstLoginFlag.value === '0' && (
                <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                  <Alert
                    message={
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        请先修改初始密码！
                        <a onClick={() => router.push('/')}>返回首页</a>
                      </div>
                    }
                    banner
                  />
                </Form.Item>
              )}
              <Form.Item label="旧密码" {...validateInfos.oldPassword}>
                <Input.Password
                  type="password"
                  v-model={[state.pwForm.oldPassword, 'value']}
                  placeholder="请输入..."
                  allowClear
                />
              </Form.Item>

              <Form.Item label="新密码" {...validateInfos.newPassword}>
                <Input.Password
                  v-model={[state.pwForm.newPassword, 'value']}
                  placeholder="请输入..."
                  allowClear
                />
              </Form.Item>

              <Form.Item label="确认密码" {...validateInfos.confirmPassword}>
                <Input.Password
                  v-model={[state.pwForm.confirmPassword, 'value']}
                  placeholder="请输入..."
                  allowClear
                />
              </Form.Item>
            </Form>
          </Modal>
        </Layout.Header>

        <Layout.Content class={styles.content_warpper}>
          <RouterView class={styles.content}></RouterView>
        </Layout.Content>

        <Layout.Footer class={styles.footer_warpper}>
          <div class={styles.left_dsc}>
            &copy; 2001-2021 版权所有 软通动力信息技术（集团）股份有限公司
            系统适用于Chrome浏览器
          </div>
          <div class={styles.right_dsc}>法律声明 | 隐私政策</div>
        </Layout.Footer>
      </Layout>
    </Layout>
  )
})
