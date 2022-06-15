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
  message,
  Spin,
} from 'ant-design-vue'
import {
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
  UndoOutlined,
} from '@ant-design/icons-vue'
import { ISolutionItem, ISearchParams, IState } from './interface'
import { IDictItem } from '../Dict/interface'
import moment from 'moment'
// import wxRequest from '@/utils/wxRequest'
import wxRequest from './../../utils/wxRequest'
import ImgUpload from '@/components/ImgUpload'

/** 表格列配置 */
const Columns: ColumnProps = [
  { title: '方案标题', dataIndex: 'title', ellipsis: true },
  {
    title: '所属分类',
    dataIndex: 'dictItemId',
    ellipsis: true,
    slots: { customRender: 'dictItemId' },
  },
  {
    title: '详情类型',
    dataIndex: 'detailType',
    ellipsis: true,
    slots: { customRender: 'detailType' },
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

/** 解决方案 */
export default defineComponent(function Solution() {
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
      logo: '',
      logoUrl: '',
      detailType: 1,
      details: undefined,
      detailUrl: undefined,
      dictItemId: undefined,
    },
    modalLoading: false,
    modalType: 'add',
    solutionGroup: [],
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
    logo: [{ required: true, message: '不能为空！' }],
    dictItemId: [{ required: true, message: '不能为空！' }],
    detailType: [{ required: true, type: 'number', message: '不能为空!' }],
    details: [{ required: false, type: 'string' }],
    detailUrl: [{ required: false, type: 'string' }],
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
      .callFunction<WxResponseDefine<WxPageResDefine<ISolutionItem[]>>>({
        name: 'wx-digital-manage-web',
        data: {
          type: 'getSolutionPageList',
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
  const getSolutionGroupList = () => {
    wxRequest
      .callFunction<WxResponseDefine<IDictItem[]>>({
        name: 'wx-digital-manage-web',
        data: { type: 'getSolutionGroup' },
      })
      .then(res => {
        const { code, data, msg } = res.result
        if (code === 0) {
          state.solutionGroup = data
        } else {
          message.error(msg)
        }
      })
  }
  getSolutionGroupList()

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
  const handleUpdate = (record: ISolutionItem) => {
    state.modalType = 'update'
    state.modalVisible = true
    state.modalLoading = true
    wxRequest
      .callFunction<WxResponseDefine<ISolutionItem>>({
        name: 'wx-digital-manage-web',
        data: { type: 'getProjectDetails', payload: { _id: record._id } },
      })
      .then(res => {
        const { code, data, msg } = res.result
        if (code === 0) {
          state.modalForm._id = data._id
          state.modalForm.title = data.title
          state.modalForm.logo = data.logo
          state.modalForm.logoUrl = data.logoUrl
          state.modalForm.detailType = data.detailType
          state.modalForm.details = data.details
          state.modalForm.detailUrl = data.detailUrl
          state.modalForm.dictItemId = data.dictItemId
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
            type: state.modalType === 'add' ? 'addSolution' : 'updateSolution',
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
            <Form.Item label="方案标题" {...searchFormValidateInfos.title}>
              <Input
                v-model={[state.searchForm.title, 'value', ['trim']]}
                allowClear
                placeholder="请输入..."
                onPressEnter={() => getUserList()}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="所属分类" {...searchFormValidateInfos.dictItemId}>
              <Select
                v-model={[state.searchForm.dictItemId, 'value']}
                allowClear
                placeholder="请选择..."
              >
                {state.solutionGroup.map(item => (
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
          // 详情类型
          detailType: ({ text }: { text: ISolutionItem['detailType'] }) =>
            text === 1 ? '链接地址' : '富文本',
          // 所属
          dictItemId: ({ text }: { text: ISolutionItem['dictItemId'] }) =>
            state.solutionGroup.find(item => item._id === text)?.name,
          // 创建时间
          createTime: ({ text }: { text: ISolutionItem['_createTime'] }) =>
            text && moment(text).format('YYYY-MM-DD HH:mm'),
          // 操作
          operation: ({ record }: { record: ISolutionItem }) => (
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
                <Form.Item label="方案标题" {...validateInfos.title}>
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
                <Form.Item label="Logo" {...validateInfos.logo}>
                  <ImgUpload
                    v-models={[
                      [state.modalForm.logo, 'fileID'],
                      [state.modalForm.logoUrl, 'imageUrl'],
                    ]}
                    relativePath="solution_logo"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span="12">
                <Form.Item
                  label="所属分类"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  {...validateInfos.dictItemId}
                >
                  <Select
                    v-model={[state.modalForm.dictItemId, 'value']}
                    placeholder="请选择..."
                  >
                    {state.solutionGroup.map(item => (
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
                    <Radio value={1}>链接地址</Radio>
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
                  <Form.Item label="链接地址" {...validateInfos.detailUrl}>
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
          </Form>
        </Spin>
      </Modal>
    </div>
  )
})
