const commonColor = {
  color: '#333'
};
const startLeft = 36;
const startLeftSmall = 20;
const capacityEntries = {'五星': 5, '三星': 3, '一星': 1}
// 全局标题
const titleHandle = (title, posTop, posID) => {
  const titleView = {
    type: 'text',
    text: title,
    css: [{
      fontSize: '32rpx',
      fontWeight: 'bold',
      lineHeight: '45rpx',
      left: `${startLeft}rpx`,
      top: `${posTop}rpx`,
    }, commonColor],
  };
  if (posID) {
    titleView.css[0].top = [`${posTop}rpx`, posID]
  }
  return titleView;
}
// 店铺LOGO
const storeLogoHandle = (id, src, posTop, posID) => {
  const logoView = {
    id: id,
    type: 'image',
    url: src,
    css: {
      top: `${posTop}rpx`,
      left: `${startLeft}rpx`,
      width: '200rpx',
      height: '200rpx',
      mode: 'aspectFill',
      borderWidth: '1rpx',
      borderColor: '#979797'
    }
  };
  if (posID) {
    logoView.css[0].top = [`${posTop}rpx`, posID]
  }
  return logoView;
}

// 店铺信息title
const storeTitleHandle = (index, content, posID, height, inline) => {
  const marginLeft = posID.replace(/[^0-9]+/g, '') == '' ? 0 : 40
  const title = {
    type: 'text',
    text: content,
    css: [{
      fontSize: '24rpx',
      fontWeight: 'bold',
      left: [`${56 + marginLeft}rpx`, posID],
      top: `${54 * index + height}rpx`,
    }, commonColor],
  };
  if (inline) {
    title.css[0].left = [`${236 + marginLeft}rpx`, posID]
  }
  return title;
}
const storeActivityTitleHandle = (id, posTop, posID) => {
  const marginLeft = id.replace(/[^0-9]+/g, '') == '' ? 0 : 36
  const title = {
    id: id,
    type: 'text',
    text: '活动:',
    css: [{
      fontSize: '24rpx',
      fontWeight: 'bold',
      left: `${startLeft + marginLeft}rpx`,
      top: `${posTop}rpx`,
    }, commonColor],
  };
  if (posID) {
    title.css[0].top = [`${posTop}rpx`, posID]
  }
  return title;
}
// 店铺信息content
const storeTitleContentHandle = (index, content, posID, height, inline) => {
  const marginLeft = posID.replace(/[^0-9]+/g, '') == '' ? 0 : 40
  const titleContent = {
    type: 'text',
    text: content,
    css: [{
      fontSize: '24rpx',
      left: [`${176 + marginLeft}rpx`, posID],
      top: `${54 * index + height}rpx`,
      maxLines: 2
    }, commonColor],
  };
  if (inline) {
    titleContent.css[0].left = [`${356 + marginLeft}rpx`, posID]
  } else {
    if (marginLeft) {
      titleContent.css[0].width = '300rpx'
    } else {
      titleContent.css[0].width = '360rpx'
    }
  }
  return titleContent;
}
// 标签背景
const tagHandle = (index, content, posID, height) => {
  const i = index % 4
  const y = Math.floor(index / 4)
  const marginLeft = posID.replace(/[^0-9]+/g, '') != '' ? startLeftSmall + 52 : startLeft
  const tagRect = {
    type: 'rect',
    css: {
      width: `${120}rpx`,
      height: '40rpx',
      borderRadius: '4rpx',
      borderWidth: '1rpx',
      borderColor: '#FA9137',
      color: '#fff',
      scalable: true,
      left: [`${marginLeft + 2 + (20 * (i + 1)) + (120 * i)}rpx`, posID],
      top: `${height + (y * 56)}rpx`,
    }
  };
  return tagRect;
}
// 标签内容
const tagContentHandle = (index, content, posID, height) => {
  const i = index % 4
  const y = Math.floor(index / 4)
  const marginLeft = posID.replace(/[^0-9]+/g, '') != '' ? startLeftSmall + 52 : startLeft
  const tagContent = {
    type: 'text',
    text: content,
    css: {
      width: `${120}rpx`,
      height: '40rpx',
      fontSize: '24rpx',
      color: '#FA9137',
      textAlign: 'center',
      lineHeight: '40rpx',
      left: [`${marginLeft + 2 + (20 * (i + 1)) + (120 * i)}rpx`, posID],
      top: `${height + (y * 56)}rpx`,
      maxLines: 1
    }
  };
  return tagContent;
}
// banner
const bannerHandle = (img, posTop) => {
  return {
    type: 'image',
    url: img,
    css: {
      top: `${posTop}rpx`,
      left: `${startLeft}rpx`,
      width: '678rpx',
      height: 'auto',
      scalable: true
    }
  }
}
// 餐品列表
const goodHandle = (index, top, img) => {
  const i = index % 4
  const y = Math.floor(index / 4)
  return {
    type: 'image',
    url: img,
    css: {
      top: `${top + (10 * y) + (y * 162)}rpx`,
      left: `${startLeft + 172 * i}rpx`,
      width: '162rpx',
      height: '162rpx',
      borderWidth: '1rpx',
      borderColor: '#979797',
      scalable: true
    }
  }
}
// 商圈背景阴影
const businessShadowHandle = (id, height, top) => {
  return {
    id: id,
    type: 'rect',
    css: [{
      width: '710rpx',
      height: `${height}rpx`,
      top: `${top}rpx`,
      left: `${startLeftSmall}rpx`,
      color: '#fff',
      borderRadius: '20rpx',
      shadow: '0 0 24rpx rgba(0,0,0,0.1)'
    }],
  }
}
const businessLogoHandle = (id, src, posTop, posID) => {
  const logoView = {
    id: id,
    type: 'image',
    url: src,
    css: {
      top: `${posTop}rpx`,
      left: `${startLeftSmall + 52}rpx`,
      width: '200rpx',
      height: '200rpx',
      mode: 'aspectFill',
      borderWidth: '1rpx',
      borderColor: '#979797'
    }
  };
  if (posID) {
    logoView.css[0].top = [`${posTop}rpx`, posID]
  }
  return logoView;
}
// 诊断
const diagnosisTitleHandle = (title, posTop) => {
  const titleView = {
    type: 'text',
    text: title,
    css: [{
      top: `${posTop}rpx`,
      left: `${startLeftSmall + 30}rpx`,
      width: '660rpx',
      lineHeight: '40rpx',
      fontSize: '28rpx',
    }, commonColor]
  };
  return titleView;
}
const diagnosisContentHandle = (content, posTop) => {
  const contentView = {
    type: 'text',
    text: content,
    css: [{
      top: `${posTop}rpx`,
      left: `${startLeftSmall + 30}rpx`,
      width: '660rpx',
      lineHeight: '36rpx',
      fontSize: '24rpx',
    }, commonColor]
  };
  return contentView;
}
// 星星
const capacityStarHandle = (index, posTop) => {
  const starView = {
    type: 'image',
    url: '/images/star.png',
    css: {
      top: `${posTop}rpx`,
      left: `${startLeftSmall + 30 + 42 * index}rpx`,
      width: '38rpx',
      height: '38rpx',
      mode: 'aspectFill',
    }
  };
  return starView;
}
export {
  commonColor,
  startLeft,
  startLeftSmall,
  capacityEntries,
  titleHandle,
  storeLogoHandle,
  storeTitleHandle,
  storeTitleContentHandle,
  storeActivityTitleHandle,
  tagHandle,
  tagContentHandle,
  goodHandle,
  bannerHandle,
  businessShadowHandle,
  businessLogoHandle,
  diagnosisTitleHandle,
  diagnosisContentHandle,
  capacityStarHandle
}