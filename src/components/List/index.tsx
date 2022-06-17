import { defineComponent, PropType } from 'vue'
import { RightOutlined } from '@ant-design/icons-vue'
import { IListItem } from './interface'
import styles from './index.module.less'

export type IListTheme = 'light' | 'dark'

/** List组件propsType */
const ListPropsDefine = {
  /** 数据集 */
  dataSource: {
    type: Object as PropType<Array<IListItem>>,
    required: true,
  },
  /** 主题 */
  theme: {
    type: String as PropType<IListTheme>,
    default: 'light',
  },
  /** 显示箭头 */
  showArrow: {
    type: Boolean,
    default: false,
  },
} as const

/** 文章ul组件 */
export default defineComponent({
  name: 'List',
  props: ListPropsDefine,
  setup(props) {
    return () => (
      <ul class={styles.st_list_ul}>
        {props.dataSource.map(item => (
          <li
            key={item.id}
            class={[
              styles.st_list_li,
              {
                [styles.st_list_li_dark]: props.theme === 'dark',
              },
            ]}
          >
            <div class={styles.st_list_li_item}>
              <div class={styles.st_list_li_item_title}>{item.title}</div>
              <div class={styles.st_list_li_item_time}>
                {item.time}
                {props.showArrow && (
                  <RightOutlined style={{ fontSize: '12px' }} />
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  },
})
