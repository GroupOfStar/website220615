import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Button, Card, Col, Form, Input, Menu, Row, Tag } from 'ant-design-vue'
import NewsCard from './NewsCard'
import Footer from '@/components/Footer'
import Logo from '@/assets/logo.png'
import Meeting from '@/assets/meeting.jpg'
import styles from './index.module.less'
import ColorCard from './ColorCard'

const Notices = [
  { id: 1, title: '关于参加总行警示教育大会的通知', time: '2022.09.06' },
  {
    id: 2,
    title: '关于展开屡查屡犯问题专项治理工作的通知',
    time: '2022.09.06',
  },
  {
    id: 3,
    title: '关于做好2022年6月末评级覆盖率工作的通知',
    time: '2022.09.07',
  },
  {
    id: 4,
    title: '关于分行团委、工会组织参加中信集团2022年夏...',
    time: '2022.09.07',
  },
  {
    id: 5,
    title: '关于分行业加强企业疫情防控保障生产经营的通知',
    time: '2022.09.08',
  },
  {
    id: 6,
    title: '关于做好2022年6月末评级覆盖率工作的通知',
    time: '2022.09.07',
  },
  {
    id: 7,
    title: '关于分行团委、工会组织参加中信集团2022年夏...',
    time: '2022.09.07',
  },
  {
    id: 8,
    title: '关于分行业加强企业疫情防控保障生产经营的通知',
    time: '2022.09.08',
  },
  {
    id: 9,
    title: '关于分行业加强企业疫情防控保障生产经营的通知',
    time: '2022.09.08',
  },
]

// 建党工作
const partWorks = [
  { id: 1, title: '机构客户部党支部联合零售银行', time: '2022.09.08' },
  { id: 2, title: '分行办公室党支部联合警民党建', time: '2022.09.08' },
]

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter()

    const state = reactive({
      loading: false,
      searchText: undefined,
      loginForm: {
        loginId: '',
        password: '',
      },
      currentMenu: ['1'],
    })

    // 搜索
    const onSearch = (val?: string) => {
      console.log('val :>> ', val)
    }

    // 登录
    const handleFinish = () => {
      const { loginId, password } = state.loginForm
      if (loginId === 'zhangsan' && password === 'zhangsan')
        state.loading = true
      setTimeout(() => {
        state.loading = false
        router.push('/Myself')
      }, 800)
    }

    return () => (
      <div class={styles.page_warpper}>
        {/* 页头 */}
        <div class={styles.header_warper}>
          <div class={styles.header_menu_warper}>
            <div class={styles.header}>
              <div class={styles.logo_warper} onClick={() => router.push('/')}>
                <img class={styles.logo_img} src={Logo}></img>
              </div>

              <div class={styles.login_warper}>
                <Input.Search
                  v-model={[state.searchText, 'value']}
                  placeholder="请输入..."
                  onSearch={onSearch}
                  class={[styles.input, styles.search]}
                />
                <Form
                  layout="inline"
                  model={state.loginForm}
                  onFinish={handleFinish}
                >
                  <Form.Item name="loginId">
                    <Input
                      v-model={[state.loginForm.loginId, 'value']}
                      placeholder="用户名"
                      class={styles.input}
                    />
                  </Form.Item>
                  <Form.Item name="password">
                    <Input.Password
                      v-model={[state.loginForm.password, 'value']}
                      type="password"
                      placeholder="密码"
                      class={styles.input}
                    />
                  </Form.Item>
                  <Form.Item style={{ marginRight: 0 }}>
                    <Button
                      block
                      type="primary"
                      htmlType="submit"
                      loading={state.loading}
                    >
                      请登录
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <Menu
              v-model={[state.currentMenu, 'selectedKeys']}
              mode="horizontal"
              theme="dark"
              class={styles.menu_warper}
            >
              <Menu.Item key="1">首页</Menu.Item>
              <Menu.Item key="2">部门主页</Menu.Item>
              <Menu.Item key="3">分行链接</Menu.Item>
              <Menu.Item key="4">相关网站</Menu.Item>
              <Menu.Item key="5">内容管理</Menu.Item>
              <Menu.Item key="6">总行网站</Menu.Item>
              <Menu.Item key="7">旧版内联网</Menu.Item>
            </Menu>
          </div>
        </div>

        {/* 页体 */}
        <div class={styles.body_warper}>
          <div class={styles.banner_img} />
          <div class={styles.body}>
            <div class={styles.first_body_content}>
              <Row gutter={24}>
                <Col span={24}>
                  <Card bordered={false}>
                    <Tag>领导分工</Tag>
                    <Tag>领导动态</Tag>
                    <Tag>行长信箱</Tag>
                    <Tag>人事任免</Tag>
                    <Tag>大事记</Tag>
                    <Tag>利率管理</Tag>
                    <Tag>通讯录</Tag>
                  </Card>
                </Col>
                <Col span={12}>
                  <img src={Meeting} alt="会议" class={styles.metting_img} />
                </Col>

                {/* 通知公告 */}
                <Col span={12}>
                  <NewsCard title="通知公告" dataSource={Notices} />
                </Col>
              </Row>
            </div>

            <Row gutter={[12, 12]}>
              {/* 分行聚焦 */}
              <Col span={12}>
                <NewsCard title="分行聚焦" dataSource={Notices} />
              </Col>

              {/* 领导讲话 */}
              <Col span={12}>
                <NewsCard title="领导讲话" dataSource={Notices} />
              </Col>

              {/* 公司市场营销简报 */}
              <Col span={12}>
                <NewsCard title="公司市场营销简报" dataSource={Notices} />
              </Col>

              {/* 零售市场营销简报 */}
              <Col span={12}>
                <NewsCard title="零售市场营销简报" dataSource={Notices} />
              </Col>
            </Row>

            <div class={styles.color_card_warper}>
              <ColorCard
                title="建党工作"
                dataSource={partWorks}
                bgColor="#a25f69"
              />
              <ColorCard
                title="光荣榜"
                dataSource={partWorks}
                bgColor="#9E834B"
              />
              <ColorCard
                title="规章制度"
                dataSource={partWorks}
                bgColor="#435FA0"
              />
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <Footer />
      </div>
    )
  },
})
