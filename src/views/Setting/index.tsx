import { computed, defineComponent, reactive } from 'vue'
import {
  Form,
  Input,
  Spin,
  Button,
  Table,
  Divider,
  message,
  Tabs,
  Space,
  Modal,
  Row,
  Col,
  InputNumber,
} from 'ant-design-vue'
import { IState, ISettingForm, IBannerItem } from './interface'
import wxRequest from '@/utils/wxRequest'
import styles from './index.module.less'
import moment from 'moment'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue'
import ImgUpload from '@/components/ImgUpload'

/** 表格列配置 */
const Columns: ColumnProps = [
  {
    title: '图片',
    dataIndex: 'imgUrl',
    width: 400,
    align: 'center',
    slots: { customRender: 'imgUrl' },
  },
  { title: '排序', dataIndex: 'order', ellipsis: true, align: 'center' },
  {
    title: '创建时间',
    dataIndex: '_createTime',
    ellipsis: true,
    align: 'center',
    slots: { customRender: 'createTime' },
  },
  {
    title: '操作',
    ellipsis: true,
    align: 'center',
    slots: { customRender: 'operation' },
  },
]

/** 系统设置 */
export default defineComponent(function Setting() {
  const state = reactive<IState>({
    activeTabs: '1',
    loading: false,
    settingForm: {
      aboutUrl: undefined,
      teamUrl: undefined,
      solutionUrl: undefined,
      productUrl: undefined,
      customerTell: undefined,
    },
    bannerLoading: false,
    bannerList: [],
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'add',
    modalForm: {
      _id: undefined,
      imgId: undefined,
      imgUrl: undefined,
      detailUrl: undefined,
      order: undefined,
      _createTime: undefined,
    },
  })

  // 基础配置userForm
  const { validate, validateInfos } = Form.useForm(
    state.settingForm,
    reactive({
      aboutUrl: [{ required: true, message: '不能为空！' }],
      teamUrl: [{ required: true, message: '不能为空！' }],
      solutionUrl: [{ required: true, message: '不能为空！' }],
      productUrl: [{ required: true, message: '不能为空！' }],
      customerTell: [{ required: true, message: '不能为空！' }],
    })
  )

  // banner图配置userForm
  const {
    resetFields: resetBannerFormFields,
    validate: validateBannerForm,
    validateInfos: bannerFormValidateInfos,
  } = Form.useForm(
    state.modalForm,
    reactive({
      _id: [{ required: false, type: 'string' }],
      imgId: [{ required: true, message: '不能为空！' }],
      imgUrl: [{ required: false, type: 'string' }],
      detailUrl: [{ required: true, message: '不能为空！' }],
      order: [{ required: true, type: 'number', message: '不能为空!' }],
    })
  )

  // 获取配置信息
  const getSettingInfo = () => {
    state.loading = true
    wxRequest
      .callFunction<WxResponseDefine<ISettingForm>>({
        name: 'wx-digital-manage-web',
        data: { type: 'getSetting' },
      })
      .then(res => {
        const { code, data, msg } = res.result
        if (code === 0) {
          state.settingForm.aboutUrl = data.aboutUrl
          state.settingForm.teamUrl = data.teamUrl
          state.settingForm.solutionUrl = data.solutionUrl
          state.settingForm.productUrl = data.productUrl
          state.settingForm.customerTell = data.customerTell
        } else {
          message.error(msg)
        }
      })
      .finally(() => (state.loading = false))
  }
  getSettingInfo()

  // 获取banner图数据
  const getBannerData = () => {
    state.bannerLoading = true
    wxRequest
      .callFunction<WxResponseDefine<IBannerItem[]>>({
        name: 'wx-digital-manage-web',
        data: { type: 'getBannerList' },
      })
      .then(res => {
        const { code, data, msg } = res.result
        state.bannerLoading = false
        if (code === 0) {
          state.bannerList = data
        } else {
          message.error(msg)
        }
      })
      .finally(() => (state.bannerLoading = false))
  }

  // 页签切换
  const handleTabClick = (tabName: string) => {
    if (tabName === '2' && state.bannerList.length === 0) {
      getBannerData()
    }
  }

  // 新增banner图
  const handleAddBanner = () => {
    state.modalType = 'add'
    state.modalVisible = true
  }

  // 批量删除banner图
  const hanldeBatchDelete = () => {
    wxRequest
      .callFunction<WxResponseDefine>({
        name: 'wx-digital-manage-web',
        data: {
          type: 'bactchDeleteBanner',
          payload: state.selectedRowKeys,
        },
      })
      .then(res => {
        const { code, msg } = res.result
        if (code === 0) {
          getBannerData()
        } else {
          message.error(msg)
        }
      })
  }

  // 编辑banner图
  const handleUpdate = (record: IBannerItem) => {
    state.modalType = 'update'
    state.modalVisible = true
    state.modalForm._id = record._id
    state.modalForm.imgId = record.imgId
    state.modalForm.imgUrl = record.imgUrl
    state.modalForm.detailUrl = record.detailUrl
    state.modalForm.order = record.order
    state.modalForm._createTime = record._createTime
  }

  // banner图弹窗标题
  const modalTitle = computed(() => {
    switch (state.modalType) {
      case 'add':
        return '新增'
      case 'update':
        return '修改'
    }
  })

  // 取消banner图弹窗
  const hanldeCancel = () => {
    resetBannerFormFields()
    state.modalVisible = false
  }

  // 提交banner图弹窗
  const hanldeOK = () => {
    validateBannerForm().then(fields => {
      wxRequest
        .callFunction<WxResponseDefine>({
          name: 'wx-digital-manage-web',
          data: {
            type: state.modalType === 'add' ? 'addBanner' : 'updateBanner',
            payload: fields,
          },
        })
        .then(res => {
          const { code, msg } = res.result
          if (code === 0) {
            hanldeCancel()
            getBannerData()
          } else {
            message.error(msg)
          }
        })
    })
  }

  // 保存
  const handleSubmit = () => {
    validate().then(fields => {
      wxRequest
        .callFunction<WxResponseDefine>({
          name: 'wx-digital-manage-web',
          data: { type: 'updateSetting', payload: fields },
        })
        .then(res => {
          const { code, msg } = res.result
          if (code === 0) {
            message.success('更新成功！')
          } else {
            message.error(msg)
          }
        })
    })
  }

  return () => (
    <Tabs v-model={[state.activeTabs, 'activeKey']} onTabClick={handleTabClick}>
      <Tabs.TabPane key="1" tab="基本设置">
        <Spin spinning={state.loading}>
          <Form layout="vertical">
            <Form.Item
              label={<span class={styles.form_title}>走进软通动力URL</span>}
              {...validateInfos.aboutUrl}
            >
              <Input
                v-model={[state.settingForm.aboutUrl, 'value', ['trim']]}
                placeholder="仅支持 mp.weixin.qq.com 开头的链接"
              />
            </Form.Item>

            <Form.Item
              label={<span class={styles.form_title}>产品介绍URL</span>}
              {...validateInfos.productUrl}
            >
              <Input
                v-model={[state.settingForm.productUrl, 'value', ['trim']]}
                placeholder="仅支持 mp.weixin.qq.com 开头的链接"
              />
            </Form.Item>

            <Form.Item
              label={<span class={styles.form_title}>团队介绍URL</span>}
              {...validateInfos.teamUrl}
            >
              <Input
                v-model={[state.settingForm.teamUrl, 'value', ['trim']]}
                placeholder="仅支持 mp.weixin.qq.com 开头的链接"
              />
            </Form.Item>

            <Form.Item
              label={<span class={styles.form_title}>产品认证URL</span>}
              {...validateInfos.solutionUrl}
            >
              <Input
                v-model={[state.settingForm.solutionUrl, 'value', ['trim']]}
                placeholder="仅支持 mp.weixin.qq.com 开头的链接"
              />
            </Form.Item>

            <Form.Item
              label={<span class={styles.form_title}>客服手机号</span>}
              {...validateInfos.customerTell}
            >
              <Input
                v-model={[state.settingForm.customerTell, 'value']}
                type="tel"
                placeholder="请输入手机号..."
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" onClick={handleSubmit}>
                保存
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Tabs.TabPane>

      <Tabs.TabPane key="2" tab="首页banner图">
        <Space>
          <Button type="primary" onClick={handleAddBanner}>
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
          columns={Columns}
          scroll={{ x: true }}
          loading={state.bannerLoading}
          dataSource={state.bannerList}
          pagination={false}
          rowSelection={{
            selectedRowKeys: state.selectedRowKeys,
            onChange: (selectedRowKeys: ColumnKey[]) => {
              state.selectedRowKeys = selectedRowKeys
            },
          }}
          style={{ marginTop: '16px' }}
        >
          {{
            // 首页banner图
            imgUrl: ({ record }: { record: IBannerItem }) => (
              <img class={styles.img_item} src={record.imgUrl} />
            ),
            // 创建时间
            createTime: ({ text }: { text: IBannerItem['_createTime'] }) =>
              text && moment(text).format('YYYY-MM-DD HH:mm'),
            // 操作
            operation: ({ record }: { record: IBannerItem }) => (
              <>
                <a onClick={() => handleUpdate(record)}>编辑</a>
                <Divider type="vertical"></Divider>
                <a onClick={() => window.open(record.detailUrl, '_blank')}>
                  查看链接
                </a>
              </>
            ),
          }}
        </Table>

        <Modal
          v-model={[state.modalVisible, 'visible']}
          title={modalTitle.value}
          onCancel={hanldeCancel}
          onOk={hanldeOK}
          width={900}
        >
          <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Row>
              <Col span="24">
                <Form.Item label="产品图片" {...bannerFormValidateInfos.imgId}>
                  <ImgUpload
                    v-models={[
                      [state.modalForm.imgId, 'fileID'],
                      [state.modalForm.imgUrl, 'imageUrl'],
                    ]}
                    relativePath="home_banner"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span="24">
                <Form.Item
                  label="链接地址"
                  {...bannerFormValidateInfos.detailUrl}
                >
                  <Input
                    v-model={[state.modalForm.detailUrl, 'value', ['trim']]}
                    placeholder="仅支持 mp.weixin.qq.com 开头的链接"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span="24">
                <Form.Item label="排序" {...bannerFormValidateInfos.order}>
                  <InputNumber
                    v-model={[state.modalForm.order, 'value']}
                    min={0}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Tabs.TabPane>
    </Tabs>
  )
})
