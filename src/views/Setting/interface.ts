/** banner图item */
export interface IBannerItem {
  /** id */
  _id?: string
  /** 图片资源id */
  imgId?: string
  /** 图片临时访问链接 */
  imgUrl?: string
  /** 关联的url */
  detailUrl?: string
  /** 排序 */
  order?: number
  /** 创建时间 */
  _createTime?: string
}

/** 配置表单 */
export interface ISettingForm {
  /** 走进软通动力 */
  aboutUrl?: string
  /** 产品介绍 */
  productUrl?: string
  /** 团队介绍 */
  teamUrl?: string
  /** 产品认证 */
  solutionUrl?: string
  /** 客服手机号 */
  customerTell?: string
}

/** 弹窗类型 add新增 update修改 view查看 */
export type IModalType = 'add' | 'update'

export interface IState {
  /** Tabs的activeKey */
  activeTabs: '1' | '2'
  /** 页面loading */
  loading: boolean
  /** 配置表单 */
  settingForm: ISettingForm
  /** banner图loading */
  bannerLoading: boolean
  /** banner图片列表 */
  bannerList: IBannerItem[]
  /** 已选择的表格行key */
  selectedRowKeys: ColumnKey[]
  /** banner图modal */
  modalVisible: boolean
  /** 弹窗类型 */
  modalType: IModalType
  /** banner图操作弹窗 */
  modalForm: IBannerItem
}
