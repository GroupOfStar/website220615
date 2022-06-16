import { defineComponent } from 'vue'
import { Typography } from 'ant-design-vue'
import styles from './index.module.less'

/** Vacation组件propsType */
const VacationPropsDefine = {
  title: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
} as const

/** 假期组件 */
export default defineComponent({
  name: 'Vacation',
  props: VacationPropsDefine,
  setup(props) {
    return () => (
      <div class={styles.vacation_item}>
        <div class={styles.vacation_item_value}>
          <Typography.Text type="success">{props.value}</Typography.Text>
        </div>
        <div class={styles.vacation_item_year}>{props.title}</div>
      </div>
    )
  },
})
