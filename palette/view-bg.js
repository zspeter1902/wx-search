import {commonColor} from './global'
export const background = [
  {
    type: 'image',
    url: '/images/bg_top.png',
    css: {
      top: '0rpx',
      right: '0rpx',
      width: '365rpx',
      height: '358rpx',
      mode: 'aspectFill'
    },
  },
  {
    type: 'image',
    url: '/images/bg_bottom.png',
    css: {
      bottom: '0rpx',
      left: '0rpx',
      width: '750rpx',
      height: 'auto',
      mode: 'aspectFill'
    }
  },
  {
    type: 'text',
    text: "商圈查",
    css: [{
      width: '750rpx',
      top: `50rpx`,
      fontSize: '36rpx',
      textAlign: 'center',
      lineHeight: '50rpx',
    }, commonColor],
  }
]
