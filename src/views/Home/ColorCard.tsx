import { defineComponent, PropType } from 'vue'
import { Button } from 'ant-design-vue'
import styles from './index.module.less'
import { INewsItem } from './interface'

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
    type: Object as PropType<Array<INewsItem>>,
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
        <ul class={styles.color_card_content}>
          {props.dataSource.map(item => (
            <li key={item.id}>
              <div class={styles.content_text}>{item.title}</div>
              <div class={styles.content_time}>{item.time}</div>
            </li>
          ))}
        </ul>
        <div class={styles.color_card_action}>
          <Button ghost size="small">
            查看更多
          </Button>
        </div>
      </div>
    )
  },
})
