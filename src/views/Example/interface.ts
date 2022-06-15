/** 表格行数据 */
export interface IExampleItem {
  /** 产品Id */
  _id?: string
  /** 案例标题 */
  title?: string
  /** 案例图片id */
  logo?: string
  /** 案例图片临时url */
  logoUrl?: string
  /** 案例描述 */
  description?: string
  /** 详情链接 */
  detailUrl?: string
  /** 创建时间 */
  _createTime?: object
}

/** 弹窗类型 add新增 update修改 view查看 */
export type IModalType = 'add' | 'update' | 'view'

/** 搜索类型 */
export type ISearchParams = Pick<IExampleItem, 'title'>

export interface IState {
  /** 表格loading */
  loading: boolean
  /** 表格数据 */
  pageData: WxPageResDefine<IExampleItem[]>
  /** 已选择的表格行key */
  selectedRowKeys: ColumnKey[]
  /** 搜索form */
  searchForm: ISearchParams
  /** 弹窗visible */
  modalVisible: boolean
  /** 弹窗form */
  modalForm: IExampleItem
  /** 弹窗loading*/
  modalLoading: boolean
  /** 弹窗类型 */
  modalType: IModalType
}
