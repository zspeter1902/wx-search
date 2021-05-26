// 模块引入
import { background } from './view-bg'
import { storeHandle } from './view-store'
import { businessHandle } from './view-business'
import { diagnosisHandle } from './view-diagnosis'
import { capacityHandle } from './view-capacity'
import { watermarkHandle } from './view-watermark'
// 导出
export default class DownLoadFile {

  async palette(data) {
    let bannerHeight1, bannerHeight2;
    const storeInfo = data.storeInfo
    const businessItems = data.businessItems
    const diagnosisList = data.diagnosisList
    const capacityList = data.capacityList
    const formData = data.formData

    // 获取图片高度
    if (storeInfo.posters[0]) {
      await wx.getImageInfo({
        src: storeInfo.posters[0],
      }).then(res => {
        bannerHeight1 = (750 - (36 * 2)) * (res.height / res.width)
      })
    }
    if (storeInfo.posters[1]) {
      await wx.getImageInfo({
        src: storeInfo.posters[1],
      }).then(res => {
        bannerHeight2 = (750 - (36 * 2)) * (res.height / res.width)
      })
    }
    // 店铺信息
    const store = storeHandle(storeInfo, bannerHeight1, bannerHeight2)
    const storeView = store.view
    const storeHeight = store.viewHeight
    // 商圈店铺
    const business = businessHandle(businessItems, formData.business, storeHeight)
    const businessView = business.view
    const businessHeight = business.viewHeight
    // 店铺诊断
    const diagnosis = diagnosisHandle(diagnosisList, formData.diagnosis, businessHeight)
    const diagnosisView = diagnosis.view
    const diagnosisHeight = diagnosis.viewHeight
    // 商圈容量
    const capacity = capacityHandle(capacityList, formData.capacity, diagnosisHeight)
    const capacityView = capacity.view
    const capacityHeight = capacity.viewHeight
    // 水印
    const watermark = watermarkHandle(capacityHeight+220)
    const watermarkView = watermark.view
    // return
    return ({
      width: '750rpx',
      height: `${capacityHeight + 220}rpx`,
      background: '#fff',
      views: [...background, ...storeView, ...businessView, ...diagnosisView, ...capacityView, ...watermarkView],
    });
  }
}