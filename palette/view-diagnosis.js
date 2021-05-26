import {
  titleHandle,
  diagnosisTitleHandle, diagnosisContentHandle,
  businessShadowHandle
} from './global'
export const diagnosisHandle = (info, diagnosis, height) => {
  const view = []
  // 标题
  view.push(titleHandle('店铺诊断', height + 10))
  height += 46 + 10
  // 商圈店铺
  const len = info.length
  height += 20
  for (let i = 0; i < len; i++) {
    if (diagnosis.includes(i) || diagnosis.includes(String(i))) {
      let itemHeight = 50
      const item = info[i]
      const title = diagnosisTitleHandle(item.title, height + 25)
      const content = diagnosisContentHandle(item.content, height + 25 + 40 + 20)
      itemHeight += 40 + 20 + Math.ceil(item.content.length / 28) * 36
      // business 背景阴影
      const bgShadow = businessShadowHandle('diagnosis-item' + i, itemHeight, height)

      // 加入view数组
      view.push(bgShadow)
      view.push(title)
      view.push(content)
      // view 高度计算
      height += itemHeight + 30
    }
  }

  return {view, viewHeight: height}
}