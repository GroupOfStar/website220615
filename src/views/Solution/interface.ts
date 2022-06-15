import { IDictItem } from '../Dict/interface'

/** 表格行数据 */
export interface ISolutionItem {
  /** 产品Id */
  _id?: string
  /** 产品标题 */
  title?: string
  /** 产品logo Id */
  logo?: string
  /** 产品logo地址 */
  logoUrl?: string
  /** 所属*/
  dictItemId?: string
  /** 详情类型 1 链接地址 2 富文本 */
  detailType?: 1 | 2
  /** 详情描述 */
  details?: string
  /** 详情链接 */
  detailUrl?: string
  /** 创建时间 */
  _createTime?: object
}

/** 弹窗类型 add新增 update修改 view查看 */
export type IModalType = 'add' | 'update' | 'view'

/** 搜索类型 */
export type ISearchParams = Pick<ISolutionItem, 'title' | 'dictItemId'>

export interface IState {
  /** 表格loading */
  loading: boolean
  /** 表格数据 */
  pageData: WxPageResDefine<ISolutionItem[]>
  /** 已选择的表格行key */
  selectedRowKeys: ColumnKey[]
  /** 搜索form */
  searchForm: ISearchParams
  /** 弹窗visible */
  modalVisible: boolean
  /** 弹窗form */
  modalForm: ISolutionItem
  /** 弹窗loading*/
  modalLoading: boolean
  /** 弹窗类型 */
  modalType: IModalType
  /** 分类list */
  solutionGroup: IDictItem[]
}
