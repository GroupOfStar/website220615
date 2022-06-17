import { Docx, Xlsx } from '@/assets/icons'
import { Input, message, Modal, Space, Table, Typography } from 'ant-design-vue'
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
    name: '考核日报20220608',
    type: 'xlsx',
    size: '318.4KB',
    createDate: '2022-6-16 22:54',
  },
  {
    id: 2,
    name: '考核日报20220607',
    type: 'xlsx',
    size: '318.4KB',
    createDate: '2016-6-16 22:54',
  },
  {
    id: 3,
    name: '共业务喜报通报202206',
    type: 'docx',
    size: '1MB',
    createDate: '2022-6-16 22:54',
  },
  {
    id: 4,
    name: '党委会碰头会督办事项（5月16日会议）',
    type: 'docx',
    size: '2.24MB',
    createDate: '2021-9-12 18:54',
  },
  {
    id: 5,
    name: '关于分行业加强企业疫情防控保障生产经营的通知书',
    type: 'docx',
    size: '1.72MB',
    createDate: '2022-6-15 22:54',
  },
]

/** 文件下载 */
export default defineComponent(function Download() {
  const state = reactive({
    modalVisible: false,
    pdValue: undefined,
    currentRecord: {
      type: undefined,
    },
  })

  /** 文件下载 */
  const onDownloadClick = (record: any) => {
    console.log('record :>> ', record)
    state.currentRecord = record
    state.modalVisible = true
  }

  /** 弹窗取消 */
  const onModalCancel = () => {
    state.modalVisible = false
  }

  /** 弹窗确认 */
  const onModalOK = () => {
    if (state.pdValue === '123') {
      const adom = document.createElement('a')
      if (state.currentRecord.type === 'docx') {
        adom.href = '/党委会碰头会督办事项0516.doc'
        adom.download = '党委会碰头会督办事项0516'
      } else {
        adom.href = '/考核日报20220608.xls'
        adom.download = '考核日报20220608'
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
                      src={record.type === 'docx' ? Docx : Xlsx}
                      style={{ width: '22px', height: '22px' }}
                    />
                    {text}
                  </Space>
                )
              case 'operation':
                return <a onClick={() => onDownloadClick(record)}>下载</a>
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
        <Typography.Text disabled>密码: 123</Typography.Text>
      </Modal>
    </div>
  )
})
