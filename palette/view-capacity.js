import {
  capacityEntries,
  titleHandle,
  capacityStarHandle, diagnosisContentHandle,
  businessShadowHandle
} from './global'
export const capacityHandle = (info, capacity, height) => {
  const view = []
  // 标题
  view.push(titleHandle('商圈容量', height + 10))
  height += 46 + 10
  // 商圈店铺
  const len = info.length
  height += 20
  for (let i = 0; i < len; i++) {
    if (capacity == i) {
      let itemHeight = 62
      const item = info[i]
      const stars = capacityEntries[item.title]
      const starArr = []
      for (let si = 0; si < stars; si++) {
        starArr.push(capacityStarHandle(si, height + 26))
      }
      itemHeight += 38
      const content = diagnosisContentHandle(item.content, height + 26 + 38 + 32)
      itemHeight += 32 + Math.ceil(item.content.length / 28) * 36
      // business 背景阴影
      const bgShadow = businessShadowHandle('capacity-item' + i, itemHeight, height)
      // 加入view数组
      view.push(bgShadow)
      view.push(...starArr)
      view.push(content)
      // view 高度计算
      height += itemHeight + 30
    }
  }

  return {view, viewHeight: height}
}