import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import {
  Button,
  Card,
  Carousel,
  Col,
  Form,
  Input,
  Menu,
  message,
  Row,
  Tag,
} from 'ant-design-vue'
import { MoreOutlined } from '@ant-design/icons-vue'
import List from '@/components/List'
import { default as StCard } from '@/components/Card'
import Footer from '@/components/Footer'
import ColorCard from './ColorCard'
import {
  LogoDark,
  Meeting,
  Jiangzhuang01,
  Jiangzhuang02,
  Zonghanghuiyi01,
  Zonghanghuiyi02,
} from '@/assets'
import {
  branchFocus,
  companyBriefing,
  dynamic1,
  dynamic2,
  honourRoll,
  leaderSpeech,
  notices,
  partyBuilding,
  regulations,
  retailBriefing,
  salesTop,
  supervisionItems,
} from './data'
import styles from './index.module.less'

/** 合规动态区域TabList */
const dynamicTabList = [
  { key: '1', tab: '合规动态' },
  { key: '2', tab: '培训专栏' },
  { key: '3', tab: '新闻广角' },
  { key: '4', tab: '服务品质与文明办公' },
]

/** 总行图片新闻 */
const photoNews = [
  { key: '1', tab: '总行图片新闻' },
  { key: '2', tab: '总行通知公告' },
  { key: '3', tab: '总行领导讲话' },
  { key: '4', tab: '总行重要文件' },
  { key: '5', tab: '总行工作动态' },
  { key: '6', tab: '市场营销简报' },
]

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter()

    const state = reactive({
      loading: false,
      searchText: undefined,
      loginForm: {
        userName: undefined,
        password: undefined,
      },
      currentMenu: ['1'],
      dynamicCurrentTab: '1',
      photoCurrentTab: '1',
    })

    // 搜索
    const onSearch = (val?: string) => {
      console.log('val :>> ', val)
    }

    const handleLogin = () => {
      state.loading = true
      message.success('登录成功！', 1, () => {
        state.loading = false
        router.push('/myself')
      })
    }

    // 登录
    const handleFinish = () => {
      const userName = (state.loginForm.userName || '').trim()
      const password = (state.loginForm.password || '').trim()
      if (userName === 'yuelei' && password === 'yuelei888') {
        window.localStorage.setItem('userName', '岳磊')
        handleLogin()
      } else if (userName === 'liuteng' && password === 'liuteng666') {
        window.localStorage.setItem('userName', '刘腾')
        handleLogin()
      } else {
        message.error('用户名或密码错误！')
      }
    }

    return () => (
      <div class={styles.page_warpper}>
        {/* 页头 */}
        <div class={styles.header_warper}>
          <div class={styles.header_menu_warper}>
            <div class={styles.header}>
              <div class={styles.logo_warper} onClick={() => router.push('/')}>
                <img class={styles.logo_img} src={LogoDark}></img>
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
                  <Form.Item name="userName">
                    <Input
                      v-model={[state.loginForm.userName, 'value']}
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
          {/* banner */}
          <div class={styles.banner_img} />

          <div class={styles.body}>
            <div class={styles.first_body_content}>
              <Row gutter={[12, 24]}>
                <Col span={24}>
                  <Tag>领导分工</Tag>
                  <Tag>领导动态</Tag>
                  <Tag>行长信箱</Tag>
                  <Tag>人事任免</Tag>
                  <Tag>大事记</Tag>
                  <Tag>利率管理</Tag>
                  <Tag>通讯录</Tag>
                </Col>

                {/* 会议图片 */}
                <Col span={12}>
                  <Carousel autoplay>
                    <img src={Meeting} alt="会议" class={styles.meeting_img} />
                    <img src={Meeting} alt="会议" class={styles.meeting_img} />
                    <img src={Meeting} alt="会议" class={styles.meeting_img} />
                  </Carousel>
                </Col>

                {/* 通知公告 */}
                <Col span={12}>
                  <StCard title="通知公告" bordered>
                    <List dataSource={notices} />
                  </StCard>
                </Col>
              </Row>
            </div>

            <Row gutter={[12, 12]}>
              {/* 分行聚焦 */}
              <Col span={12}>
                <StCard title="分行聚焦">
                  <List dataSource={branchFocus} />
                </StCard>
              </Col>

              {/* 领导讲话 */}
              <Col span={12}>
                <StCard title="领导讲话">
                  <List dataSource={leaderSpeech} />
                </StCard>
              </Col>

              {/* 公司市场营销简报 */}
              <Col span={12}>
                <StCard title="公司市场营销简报">
                  <List dataSource={companyBriefing} />
                </StCard>
              </Col>

              {/* 零售市场营销简报 */}
              <Col span={12}>
                <StCard title="零售市场营销简报">
                  <List dataSource={retailBriefing} />
                </StCard>
              </Col>
              <Col span={24}>
                <div class={styles.color_card_warper}>
                  <ColorCard
                    title="党建工作"
                    dataSource={partyBuilding}
                    bgColor="#a25f69"
                  />
                  <ColorCard
                    title="光荣榜"
                    dataSource={honourRoll}
                    bgColor="#9E834B"
                  />
                  <ColorCard
                    title="规章制度"
                    dataSource={regulations}
                    bgColor="#435FA0"
                  />
                </div>
              </Col>

              {/* 业绩榜 */}
              <Col span={12}>
                <StCard title="业绩榜">
                  <List dataSource={salesTop} />
                </StCard>
              </Col>

              {/* 督办事项 */}
              <Col span={12}>
                <StCard title="督办事项">
                  <List dataSource={supervisionItems} />
                </StCard>
              </Col>

              {/* 合规动态 */}
              <Col span={24}>
                <Card
                  size="small"
                  bordered={false}
                  tabList={dynamicTabList}
                  activeTabKey={state.dynamicCurrentTab}
                  onTabChange={key => (state.dynamicCurrentTab = key)}
                  tabBarExtraContent={
                    <a href="#">
                      更多
                      <MoreOutlined />
                    </a>
                  }
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <List dataSource={dynamic1} />
                    </Col>
                    <Col span={12}>
                      <List dataSource={dynamic2} />
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* 荣誉之路 */}
              <Col span={24}>
                <StCard title="荣誉之路">
                  <div class={styles.honors_warper}>
                    {Array.from({ length: 5 }, (_i, index) => (
                      <Card
                        hoverable
                        key={index}
                        bordered={false}
                        cover={
                          <img
                            src={
                              index % 2 === 0 ? Jiangzhuang01 : Jiangzhuang02
                            }
                          />
                        }
                        style="width: 240px"
                      >
                        <Card.Meta title="2020年度云南省最佳综合" />
                      </Card>
                    ))}
                  </div>
                </StCard>
              </Col>

              {/* 总行图片新闻 */}
              <Col span={24}>
                <Card
                  size="small"
                  bordered={false}
                  tabList={photoNews}
                  activeTabKey={state.photoCurrentTab}
                  onTabChange={key => (state.photoCurrentTab = key)}
                  tabBarExtraContent={
                    <a href="#">
                      更多
                      <MoreOutlined />
                    </a>
                  }
                >
                  <Row gutter={24}>
                    <Col span={12}>
                      <div class={styles.photo_news_item}>
                        <img
                          class={styles.photo_news_img}
                          src={Zonghanghuiyi01}
                        />
                        <div>
                          <p class={styles.photo_news_title}>2022.06.09</p>
                          <p class={styles.photo_news_text}>
                            中信银行召开2022年保密委员会会议
                          </p>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div class={styles.photo_news_item}>
                        <img
                          class={styles.photo_news_img}
                          src={Zonghanghuiyi02}
                        />
                        <div>
                          <p class={styles.photo_news_title}>2022.06.09</p>
                          <p class={styles.photo_news_text}>
                            总行举办中信大讲堂“342”强核行动行领...
                          </p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {/* <Row gutter={24}>
                    {Array.from({ length: 4 }, (_i, index) => (
                      <Col span={6} key={index}>
                        <Card
                          hoverable
                          bordered={false}
                          cover={
                            <img
                              src={
                                index % 2 === 0
                                  ? Zonghanghuiyi01
                                  : Zonghanghuiyi02
                              }
                            />
                          }
                          style="width: 240px"
                        >
                          <Card.Meta
                            title="2022.06.09"
                            description="中信银行召开2022年保密委员会会议"
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row> */}
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {/* 页脚 */}
        <Footer />
      </div>
    )
  },
})
