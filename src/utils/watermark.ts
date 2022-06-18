/** 水印配置 */
interface IWatermarkConfig {
  /** 文本1 */
  text1: string
  /** 文本2 */
  text2: string
  /** x轴起始位置 */
  start_x?: number
  /** y轴起始位置 */
  start_y?: number
  /** x轴间距 */
  space_x?: number
  /** y轴间距 */
  space_y?: number
  /** 宽度 */
  width?: number
  /** 长度 */
  height?: number
  /** 字体 */
  fontSize?: number
  /** 字色 */
  color: string
  /** 透明度 */
  alpha?: number
  /** 倾斜度 */
  rotate?: number
}

/** 页面水印 */
export default function watermark(
  element: HTMLElement,
  config?: IWatermarkConfig
) {
  if (!element) return
  // 替换默认配置
  const _config = Object.assign(
    {
      text1: 'text', //文本1
      text2: 'text', // 文本2
      start_x: 0, // x轴起始位置
      start_y: 0, // y轴起始位置
      space_x: 100, // x轴间距
      space_y: 50, // y轴间距
      width: 210, // 宽度
      height: 80, // 长度
      fontSize: 20, // 字体
      color: '#aaa', // 字色
      alpha: 0.4, // 透明度
      rotate: 15, // 倾斜度
    },
    config
  )
  // 获取元素的坐标
  const getOffset = (el: any): any => {
    if (el.offsetParent) {
      return {
        x: el.offsetLeft + getOffset(el.offsetParent).x,
        y: el.offsetTop + getOffset(el.offsetParent).y,
      }
    } else {
      return {
        x: el.offsetLeft,
        y: el.offsetTop,
      }
    }
  }
  // 替换默认配置
  // if (arguments.length === 2 && typeof arguments[1] === 'object') {
  //   const src = (arguments[1] || {}) as IWatermarkConfig
  //   for (let key in src) {
  //     if (src[key] && _config[key] && src[key] === _config[key]) {
  //       continue
  //     } else if (src[key]) {
  //       _config[key] = src[key]
  //     }
  //   }
  // }
  // 节点的总宽度
  const total_width = element.scrollWidth
  // 节点的总高度
  const total_height = element.scrollHeight
  console.log('total_height', total_height)
  // 创建文本碎片，用于包含所有的插入节点
  const mark = document.createDocumentFragment()
  // 水印节点的起始坐标
  const position = getOffset(element)
  let x = position.x + _config.start_x,
    y = position.y + _config.start_y
  // 先循环y轴插入水印
  do {
    // 再循环x轴插入水印
    do {
      // 创建单个水印节点
      const item = document.createElement('div')
      item.className = 'watermark-item'
      // 设置节点的样式
      item.style.position = 'absolute'
      item.style.zIndex = '9999'
      item.style.left = `${x}px`
      item.style.top = `${y}px`
      item.style.width = `${_config.width}px`
      item.style.height = `${_config.height}px`
      item.style.fontSize = `${_config.fontSize}px`
      item.style.color = _config.color
      item.style.textAlign = 'center'
      item.style.opacity = `${_config.alpha}`
      item.style.filter = `alpha(opacity=${_config.alpha * 100})`
      // item.style.filter = `opacity(${_config.alpha * 100}%)`;
      item.style.webkitTransform = `rotate(-${_config.rotate}deg)`
      // item.style.MozTransform = `rotate(-${_config.rotate}deg)`
      // item.style.msTransform = `rotate(-${_config.rotate}deg)`
      // item.style.OTransform = `rotate(-${_config.rotate}deg)`
      item.style.transform = `rotate(-${_config.rotate}deg)`
      item.style.pointerEvents = 'none' //让水印不遮挡页面的点击事件
      // 创建text1水印节点
      const text1 = document.createElement('div')
      text1.appendChild(document.createTextNode(_config.text1))
      item.append(text1)
      // 创建text2水印节点
      const text2 = document.createElement('div')
      text2.appendChild(document.createTextNode(_config.text2))
      item.append(text2)
      // 添加水印节点到文本碎片
      mark.append(item)
      // x坐标递增
      x = x + _config.width + _config.space_x
      // 超出文本右侧坐标停止插入
    } while (total_width + position.x > x + _config.width)
    // 重置x初始坐标
    x = position.x + _config.start_x
    // y坐标递增
    y = y + _config.height + _config.space_y
    // 超出文本底部坐标停止插入
  } while (total_height + position.y > y + _config.height)
  // 插入文档碎片
  element.append(mark)
}
