import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  Ref,
} from 'vue'
import { useRouter } from 'vue-router'
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Dropdown,
  Empty,
  Menu,
  Modal,
  Progress,
  Row,
  Table,
  Timeline,
  Typography,
} from 'ant-design-vue'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons-vue'
import ChartLine from './ChartLine'
import Vacation from './Vacation'
import Footer from '@/components/Footer'
import List from '@/components/List'
import { LogoLight, IdPhoto } from '@/assets'
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
  Myself,
} from '@/assets/icons/index'
// import watermark from '@/utils/watermark'
import { Watermark } from '@pansy/watermark'
import moment from 'moment'
import { growthProcess, todoList, workExperiences } from './data'
import styles from './index.module.less'

// 功能数据
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

/** 待办事项的TabList */
const todoTabList = [
  { key: '1', tab: '待办' },
  { key: '2', tab: '已办' },
]

/** 工作经历columns */
const tableColumns: ColumnProps = [
  { title: '开始时间', dataIndex: 'startDate', width: 130, ellipsis: true },
  { title: '结束时间', dataIndex: 'endDate', width: 130, ellipsis: true },
  { title: '工作单位', dataIndex: 'workUnit', width: 130, ellipsis: true },
  { title: '任职部门', dataIndex: 'department', width: 150, ellipsis: true },
  { title: '岗位', dataIndex: 'post', ellipsis: true },
  { title: '职级', dataIndex: 'rank', width: 175, ellipsis: true },
]

