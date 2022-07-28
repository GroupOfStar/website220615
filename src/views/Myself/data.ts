import { IListItem } from '@/components/List/interface'
import { WorkExperienceItem } from "./interface";

// 待办事项列表
export const todoList: IListItem[] = [
  { id: 1, title: '昆明分行2021年各职能部门内部满意度评价 上半年-按指标评估', time: '2021年8月6日' },
  { id: 2, title: '昆明分行2020年考核部门员工 年度-按指标评估', time: '2021年1月13日' },
]

// 成长历程
export const growthProcess: IListItem[] = [
  { id: 1, title: '中信银行大理分行 零售银行部 副总经理 兼苍山路支行负责人 二级分行副行长级', time: '2021-04-13' },
  { id: 2, title: '中信银行大理分行 苍山路支行行长室 支行行长 二级分行副行长级', time: '2019-08-12' },
  { id: 3, title: '中信银行大理分行 苍山路支行行长室 负责人（代为履行支行负责人职责） 二级分行副行长级', time: '2019-05-20' },
  { id: 4, title: '中信银行大理分行 零售银行部 零售银行部副总经理 二级分行部门副经理级', time: '2017-04-18' },
  { id: 5, title: '中信银行大理分行 零售银行部 拟任：副总经理 二级分行部门副经理级', time: '2015-11-10' },
  { id: 6, title: '农业银行大理洱河北路支行 大理洱河北路支行 大理洱河北路支行 行长', time: '2012-06-07' },
]

/** 工作经历data */
export const workExperiences: WorkExperienceItem[] = [
  { id: 1, startDate: '2005年07月14日', endDate: '2005年07月19日', workUnit: '农业银行大理分行', department: '大理鸳鸯浦街分理行', post: '储蓄柜员', rank: '无' },
  { id: 2, startDate: '2007年01月20日', endDate: '2009年06月05日', workUnit: '农业银行大理分行', department: '大理分行金融超市', post: '个贷客户经理', rank: '无' },
  { id: 3, startDate: '2009年06月06日', endDate: '2012年06月06日', workUnit: '农业银行大理分行', department: '个人金融部', post: '零售客户经理', rank: '无' },
  { id: 4, startDate: '2012年06月07日', endDate: '2019年09月23日', workUnit: '农业银行大理洱河北路支行', department: '大理洱河北路支行', post: '行长', rank: '行长' },
  { id: 5, startDate: '2015年09月23日', endDate: '2015年11月10日', workUnit: '待业', department: '无', post: '无', rank: '无' },
  { id: 6, startDate: '2015年11月10日', endDate: '2017年04月18日', workUnit: '中信银行大理分行', department: '零售银行部', post: '拟任：副总经理', rank: '二级分行部门副总经理级' },
  { id: 7, startDate: '2017年04月18日', endDate: '2019年05月20日', workUnit: '中信银行大理分行', department: '零售银行部', post: '零售银行部副总经理', rank: '二级分行部门副经理级' },
  { id: 8, startDate: '2019年05月20日', endDate: '2019年08月12日', workUnit: '中信银行大理分行', department: '苍山路支行行长室', post: '负责人（代为履行支行负责人职责）', rank: '二级分行副行长级' },
  { id: 9, startDate: '2019年08月12日', endDate: '2021年04月13日', workUnit: '中信银行大理分行', department: '苍山路支行行长室', post: '支行行长', rank: '二级分行副行长级' },
  { id: 9, startDate: '2021年04月13日', endDate: '2119年11月06日', workUnit: '中信银行大理分行', department: '零售银行部', post: '副总经理、苍山路支行负责人', rank: '二级分行副行长级' },
]