import { defineComponent, onMounted } from 'vue'
import { Chart } from '@antv/g2'
import { Typography } from 'ant-design-vue'

const data = [
  { type: '1月', value: 0 },
  { type: '2月', value: 0 },
  { type: '3月', value: 0 },
  { type: '4月', value: 1 },
  { type: '5月', value: 2 },
  { type: '6月', value: 5 },
  { type: '7月', value: 0 },
  { type: '8月', value: 0 },
  { type: '9月', value: 0 },
  { type: '10月', value: 0 },
  { type: '11月', value: 0 },
  { type: '12月', value: 0 },
]
const data2 = [
  { type: '1月', value: 0 },
  { type: '2月', value: 0 },
  { type: '3月', value: 1 },
  { type: '4月', value: 0 },
  { type: '5月', value: 2 },
  { type: '6月', value: 0 },
  { type: '7月', value: 0 },
  { type: '8月', value: 0 },
  { type: '9月', value: 0 },
  { type: '10月', value: 0 },
  { type: '11月', value: 0 },
  { type: '12月', value: 0 },
]

/** ChartLine组件propsType */
const ChartLinePropsDefine = {
  /** 是否是主账户 */
  isAdmin: {
    type: Boolean,
    default: true,
  },
} as const

export default defineComponent({
  name: 'ChartLine',
  props: ChartLinePropsDefine,
  setup(props) {
    console.log('props', props)
    onMounted(() => {
      const chart = new Chart({
        container: 'container',
        autoFit: true,
        height: 230,
        padding: [30, 20, 30, 30],
      })
      chart.data(props.isAdmin ? data : data2)
      chart.scale('value', {
        alias: '天数',
      })

      chart.axis('type', {
        tickLine: {
          alignTick: false,
        },
      })
      chart.axis('value', true)

      chart.tooltip({
        showMarkers: false,
      })
      chart.interval().position('type*value')
      chart.interaction('element-active')
      chart.render()
    })
    return () => (
      <div style={{ textAlign: 'center' }}>
        <Typography.Text>公出统计图</Typography.Text>
        <div id="container"></div>
      </div>
    )
  },
})
