import {
  titleHandle,
  businessLogoHandle,
  storeTitleHandle, storeTitleContentHandle,
   storeActivityTitleHandle,
   tagHandle, tagContentHandle,
   businessShadowHandle
} from './global'
export const businessHandle = (info, business, height) => {
  const view = []
  // 标题
  view.push(titleHandle('商圈店铺信息', height + 30))
  height += 46 + 30
  // 商圈店铺
  const len = info.length
  height += 20
  for (let i = 0; i < len; i++) {
    if (business.includes(i) || business.includes(String(i))) {
      let itemHeight = 40 + 34
      const item = info[i]
      // logo
      const logo = businessLogoHandle('business-logo' + i, item.logo, height + 40)
      itemHeight += 200
      // info
      const titles = [
        [ '店铺名称:', item.rest_name ],
        [ '营业时间:', item.opening_hours ],
        [ '店铺评分:', item.score ],
        [ '店铺月销:', item.monthly_sales ],
        [ '配送方式:', `${item.deliveryMode}  ${item.min_price_tip} ${item.shipping_fee_tip}` ]
      ]
      const infoArr = []
      for (let t = 0; t < titles.length; t++) {
        const index = t >=3 ? t - 1 : t
        infoArr.push(storeTitleHandle(index, titles[t][0], 'business-logo'+i, height + 40, t === 3))
        infoArr.push(storeTitleContentHandle(index, titles[t][1], 'business-logo'+i, height + 40, t === 3))
      }
      // 活动
      const activity = storeActivityTitleHandle('business-activity-'+i, height + 40 + 200 + 20)
      const activityLen = item.activities.length
      const activityArr = []
      for (let ai = 0; ai < activityLen; ai++) {
        activityArr.push(tagHandle(ai, item.activities[ai], 'business-activity-'+i, height + 40 + 200 + 20 - 4))
        activityArr.push(tagContentHandle(ai, item.activities[ai], 'business-activity-'+i, height + 40 + 200 + 20))
      }
      itemHeight += 20 + 40 + (56 * Math.floor(activityLen / 4))
      // business 背景阴影
      const bgShadow = businessShadowHandle('business-item' + i, itemHeight, height)
      // 加入view数组
      view.push(bgShadow)
      view.push(logo)
      view.push(...infoArr)
      view.push(activity)
      view.push(...activityArr)
      // view 高度计算
      height += itemHeight + 30
    }
  }

  return {view, viewHeight: height}
}