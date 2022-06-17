declare module '*.css'
declare module '*.less'

declare const cloud: {
  Cloud: new (props: {
    identityless: boolean
    resourceAppid: string
    resourceEnv: string
  }) => WxCloud
}

interface WxCloud {
  init: <R>() => Promise<R>
  callFunction<R>(param: { name: string; [keyProps: string]: any }): Promise<R>
  uploadFile<T = any>(param: {
    cloudPath: string
    file: File
    config?: Object
    success?(...args: any): void
    fail?(...args: any): void
    complete?(...args: any): void
  }): Promise<T>
  deleteFile<R = any>(param: { fileList: string[] }): Promise<R>
  getTempFileURL<R = any>(param: { fileList: string[] }): Promise<R>
}

interface WxResponseDefine<T = undefined> {
  errMsg: string
  requestID: string
  result: {
    code: number
    msg: string
    data: T
  }
}

interface WxPageRequestParams {
  current: number
  pageSize: number
  total?: number
}

interface WxPageResDefine<T = any> extends WxPageRequestParams {
  list: T
}

interface IPageRequestParams {
  page: number
  limit: number
}

interface IPagePropType {
  currPage?: number
  pageSize?: number
  totalCount?: number
}

interface IResponseDefine<T = undefined> {
  data: T
  status: number
  statusText: string
}

type PageDataDefine<T> = Required<IPagePropType> & { list: T[] }

/**
 * 下拉项、lookUp、状态的枚举接口
 * @interface IStatusEnum
 * @template T
 */
interface IStatusEnum<T = string> {
  title: string
  value: T
  color?: string
  icon?: import('vue').VNode
}

/** 表格列配置 */
type ColumnProps = import('ant-design-vue/lib/table/interface').ColumnsType

/** 表格的key类型 */
type ColumnKey = import('ant-design-vue/lib/table/interface').ColumnType['key']
