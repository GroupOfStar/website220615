import { IDictItem } from '../Dict/interface'

/** 表格行数据 */
export interface IProjectItem {
  /** 产品Id */
  _id?: string
  /** 产品标题 */
  title?: string
  /** 产品副标题 */
  subtitle?: string
  /** 产品图片 */
  logo?: string
	/** 产品图片临时url */
  logoUrl?: string
  /** 所属*/
  dictItemId?: string
  /** 详情类型 1 链接地址 2 富文本 */
  detailType?: 1 | 2
  /** 详情描述 */
  details?: string
  /** 产品介绍链接 */
  detailUrl?: string
  /** 用户手册链接 */
  manualUrl?: string
  /** FAQ链接 */
  faqUrl?: string
  /** 华为云严选 */
  huaweiMall?: string
  /** 创建时间 */
  _createTime?: object
}

/** 弹窗类型 add新增 update修改 view查看 */
export type IModalType = 'add' | 'update' | 'view'

/** 搜索类型 */
export type ISearchParams = Pick<IProjectItem, 'title' | 'dictItemId'>

export interface IState {
  /** 表格loading */
  loading: boolean
  /** 表格数据 */
  pageData: WxPageResDefine<IProjectItem[]>
  /** 已选择的表格行key */
  selectedRowKeys: ColumnKey[]
  /** 搜索form */
  searchForm: ISearchParams
  /** 弹窗visible */
  modalVisible: boolean
  /** 弹窗form */
  modalForm: IProjectItem
  /** 弹窗loading*/
  modalLoading: boolean
  /** 弹窗类型 */
  modalType: IModalType
  /** 项目分组 */
  projectGroup: IDictItem[]
}
