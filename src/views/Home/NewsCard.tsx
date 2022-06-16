import { defineComponent, PropType } from 'vue'
import { Card } from 'ant-design-vue'
import styles from './index.module.less'
import { MoreOutlined, SendOutlined } from '@ant-design/icons-vue'
import { INewsItem } from './interface'

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
          bordered={false}
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
          <ul class={styles.notice_content}>
            {props.dataSource.map(item => (
              <li key={item.id}>
                <div class={styles.notice_item_warper}>
                  <div class={styles.notice_item_warper_title}>
                    {item.title}
                  </div>
                  <div class={styles.notice_item_warper_time}>{item.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    )
  },
})
