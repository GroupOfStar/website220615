import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { Button, Card, Col, Form, Input, Menu, Row, Tag } from 'ant-design-vue'
import { SendOutlined, MoreOutlined } from '@ant-design/icons-vue'
import Logo from '@/assets/logo.png'
import Meeting from '@/assets/meeting.jpg'
import styles from './index.module.less'

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

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter()

    const store = useStore()

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
      const payload = {
        loginId: state.loginForm.loginId,
        password: btoa(state.loginForm.password),
      }
      state.loading = true
      setTimeout(() => {
        state.loading = false
      }, 1000)
    }

    return () => (
      <div class={styles.page_warpper}>
        {/* 页头 */}
        <div class={styles.header_warper}>
          <div class={styles.header_menu_warper}>
            <div class={styles.header}>
              <div class={styles.logo_warper}>
                <img class={styles.logo_img} src={Logo}></img>
              </div>

              <div class={styles.login_warper}>
                <Input.Search
                  v-model={[state.searchText, 'value']}
                  placeholder="请输入..."
                  onSearch={onSearch}
                  // style="width: 148px; margin-right: 16px; background-color: unset;"
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
                  <Card
                    size="small"
                    bordered={false}
                    title={
                      <>
                        <SendOutlined class={styles.arrow_icon} />
                        通知公告
                      </>
                    }
                    extra={
                      <a href="#">
                        更多
                        <MoreOutlined />
                      </a>
                    }
                  >
                    <ul class={styles.notice_content}>
                      {Notices.map(item => (
                        <li key={item.id}>
                          <div class={styles.notice_item_warper}>
                            <div class={styles.notice_item_warper_title}>
                              {item.title}
                            </div>
                            <div class={styles.notice_item_warper_time}>
                              {item.time}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Col>
              </Row>
            </div>

            <Row gutter={[12, 12]}>
              {/* 分行聚焦 */}
              <Col span={12}>
                <Card
                  size="small"
                  bordered={false}
                  title={
                    <>
                      <SendOutlined class={styles.arrow_icon} />
                      分行聚焦
                    </>
                  }
                  extra={
                    <a href="#">
                      更多
                      <MoreOutlined />
                    </a>
                  }
                >
                  <ul class={styles.notice_content}>
                    {Notices.map(item => (
                      <li key={item.id}>
                        <div class={styles.notice_item_warper}>
                          <div class={styles.notice_item_warper_title}>
                            {item.title}
                          </div>
                          <div class={styles.notice_item_warper_time}>
                            {item.time}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>

              {/* 领导讲话 */}
              <Col span={12}>
                <Card
                  size="small"
                  bordered={false}
                  title={
                    <>
                      <SendOutlined class={styles.arrow_icon} />
                      领导讲话
                    </>
                  }
                  extra={
                    <a href="#">
                      更多
                      <MoreOutlined />
                    </a>
                  }
                >
                  <ul class={styles.notice_content}>
                    {Notices.map(item => (
                      <li key={item.id}>
                        <div class={styles.notice_item_warper}>
                          <div class={styles.notice_item_warper_title}>
                            {item.title}
                          </div>
                          <div class={styles.notice_item_warper_time}>
                            {item.time}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>

              {/* 公司市场营销简报 */}
              <Col span={12}>
                <Card
                  size="small"
                  bordered={false}
                  title={
                    <>
                      <SendOutlined class={styles.arrow_icon} />
                      公司市场营销简报
                    </>
                  }
                  extra={
                    <a href="#">
                      更多
                      <MoreOutlined />
                    </a>
                  }
                >
                  <ul class={styles.notice_content}>
                    {Notices.map(item => (
                      <li key={item.id}>
                        <div class={styles.notice_item_warper}>
                          <div class={styles.notice_item_warper_title}>
                            {item.title}
                          </div>
                          <div class={styles.notice_item_warper_time}>
                            {item.time}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>

              {/* 零售市场营销简报 */}
              <Col span={12}>
                <Card
                  size="small"
                  bordered={false}
                  title={
                    <>
                      <SendOutlined class={styles.arrow_icon} />
                      零售市场营销简报
                    </>
                  }
                  extra={
                    <a href="#">
                      更多
                      <MoreOutlined />
                    </a>
                  }
                >
                  <ul class={styles.notice_content}>
                    {Notices.map(item => (
                      <li key={item.id}>
                        <div class={styles.notice_item_warper}>
                          <div class={styles.notice_item_warper_title}>
                            {item.title}
                          </div>
                          <div class={styles.notice_item_warper_time}>
                            {item.time}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* 页脚 */}
        <div class={styles.footer}>
          <div class={styles.links}>
            <a>帮助</a>
            <a>隐私</a>
            <a>条款</a>
          </div>
          <div class={styles.copyright}>
            Copyright &copy; 2001-2021 版权所有
            软通动力信息技术（集团）股份有限公司
          </div>
        </div>
      </div>
    )
  },
})
