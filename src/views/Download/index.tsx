import { Docx, Xlsx, Pptx } from '@/assets/icons'
import { Divider, Input, message, Modal, Space, Table } from 'ant-design-vue'
import { ColumnType } from 'ant-design-vue/lib/table/interface'
import { defineComponent, reactive } from 'vue'

/** 文件columns */
const tableColumns: ColumnProps = [
  { title: '文件名', dataIndex: 'name' },
  { title: '文件大小', dataIndex: 'size' },
  { title: '发布时间', dataIndex: 'createDate' },
  { title: '操作', dataIndex: 'operation' },
]
/** 文件list */
const fileList = [
  {
    id: 1,
    name: '中信银行岳磊任职通知',
    type: 'pdf',
    size: '545.6K',
    createDate: '2021年4月13日',
  },
  {
    id: 9,
    name: '大理分行关于切实加强疫情防控的通知',
    type: 'pdf',
    size: '14.7K',
    createDate: '2021年7月30日',
  },
  {
    id: 8,
    name: '总行审计公示',
    type: 'pdf',
    size: '13.4K',
    createDate: '2021年9月8日',
  },
  {
    id: 7,
    name: '大理分行关于进一步规范宣传费用使用的通知',
    type: 'pdf',
    size: '13.5K',
    createDate: '2022年1月19日',
  },
  {
    id: 11,
    name: '关于进一步规范大理分行员工考勤管理的通知',
    type: 'pdf',
    size: '1M',
    createDate: '2022年2月15日',
  },
  {
    id: 4,
    name: '大理分行关于周末及节假日暂停柜面业务的公告',
    type: 'pdf',
    size: '576.5K',
    createDate: '2022年2月24日',
  },
  {
    id: 6,
    name: '大理分行2022年第二批案防和员工行为飞行检查情况的通报',
    type: 'pdf',
    size: '14.5K',
    createDate: '2022年4月12日',
  },
  {
    id: 5,
    name: '大理分行关于规范公文的通知',
    type: 'pdf',
    size: '16.1K',
    createDate: '2022年4月13日',
  },
  {
    id: 12,
    name: '关于做好人行“稳定预期、强信心”政策专题宣传及信息报送的通知',
    type: 'pdf',
    size: '994K',
    createDate: '2022年4月28日',
  },
  {
    id: 2,
    name: '云南众焱通源天然气开发有限公司授信文件',
    type: 'pdf',
    size: '845.4K',
    createDate: '2022年5月11日',
  },
  {
    id: 3,
    name: '大理中翌房地产开发有限公司授信文件',
    type: 'pdf',
    size: '858.3K',
    createDate: '2022年5月11日',
  },
  {
    id: 10,
    name: '中信年度转授权、单项授权文件',
    type: 'pdf',
    size: '938K',
    createDate: '2022年7月22日',
  },
]

type IModalType = 'show' | 'download'

interface IState {
  modalVisible: boolean
  modalType: IModalType
  pdValue?: string
  currentRecord: {
    id?: number
    name?: string
    type?: 'pdf' | 'docx' | 'xlsx'
    size?: string
    createDate?: string
  }
}

/** 文件下载 */
export default defineComponent(function Download() {
  const state = reactive<IState>({
    modalVisible: false,
    modalType: 'show',
    pdValue: undefined,
    currentRecord: {},
  })

  /** 打开弹窗 */
  const onShowModal = (record: any, type: IModalType) => {
    state.modalType = type
    state.currentRecord = record
    state.modalVisible = true
  }

  /** 弹窗取消 */
  const onModalCancel = () => {
    state.pdValue = undefined
    state.modalVisible = false
  }

  /** 弹窗确认 */
  const onModalOK = () => {
    if (state.pdValue === 'YL767676') {
      const adom = document.createElement('a')
      adom.href = `/${state.currentRecord.name}.${state.currentRecord.type}`
      if (state.modalType === 'download') {
        adom.download = state.currentRecord.name || ''
      }
      adom.target = '_blank'
      adom.click()
      adom.remove()
      onModalCancel()
    } else {
      message.error('下载密码错误！')
    }
  }

  return () => (
    <div style={{ padding: '48px' }}>
      <Table
        rowKey="id"
        size="small"
        bordered
        columns={tableColumns}
        dataSource={fileList}
      >
        {{
          bodyCell: ({
            text,
            record,
            column,
          }: {
            text: string
            record: any
            column: ColumnType
          }) => {
            switch (column.dataIndex) {
              case 'name':
                return (
                  <Space>
                    <img
                      src={record.type === 'docx' ? Docx : Pptx}
                      style={{ width: '22px', height: '22px' }}
                    />
                    {text}
                  </Space>
                )
              case 'operation':
                return (
                  <>
                    <a onClick={() => onShowModal(record, 'show')}>预览</a>
                    <Divider type="vertical" />
                    <a onClick={() => onShowModal(record, 'download')}>下载</a>
                  </>
                )
              default:
                return text
            }
          },
        }}
      </Table>

      <Modal
        v-model={[state.modalVisible, 'visible']}
        title="请输入密码"
        width={400}
        onOk={onModalOK}
        onCancel={onModalCancel}
      >
        <Input.Password
          v-model={[state.pdValue, 'value']}
          placeholder="请输入下载密码.."
        />
      </Modal>
    </div>
  )
})
