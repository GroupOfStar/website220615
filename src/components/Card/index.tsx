import { defineComponent, PropType, VNodeChild } from 'vue'
import { Card } from 'ant-design-vue'
import { MoreOutlined, SendOutlined } from '@ant-design/icons-vue'
import { cardProps } from 'ant-design-vue/lib/card/Card'
import styles from './index.module.less'

/** Card组件propsType */
const CardPropsDefine = { ...cardProps() } as const

/** 封装的卡片组件 */
export default defineComponent({
  name: 'Card',
  props: CardPropsDefine,
  setup(props, { slots }) {
    return () => (
      <div class={styles.ts_card}>
        <Card
          {...props}
          size="small"
          bordered={!props.bordered}
          title={
            <>
              <SendOutlined class={styles.ts_card_arrow_icon} />
              {props.title}
            </>
          }
          extra={
            <a href="#">
              更多
              <MoreOutlined />
            </a>
          }
        >
          {slots}
        </Card>
      </div>
    )
  },
})
