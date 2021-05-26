export const watermarkHandle = (height) => {
  const view = []
  // 水印
  const num = Math.ceil(height / 1334)
  const lastHeight = height % 1334
  for (let i = 0; i < num; i++) {
    view.push({
      type: 'image',
      url: '/images/watermark.png',
      css: {
        top: `${i * 1334}rpx`,
        left: '0rpx',
        width: '750rpx',
        height: `${i === num - 1 ? lastHeight : 1334}rpx`,
        mode: 'aspectFill'
      }
    })
  }
  return {view}
}