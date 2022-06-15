/** 字典项行数据 */
export interface IDictItem {
  /** ID */
  _id?: string
  /** 分类 \ 字典项 */
  name?: string
  /** 描述 */
  description?: string
  /** 所属字典分类 */
  dictId?: string
}

/** 字典行数据 */
export interface IDict extends Omit<IDictItem, 'dictId'> {
  /** 字典项List */
  dictItemList: IDictItem[]
}

/** 操作目标  dict:分类 dictItem:字典项目 */
export type IActionTarget = 'dict' | 'dictItem'

/** 弹窗类型 add新增 update修改 view查看 */
export type IModalType = 'add' | 'update' | 'view'

export interface IState {
  /** 表格loading */
  loading: boolean
  /** 表格数据 */
  dictData: IDict[]
  /** 弹窗visible */
  modalVisible: boolean
  /** 弹窗loading */
  modalLoading: boolean
  /** 弹窗form */
  modalForm: IDictItem
  /** 操作目标 */
  actionTarget: IActionTarget
  /** 弹窗类型 */
  modalType: IModalType
}
