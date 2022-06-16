import { defineComponent, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Menu,
  Radio,
  Row,
  Timeline,
  Typography,
} from 'ant-design-vue'
import {
  SendOutlined,
  CommentOutlined,
  RightOutlined,
} from '@ant-design/icons-vue'
import Logo from '@/assets/logo.png'
import {
  Buqian,
  Kaoqin,
  Chuguo,
  Gongchu,
  Gongzitiao,
  Wodeshenqing,
  Xiujia,
  Shouruzhengming,
  Zhaopin,
  Gengduo,
  Wenjianchakan,
} from '@/assets/icons/index'
import Meeting from '@/assets/meeting.jpg'
import styles from './index.module.less'

// 待办事项列表
const todoList = [
  {
    id: 1,
    title:
      '昆明分行2021年员工违反行为管理规定考试昆明分行2021年员工违反行为管理规定考试',
    time: '2022年6月16日',
  },
  {
    id: 2,
    title: '昆明分行2021年员工违反行为管理规定考试',
    time: '2022年6月16日',
  },
]

//
const ActionIcons: IStatusEnum[] = [
  { title: '考勤查询', value: 'kaoqin', icon: Kaoqin },
  { title: '申请公出', value: 'gongchu', icon: Gongchu },
  { title: '申请休假', value: 'xiujia', icon: Xiujia },
  { title: '因私出国申请', value: 'chuguo', icon: Chuguo },
  { title: '申请补签卡', value: 'buqian', icon: Buqian },
  { title: '查看我的申请', value: 'wodeshenqing', icon: Wodeshenqing },
  { title: '我的工资条', value: 'gongzitiao', icon: Gongzitiao },
  { title: '收入证明', value: 'shouruzhengming', icon: Shouruzhengming },
  { title: '内部招聘', value: 'zhaopin', icon: Zhaopin },
  { title: '文件查看', value: 'wenjianchakan', icon: Wenjianchakan },
  { title: '更多', value: 'gengduo', icon: Gengduo },
]

export default defineComponent({
  name: 'Myself',
  setup() {
    const router = useRouter()

    const store = useStore()

    const state = reactive({
      loading: false,
      toDoState: '1',
      userName: '张三',
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

    // 工具点击
    const onActionClick = (action: string) => {
      console.log('action :>> ', action)
    }

    return () => (
      <div class={styles.page_warpper}>
        {/* 页头 */}
        {/* <div class={styles.header_warper}>
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
        </div> */}

        {/* 页体 */}
        <div class={styles.body_warper}>
          <Row gutter={12}>
            <Col span={12}>
              <Card title="待办事项" size="small" bordered={false}>
                <div class={styles.todo_action}>
                  <div>
                    <Radio.Group
                      v-model={[state.toDoState, 'value']}
                      buttonStyle="solid"
                    >
                      <Radio.Button value="1">待办</Radio.Button>
                      <Radio.Button value="2">已办</Radio.Button>
                    </Radio.Group>
                  </div>
                  <div>
                    <a href="#">更多</a>
                    <Divider type="vertical" />
                    <a href="#">Web消息</a>
                    <Divider type="vertical" />
                    <a href="#">公告信息</a>
                  </div>
                </div>
                <div class={styles.todo_list}>
                  {todoList.map(item => (
                    <div key={item.id} class={styles.todo_item}>
                      <span class={styles.todo_item_title}>{item.title}</span>
                      <div class={styles.todo_item_other}>
                        <div class={styles.todo_item_time}>{item.time}</div>
                        <RightOutlined />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="自主服务" size="small" bordered={false}>
                <Row gutter={[12, 24]}>
                  {ActionIcons.map(item => (
                    <Col key={item.value} span={6}>
                      <div
                        class={styles.service_item}
                        onClick={() => onActionClick(item.value)}
                      >
                        <img src={item.icon as any}></img>
                        <div>{item.title}</div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col span={8}>
              <Card title="成长历程">
                <div class={styles.avatar_warper}>
                  <Avatar size={108} src="https://joeschmoe.io/api/v1/random" />
                  <div class={styles._avatar_info}>
                    <Typography.Paragraph
                      v-model={[state.userName, 'content']}
                      editable
                    />
                    <div>副总经理</div>
                    <div>零售银行部</div>
                  </div>
                </div>

                <Timeline>
                  <Timeline.Item color="green" class={styles.timeLine_item}>
                    <div class={styles.time}>2015-09-01</div>
                    <div class={styles.content}>Create a services site</div>
                  </Timeline.Item>
                  <Timeline.Item color="green" class={styles.timeLine_item}>
                    <div class={styles.time}>2015-09-01</div>
                    <div class={styles.content}>Create a services site</div>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
            <Col span={16}>
              <Card title="我的公出">我的公出</Card>
            </Col>
          </Row>
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
