import { defineComponent, PropType } from 'vue'
import { Button } from 'ant-design-vue'
import styles from './index.module.less'
import List from '@/components/List'
import { IListItem } from '@/components/List/interface'

/** ColorCard组件propsType */
const ColorCardPropsDefine = {
  title: {
    type: String,
    required: true,
  },
  bgColor: {
    type: String,
    required: true,
  },
  dataSource: {
    type: Object as PropType<Array<IListItem>>,
    required: true,
  },
} as const

/** 颜色卡片组件 */
export default defineComponent({
  name: 'ColorCard',
  props: ColorCardPropsDefine,
  setup(props) {
    return () => (
      <div
        class={styles.color_card_item}
        style={{ backgroundColor: props.bgColor }}
      >
        <div class={styles.color_card_title}>{props.title}</div>
        <List
          dataSource={props.dataSource}
          style="padding: 0 12px 0 28px;"
          theme="dark"
        />
        <div class={styles.color_card_action}>
          <Button ghost size="small">
            查看更多
          </Button>
        </div>
      </div>
    )
  },
})
