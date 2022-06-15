import { defineComponent, reactive, computed } from 'vue'
import {
  Button,
  Table,
  message,
  Modal,
  Popconfirm,
  Form,
  Input,
  Divider,
} from 'ant-design-vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { IDict, IDictItem, IActionTarget, IState } from './interface'
import wxRequest from '@/utils/wxRequest'

/** 表格列配置 */
const Columns: ColumnProps = [
  { title: '分类', dataIndex: 'name', ellipsis: true },
  { title: '描述', dataIndex: 'description', ellipsis: true },
  {
    title: '操作',
    align: 'center',
    slots: { customRender: 'operation' },
  },
]

/** 表格列配置 */
const innerColumns: ColumnProps = [
  { title: '字典项', dataIndex: 'name', ellipsis: true },
  {
    title: '操作',
    align: 'center',
    slots: { customRender: 'operation' },
  },
]

/** 用户管理 */
export default defineComponent(function Dict() {
  const state = reactive<IState>({
    loading: false,
    dictData: [],
    modalVisible: false,
    modalForm: {
      _id: undefined,
      name: '',
      description: '',
      dictId: undefined,
    },
    modalLoading: false,
    actionTarget: 'dict',
    modalType: 'add',
  })

  // 弹窗标题
  const modalTitle = computed(() => {
    switch (state.modalType) {
      case 'add':
        return '新增'
      case 'update':
        return '修改'
      case 'view':
        return '查看'
    }
  })

  const rulesRef = reactive({
    _id: [{ required: false, type: 'string' }],
    name: [{ required: true, message: '不能为空！' }],
    description: [{ required: false, type: 'string' }],
    dictId: [{ required: true, message: '不能为空！' }],
  })

  const { resetFields, validate, validateInfos } = Form.useForm(
    state.modalForm,
    rulesRef
  )

  // 列表请求
  const getDictData = () => {
    state.loading = true
    wxRequest
      .callFunction<WxResponseDefine<IDict[]>>({
        name: 'wx-digital-manage-web',
        data: { type: 'getDictData' },
      })
      .then(res => {
        state.loading = false
        const { code, data, msg } = res.result
        if (code === 0) {
          state.dictData = data
        } else {
          message.error(msg)
        }
      })
      .catch(() => (state.loading = false))
  }
  getDictData()

  // 新增
  const handleAdd = (type: IActionTarget, dictId?: string) => {
    state.actionTarget = type
    state.modalForm.dictId = dictId
    state.modalType = 'add'
    state.modalVisible = true
  }

  // 编辑
  const handleUpdate = (type: IActionTarget, record: IDictItem) => {
    state.modalForm._id = record._id
    state.modalForm.name = record.name
    state.modalForm.description = record.description
    state.modalForm.dictId = record.dictId

    state.actionTarget = type
    state.modalType = 'update'
    state.modalVisible = true
  }

  // 请求
  const handleDelete = (type: IActionTarget, id: IDictItem['_id']) => {
    if (id) {
      wxRequest
        .callFunction<WxResponseDefine<IDict[]>>({
          name: 'wx-digital-manage-web',
          data: {
            type: type === 'dict' ? 'deleteDict' : 'deleteDictItem',
            _id: id,
          },
        })
        .then(res => {
          const { code, msg } = res.result
          if (code === 0) {
            message.success('删除成功！')
            getDictData()
          } else {
            message.error(msg)
          }
        })
    }
  }

  // 取消弹窗
  const handleCancel = () => {
    resetFields()
    state.modalVisible = false
  }

  // 提交弹窗
  const handleOK = () => {
    let validFields = Object.keys(rulesRef)
    let type = 'addDict'

    if (state.modalType === 'add') {
      if (state.actionTarget === 'dictItem') {
        type = 'addDictItem'
      } else {
        validFields = validFields.filter(item => item !== 'dictId')
        type = 'addDict'
      }
    } else if (state.modalType === 'update') {
      if (state.actionTarget === 'dictItem') {
        type = 'updateDictItem'
      } else {
        validFields = validFields.filter(item => item !== 'dictId')
        type = 'updateDict'
      }
    }
    validate(validFields).then(payload => {
      state.modalLoading = true
      wxRequest
        .callFunction<WxResponseDefine<IDict[]>>({
          name: 'wx-digital-manage-web',
          data: { type, payload },
        })
        .then(res => {
          state.modalLoading = false
          const { code, msg } = res.result
          if (code === 0) {
            message.success('操作成功！')
            handleCancel()
            getDictData()
          } else {
            message.error(msg)
          }
        })
        .catch(() => (state.modalLoading = false))
    })
  }

  return () => (
    <div>
      {/* <Form wrapperCol={{ flex: 'auto' }}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label="姓名" {...searchFormValidateInfos.fullName}>
              <Input
                v-model={[state.searchForm.fullName, 'value', ['trim']]}
                allowClear
                placeholder="请输入"
                onPressEnter={() => getDictData()}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="手机号" {...searchFormValidateInfos.phoneNumber}>
              <Input
                v-model={[state.searchForm.phoneNumber, 'value', ['trim']]}
                allowClear
                placeholder="请输入"
                onPressEnter={() => getDictData()}
              />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={() => getDictData()}>
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
      </Form> */}

      <Button type="primary" onClick={() => handleAdd('dict')}>
        <PlusOutlined />
        新增分类
      </Button>

      <Table
        rowKey="_id"
        bordered
        loading={state.loading}
        columns={Columns}
        dataSource={state.dictData}
        pagination={false}
        style={{ marginTop: '16px' }}
      >
        {{
          expandedRowRender: ({ record }: { record: IDict }) => (
            <Table
              rowKey="_id"
              size="small"
              columns={innerColumns}
              dataSource={record.dictItemList}
              scroll={{ x: true }}
              pagination={false}
            >
              {{
                // 字典项操作
                operation: ({ record }: { record: IDictItem }) => (
                  <>
                    <a onClick={() => handleUpdate('dictItem', record)}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                      title="是否确认删除？"
                      onConfirm={() => handleDelete('dictItem', record._id)}
                    >
                      <a>删除</a>
                    </Popconfirm>
                  </>
                ),
              }}
            </Table>
          ),
          // 分类操作
          operation: ({ record }: { record: IDict }) => (
            <>
              <a onClick={() => handleUpdate('dict', record)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="是否确认删除？"
                onConfirm={() => handleDelete('dict', record._id)}
              >
                <a>删除</a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => handleAdd('dictItem', record._id)}>新增项</a>
            </>
          ),
        }}
      </Table>

      <Modal
        v-model={[state.modalVisible, 'visible']}
        title={modalTitle.value}
        onCancel={handleCancel}
        footer={
          state.modalType === 'view' ? (
            <Button onClick={handleCancel}>关 闭</Button>
          ) : (
            <>
              <Button onClick={handleCancel}>取 消</Button>
              <Button
                type="primary"
                loading={state.modalLoading}
                onClick={handleOK}
              >
                确 定
              </Button>
            </>
          )
        }
        width={700}
      >
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            label={state.actionTarget === 'dict' ? '分类' : '字典项'}
            {...validateInfos.name}
          >
            <Input
              v-model={[state.modalForm.name, 'value', ['trim']]}
              disabled={state.modalType === 'view'}
              placeholder="请输入..."
            />
          </Form.Item>

          <Form.Item label="描述" {...validateInfos.description}>
            <Input.TextArea
              v-model={[state.modalForm.description, 'value', ['trim']]}
              disabled={state.modalType === 'view'}
              placeholder="请输入..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})
