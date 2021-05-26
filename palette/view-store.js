import {
  startLeft,
  titleHandle,
  storeLogoHandle,
  storeTitleHandle, storeTitleContentHandle,
   storeActivityTitleHandle,
   tagHandle, tagContentHandle,
   goodHandle, bannerHandle
} from './global'
export const storeHandle = (info, bannerH1, bannerH2) => {
  const view = []
  let height = 100 //rpx
  // 标题
  view.push(titleHandle('店铺信息', 158))
  height += 46 + 58
  // logo
  view.push(storeLogoHandle('store-logo', info.logo, 232))
  height += 200 + 20
  // info
  const titles = [
    [ '店铺名称:', info.rest_name ],
    [ '营业时间:', info.opening_hours ],
    [ '店铺评分:', info.score ],
    [ '店铺月销:', info.monthly_sales ],
    [ '配送方式:', `${info.deliveryMode}  ${info.min_price_tip} ${info.shipping_fee_tip}` ]
  ]
  for (let i = 0; i < titles.length; i++) {
    const index = i >=3 ? i - 1 : i
    view.push(storeTitleHandle(index, titles[i][0], 'store-logo', 232, i === 3))
    view.push(storeTitleContentHandle(index, titles[i][1], 'store-logo', 232, i === 3))
  }
  // 活动
  view.push(storeActivityTitleHandle('activity', 452))
  const len = info.activities.length
  for (let i = 0; i < len; i++) {
    view.push(tagHandle(i, info.activities[i], 'activity', 448))
    view.push(tagContentHandle(i, info.activities[i], 'activity', 452))
  }

  height += 20 + 56 + (56 * Math.floor(len / 4))
  // banner
  if (bannerH1) {
    view.push(bannerHandle(info.posters[0], height + 30))
    height += bannerH1 + 30
  }
  if (bannerH2) {
    view.push(bannerHandle(info.posters[1], height + 30 + 18 + bannerH1))
    height += bannerH2 + 18
  }
  // 餐品列表
  let goodIndex = 1
  let goodsHeight = 0
  for (const img of info.skuPicture) {
    view.push(goodHandle(goodIndex-1, height + 20, img))
    goodsHeight =  Math.ceil(goodIndex / 4) * (162 + 10)
    if (goodIndex === 8) {
      break
    }
    goodIndex++
  }
  height += 20 + goodsHeight
  return {view, viewHeight: height}
}