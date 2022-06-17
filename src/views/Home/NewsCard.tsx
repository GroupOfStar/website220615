import { defineComponent, PropType } from 'vue'
import { Card } from 'ant-design-vue'
import styles from './index.module.less'
import { MoreOutlined, SendOutlined } from '@ant-design/icons-vue'
import { INewsItem } from './interface'
import List from '@/components/List'

/** NewsCard组件propsType */
const NewsCardPropsDefine = {
  title: {
    type: String,
    required: true,
  },
  dataSource: {
    type: Object as PropType<Array<INewsItem>>,
    required: true,
  },
  bordered: {
    type: Boolean,
  },
} as const

/** 新闻公告组件 */
export default defineComponent({
  name: 'NewsCard',
  props: NewsCardPropsDefine,
  setup(props) {
    return () => (
      <div class={styles.new_com_warper}>
        <Card
          size="small"
          bordered={props.bordered}
          title={
            <>
              <SendOutlined class={styles.arrow_icon} />
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
          <List dataSource={props.dataSource} />
        </Card>
      </div>
    )
  },
})