export default defineComponent({
  name: 'Myself',
  setup() {
    const router = useRouter()

    const state = reactive({
      loading: false,
      toDoState: '1',
      userName: window.localStorage.getItem('userName') || '张三',
      currentMenu: ['1'],
      todoCurrentTab: '1',
      modalVisible: false,
    })
    const watermark = ref<Watermark>()

    // monitor?: boolean;
    // /** 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印 */
    // image?: string;
    // /** 水印文本, 为数组时表示多行水印 */
    // text?: string | string[];
    // /** 盲水印文本 */
    // blindText?: string;
    // /** 盲水印文本大小 */
    // blindFontSize?: string | number;
    // /** 盲水印透明度 */
    // blindOpacity?: number;
    // /** 样式层级 */
    // zIndex?: number;
    // /** 是否使用水印组件包裹内容  */
    // pack?: boolean;
    // /** 水印挂载的容器 */
    // container?: HTMLElement | string | null;
    // /** 水印挂载的样式 */
    // containerStyle?: Record<string, any>;
    // /** 展示模式，interval表示错行展示 */
    // mode?: 'repeat' | 'interval';
    //  */

    onMounted(() => {
      watermark.value = new Watermark({
        container: 'root',
        text: [state.userName, moment().format('YYYY-MM-DD'), '10.18.24.274'],
        fontSize: 16,
        gapX: 8,
        gapY: 246,
        // width: 500,
        // height: 30,
        fontColor: 'black',
        opacity: 0.1,
        zIndex: 999,
      })
      watermark.value.show()

      // setTimeout(() => {
      //   const root = document.getElementById('root')
      //   if (root) {
      //     watermark(root, {
      //       text1: `${state.userName} ${moment().format(
      //         'YYYY-MM-DD'
      //       )} 10.18.24.274`,
      //       text2: '',
      //       color: 'black',
      //       fontSize: 24,
      //       space_x: 150,
      //       space_y: 120,
      //       width: 450,
      //       alpha: 0.1, // 透明度
      //     })
      //   }
      // }, 500)
    })

    onBeforeUnmount(() => {
      if (watermark.value) {
        watermark.value.destroy()
      }
    })

    // 待办事项的tab切换
    const onTodoTabChange = (key: string) => {
      state.todoCurrentTab = key
    }

    // 个人简历
    const onUserInfoClick = () => {
      state.modalVisible = true
    }

    // 退出登录
    const onLogoutClick = () => {
      router.push('/login')
    }

    // 工具点击
    const onActionClick = (action: string) => {
      console.log('action :>> ', action)
      if (action === 'wenjianchakan') {
        window.open('/download', '_blank')
      }
    }

    // 弹窗取消
    const onModalCancel = () => {
      state.modalVisible = false
    }

    return () => (
      <div class={styles.page_warpper}>
        {/* 页头 */}
        <div class={styles.header_warper}>
          <div class={styles.header_menu_warper}>
            <div class={styles.header}>
              <img
                class={styles.logo_img}
                src={LogoLight}
                onClick={() => router.push('/')}
              />
              <div class={styles.myself_content}>
                <div class={styles.myself_icon}>
                  <img src={Myself} />
                </div>
                <div class={styles.myself_title}>我自己</div>
              </div>

              <Dropdown placement="bottomRight" trigger={['click', 'hover']}>
                {{
                  default: () => (
                    <div class={styles.account_avatar}>
                      <span>{state.userName}</span>
                      <Avatar shape="square" src={IdPhoto} />
                    </div>
                  ),
                  overlay: () => (
                    <Menu mode="horizontal">
                      <Menu.Item
                        key="userInfo"
                        icon={<UserOutlined />}
                        onClick={onUserInfoClick}
                      >
                        个人简历
                      </Menu.Item>
                      <Menu.Divider />
                      <Menu.Item
                        key="logout"
                        icon={<LogoutOutlined style={{ color: 'red' }} />}
                        onClick={onLogoutClick}
                      >
                        退出登录
                      </Menu.Item>
                    </Menu>
                  ),
                }}
              </Dropdown>
            </div>
          </div>
        </div>

        {/* 页体 */}
        <div class={styles.body_warper}>
          <div class={styles.in_body_top}>
            <Row gutter={12}>
              <Col span={12}>
                <div class={styles.todo_warper}>
                  <Card title="待办事项" size="small" bordered={false}>
                    <Card
                      size="small"
                      bordered={false}
                      tabList={todoTabList}
                      activeTabKey={state.todoCurrentTab}
                      onTabChange={onTodoTabChange}
                      tabBarExtraContent={
                        <>
                          <a href="#" class={styles.todo_action_btn}>
                            更多
                          </a>
                          <Divider type="vertical" />
                          <a href="#" class={styles.todo_action_btn}>
                            Web消息
                          </a>
                          <Divider type="vertical" />
                          <a href="#" class={styles.todo_action_btn}>
                            公告信息
                          </a>
                        </>
                      }
                      class={styles.todo_warper}
                    >
                      <List showArrow dataSource={todoList} />
                    </Card>
                  </Card>
                </div>
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
          </div>

          <div class={styles.in_body_bottom}>
            <Row gutter={12}>
              <Col span={8}>
                <div class={styles.growth_warper}>
                  <Card title="成长历程" size="small">
                    <div class={styles.avatar_warper}>
                      <Avatar size={108} src={IdPhoto} />
                      <div class={styles._avatar_info}>
                        <Typography.Paragraph
                          v-model={[state.userName, 'content']}
                          editable
                        />
                        <div>总经理</div>
                        <div>零售银行部</div>
                      </div>
                    </div>

                    <Timeline>
                      {growthProcess.map(item => (
                        <Timeline.Item
                          key={item.id}
                          color="green"
                          class={styles.timeLine_item}
                        >
                          <div class={styles.time}>{item.time}</div>
                          <div class={styles.content}>{item.title}</div>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </Card>
                </div>
              </Col>
              <Col span={16}>
                <Card title="我的公出" size="small">
                  <ChartLine />
                  <Row style={{ marginTop: '12px' }}>
                    <Col span={8}>
                      <Vacation title="2020" value="0" />
                    </Col>
                    <Col span={8}>
                      <Vacation title="2021" value="4.5天+41小时" />
                    </Col>
                    <Col span={8}>
                      <Vacation title="2022" value="3天+9小时" />
                    </Col>
                  </Row>
                </Card>

                <Card title="我的假期" size="small">
                  <Row gutter={[12, 12]}>
                    <Col span={24}>
                      <Typography.Text type="secondary">
                        年假剩余
                      </Typography.Text>
                      <Progress percent={100} format={() => <>10/10</>} />
                    </Col>
                    <Col span={24}>
                      <Typography.Text type="secondary">
                        调休假信息
                      </Typography.Text>
                      <Empty />
                    </Col>
                    <Col span={24}>
                      <Typography.Text type="secondary">
                        近三年休假统计
                      </Typography.Text>
                      <Row style={{ marginTop: '12px' }}>
                        <Col span={8}>
                          <Vacation title="2022" value="3天+0小时" />
                        </Col>
                        <Col span={8}>
                          <Vacation title="2021" value="0" />
                        </Col>
                        <Col span={8}>
                          <Vacation title="2020" value="0" />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        <Modal
          v-model={[state.modalVisible, 'visible']}
          title="个人简历"
          width={1000}
          style="top: 20px"
          onCancel={onModalCancel}
          footer={<Button onClick={onModalCancel}>关闭</Button>}
        >
          <div class={styles.user_head_warper}>
            <Avatar size={64} icon={<UserOutlined />} src={IdPhoto} />
            <div class={styles.user_info}>
              <h2>{state.userName} 26403003444</h2>
              <div>大理分行零售银行部总经理</div>
            </div>
          </div>
          <Card title="当前任职信息" size="small">
            <Descriptions bordered size="small" column={2}>
              <Descriptions.Item label="所属机构">大理分行</Descriptions.Item>
              <Descriptions.Item label="所属部门">零售银行部</Descriptions.Item>
              <Descriptions.Item label="在职状态">在岗</Descriptions.Item>
              <Descriptions.Item label="所属岗位">副总经理</Descriptions.Item>
              <Descriptions.Item label="职级">
                二级分部门副行长级
              </Descriptions.Item>
            </Descriptions>
          </Card>

          <Card title="工作经历" size="small" style={{ margin: '12px 0' }}>
            <Table
              rowKey="id"
              size="small"
              bordered
              columns={tableColumns}
              dataSource={workExperiences}
              pagination={false}
            />
          </Card>

          <Card title="合同信息" size="small">
            <Descriptions bordered size="small" column={2}>
              <Descriptions.Item label="合同编码">
                EMPCON00093882
              </Descriptions.Item>
              <Descriptions.Item label="合同类型">劳动合同</Descriptions.Item>
              <Descriptions.Item label="期限类型">固定期限</Descriptions.Item>
              <Descriptions.Item label="合同状态">履行中</Descriptions.Item>
              <Descriptions.Item label="生效日期">
                2018年11月10日
              </Descriptions.Item>
              <Descriptions.Item label="终止日期">
                2023年11月09日
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Modal>

        {/* 页脚 */}
        <Footer />
      </div>
    )
  },
})
