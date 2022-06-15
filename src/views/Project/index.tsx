import { defineComponent, reactive, computed } from 'vue'
import {
  Space,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Select,
  Col,
  Row,
  Radio,
  Spin,
  message,
} from 'ant-design-vue'
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons-vue'
import ImgUpload from '@/components/ImgUpload'
import { IProjectItem, ISearchParams, IState } from './interface'
import { IDictItem } from '../Dict/interface'
import moment from 'moment'
import wxRequest from '@/utils/wxRequest'

/** 表格列配置 */
const Columns: ColumnProps = [
  { title: '产品标题', dataIndex: 'title', ellipsis: true },
  {
    title: '所属',
    dataIndex: 'dictItemId',
    ellipsis: true,
    slots: { customRender: 'dictItemId' },
  },
  {
    title: '创建时间',
    dataIndex: '_createTime',
    ellipsis: true,
    slots: { customRender: 'createTime' },
  },
  {
    title: '操作',
    align: 'center',
    ellipsis: true,
    slots: { customRender: 'operation' },
  },
]

/** 首页产品 */
export default defineComponent(function Project() {
  const state = reactive<IState>({
    loading: false,
    pageData: {
      list: [],
      current: 1,
      pageSize: 10,
      total: 0,
    },
    selectedRowKeys: [],
    searchForm: {
      title: undefined,
      dictItemId: undefined,
    },
    modalVisible: false,
    modalForm: {
      _id: undefined,
      title: '',
      subtitle: undefined,
      logo: undefined,
      logoUrl: undefined,
      dictItemId: undefined,
      detailType: 1,
      details: undefined,
      detailUrl: undefined,
      manualUrl: undefined,
      faqUrl: undefined,
      huaweiMall: undefined,
    },
    modalLoading: false,
    modalType: 'add',
    projectGroup: [],
  })

  // 弹窗标题
  const modalTitle = computed(() => {
    switch (state.modalType) {
      case 'add':
        return '新增'
      case 'update':
        return '修改'
    }
  })

  const {
    resetFields: searchFormReset,
    validateInfos: searchFormValidateInfos,
  } = Form.useForm(
    state.searchForm,
    reactive({
      title: [{ required: false, type: 'string' }],
      dictItemId: [{ required: false, type: 'string' }],
    })
  )

  const rulesRef = reactive({
    _id: [{ required: false, type: 'string' }],
    title: [{ required: true, message: '不能为空！' }],
    subtitle: [{ required: true, message: '不能为空！' }],
    logo: [{ required: true, message: '不能为空！' }],
    dictItemId: [{ required: true, message: '不能为空！' }],
    detailType: [{ required: true, type: 'number', message: '不能为空!' }],
    details: [{ required: false, type: 'string' }],
    detailUrl: [{ required: false, type: 'string' }],
    manualUrl: [{ required: false, type: 'string' }],
    faqUrl: [{ required: false, type: 'string' }],
    huaweiMall: [{ required: false, type: 'string' }],
  })

  const { resetFields, validate, validateInfos } = Form.useForm(
    state.modalForm,
    rulesRef
  )

  // 列表请求
  const getUserList = (
    payload: ISearchParams & WxPageRequestParams = { current: 1, pageSize: 10 }
  ) => {
    state.loading = true
    wxRequest
      .callFunction<WxResponseDefine<WxPageResDefine<IProjectItem[]>>>({
        name: 'wx-digital-manage-web',
        data: {
          type: 'getProjectPageList',
          payload: { ...state.searchForm, ...payload },
        },
      })
      .then(res => {
        const { code, data, msg } = res.result
        if (code === 0) {
          state.pageData = data
        } else {
          message.error(msg)
        }
      })
      .finally(() => {
        state.loading = false
        state.selectedRowKeys = []
      })
  }
  getUserList()

  // 项目分组数据
  const getProjectGroupList = () => {
    wxRequest
      .callFunction<WxResponseDefine<IDictItem[]>>({
        name: 'wx-digital-manage-web',
        data: { type: 'getProjectGroup' },
      })
      .then(res => {
        const { code, data, msg } = res.result
        if (code === 0) {
          state.projectGroup = data
        } else {
          message.error(msg)
        }
      })
  }
  getProjectGroupList()

  // 重置搜索
  const hanldeResetSearch = () => {
    searchFormReset()
    getUserList()
  }

  // 新增
  const handleAdd = () => {
    state.modalType = 'add'
    state.modalVisible = true
  }

  // 编辑
  const handleUpdate = (record: IProjectItem) => {
    state.modalType = 'update'
    state.modalVisible = true
    state.modalLoading = true
    wxRequest
      .callFunction<WxResponseDefine<IProjectItem>>({
        name: 'wx-digital-manage-web',
        data: { type: 'getProjectDetails', payload: { _id: record._id } },
      })
      .then(res => {
        const { code, data, msg } = res.result
        if (code === 0) {
          state.modalForm._id = data._id
          state.modalForm.title = data.title
          state.modalForm.subtitle = data.subtitle
          state.modalForm.logo = data.logo
          state.modalForm.logoUrl = data.logoUrl
          state.modalForm.dictItemId = data.dictItemId
          state.modalForm.detailType = data.detailType
          state.modalForm.details = data.details
          state.modalForm.detailUrl = data.detailUrl
          state.modalForm.manualUrl = data.manualUrl
          state.modalForm.faqUrl = data.faqUrl
          state.modalForm.huaweiMall = data.huaweiMall
        } else {
          message.error(msg)
        }
        state.modalLoading = false
      })
      .catch(() => (state.modalLoading = false))
  }

  // 批量删除
  const hanldeBatchDelete = () => {
    wxRequest
      .callFunction<WxResponseDefine<IDictItem[]>>({
        name: 'wx-digital-manage-web',
        data: {
          type: 'bactchDeleteProject',
          payload: state.selectedRowKeys,
        },
      })
      .then(res => {
        const { code, msg } = res.result
        if (code === 0) {
          getUserList()
        } else {
          message.error(msg)
        }
      })
  }

  // 取消弹窗
  const hanldeCancel = () => {
    resetFields()
    state.modalVisible = false
  }

  // 提交弹窗
  const hanldeOK = () => {
    validate().then(fields => {
      state.modalLoading = true
      wxRequest
        .callFunction<WxResponseDefine<IDictItem[]>>({
          name: 'wx-digital-manage-web',
          data: {
            type: state.modalType === 'add' ? 'addProject' : 'updateProject',
            payload: fields,
          },
        })
        .then(res => {
          const { code, msg } = res.result
          if (code === 0) {
            hanldeCancel()
            getUserList()
          } else {
            message.error(msg)
          }
        })
        .finally(() => (state.modalLoading = false))
    })
  }

  // 分页改变事件
  const onTableChange = (current: number, pageSize: number) => {
    getUserList({ current, pageSize })
  }

  return () => (
    <div>
      <Form wrapperCol={{ flex: 'auto' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="产品标题" {...searchFormValidateInfos.title}>
              <Input
                v-model={[state.searchForm.title, 'value', ['trim']]}
                allowClear
                placeholder="请输入..."
                onPressEnter={() => getUserList()}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="所属" {...searchFormValidateInfos.dictItemId}>
              <Select
                v-model={[state.searchForm.dictItemId, 'value']}
                allowClear
                placeholder="请选择..."
              >
                {state.projectGroup.map(item => (
                  <Select.Option value={item._id}>{item.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={() => getUserList()}>
                  <SearchOutlined />
                  搜索
                </Button>
                <Button onClick={hanldeResetSearch}>
                  <UndoOutlined />
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Space>
        <Button type="primary" onClick={handleAdd}>
          <PlusOutlined />
          新增
        </Button>

        <Button
          onClick={hanldeBatchDelete}
          disabled={!state.selectedRowKeys.length}
        >
          <DeleteOutlined />
          批量删除
        </Button>
      </Space>

      <Table
        bordered
        size="middle"
        rowKey="_id"
        loading={state.loading}
        columns={Columns}
        dataSource={state.pageData.list}
        pagination={{
          current: state.pageData.current,
          pageSize: state.pageData.pageSize,
          total: state.pageData.total,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '15', '30'],
          onChange: onTableChange,
          onShowSizeChange: onTableChange,
          showTotal: (total: number) => `共 ${total} 条`,
        }}
        rowSelection={{
          selectedRowKeys: state.selectedRowKeys,
          onChange: (selectedRowKeys: ColumnKey[]) => {
            state.selectedRowKeys = selectedRowKeys
          },
        }}
        style={{ marginTop: '16px' }}
      >
        {{
          // 所属
          dictItemId: ({ text }: { text: IProjectItem['dictItemId'] }) =>
            state.projectGroup.find(item => item._id === text)?.name,
          // 创建时间
          createTime: ({ text }: { text: IProjectItem['_createTime'] }) =>
            text && moment(text).format('YYYY-MM-DD HH:mm'),
          // 操作
          operation: ({ record }: { record: IProjectItem }) => (
            <a onClick={() => handleUpdate(record)}>编辑</a>
          ),
        }}
      </Table>

      <Modal
        v-model={[state.modalVisible, 'visible']}
        title={modalTitle.value}
        onCancel={hanldeCancel}
        footer={
          state.modalType === 'view' ? (
            <Button onClick={hanldeCancel}>关 闭</Button>
          ) : (
            <>
              <Button onClick={hanldeCancel}>取 消</Button>
              <Button
                type="primary"
                loading={state.modalLoading}
                onClick={hanldeOK}
              >
                确 定
              </Button>
            </>
          )
        }
        width={900}
      >
        <Spin spinning={state.modalLoading}>
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Row>
              <Col span="24">
                <Form.Item label="产品标题" {...validateInfos.title}>
                  <Input
                    v-model={[state.modalForm.title, 'value', ['trim']]}
                    disabled={state.modalType === 'view'}
                    placeholder="请输入..."
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <Form.Item label="产品副标题" {...validateInfos.subtitle}>
                  <Input.TextArea
                    v-model={[state.modalForm.subtitle, 'value', ['trim']]}
                    disabled={state.modalType === 'view'}
                    placeholder="请输入..."
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span="24">
                <Form.Item label="产品图片" {...validateInfos.logo}>
                  <ImgUpload
                    v-models={[
                      [state.modalForm.logo, 'fileID'],
                      [state.modalForm.logoUrl, 'imageUrl'],
                    ]}
                    relativePath="project_logo"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form.Item
                  label="所属"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  {...validateInfos.dictItemId}
                >
                  <Select
                    v-model={[state.modalForm.dictItemId, 'value']}
                    placeholder="请选择..."
                  >
                    {state.projectGroup.map(item => (
                      <Select.Option value={item._id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span="12">
                <Form.Item
                  label="详情类型"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  {...validateInfos.detailType}
                >
                  <Radio.Group v-model={[state.modalForm.detailType, 'value']}>
                    <Radio value={1}>产品介绍链接</Radio>
                    <Radio value={2} disabled>
                      富文本
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span="24">
                {state.modalForm.detailType === 1 ? (
                  <Form.Item label="产品介绍链接" {...validateInfos.detailUrl}>
                    <Input
                      v-model={[state.modalForm.detailUrl, 'value', ['trim']]}
                      disabled={state.modalType === 'view'}
                      placeholder="仅支持 mp.weixin.qq.com 开头的链接"
                    />
                  </Form.Item>
                ) : (
                  <Form.Item label="详情描述" {...validateInfos.details}>
                    <Input.TextArea
                      v-model={[state.modalForm.details, 'value', ['trim']]}
                      disabled={state.modalType === 'view'}
                      placeholder="请输入..."
                    />
                  </Form.Item>
                )}
              </Col>
            </Row>

            <Row>
              <Col span="24">
                <Form.Item label="用户手册链接" {...validateInfos.manualUrl}>
                  <Input
                    v-model={[state.modalForm.manualUrl, 'value', ['trim']]}
                    disabled={state.modalType === 'view'}
                    placeholder="仅支持 mp.weixin.qq.com 开头的链接"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span="24">
                <Form.Item label="FAQ链接" {...validateInfos.faqUrl}>
                  <Input
                    v-model={[state.modalForm.faqUrl, 'value', ['trim']]}
                    disabled={state.modalType === 'view'}
                    placeholder="仅支持 mp.weixin.qq.com 开头的链接"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span="24">
                <Form.Item label="华为云严选" {...validateInfos.huaweiMall}>
                  <Input
                    v-model={[state.modalForm.huaweiMall, 'value', ['trim']]}
                    disabled={state.modalType === 'view'}
                    placeholder="仅支持 mp.weixin.qq.com 开头的链接"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </div>
  )
})
