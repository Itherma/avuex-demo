// const CONTAINERID = '_avue_markcontainer';

class waterMark {
  constructor(opt = {}) {
    const sy = document.getElementById('watermark')
    //  @ defect ie10及其以下不创建水印
    if (sy || window.navigator.userAgent.indexOf('MSIE') >= 1) {
      return false
    }
    this.CONTAINERID = this.randomId();
    this.drawCanvas = this.drawCanvas.bind(this);
    // this.parentObserver = this.parentObserver.bind(this);
    this.isOberserve = false;
    this.init(opt);
  }

  init(opt) {
    this.option = {};
    this.option.text = opt.text || '';
    this.option.font = opt.font || '12px 微软雅黑';
    this.option.canvasWidth = opt.canvasWidth || 400;
    this.option.canvasHeight = opt.canvasHeight || 200;
    this.option.textAlign = opt.textAlign || 'center';
    this.option.textStyle = opt.textStyle || 'rgba(100,100,100,0.15)';
    this.option.degree = opt.degree || 40;
    this.drawCanvas();
    // this.parentObserver();
  }

  drawCanvas() {
    this.isOberserve = true;
    const divContainer = document.createElement('div');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    divContainer.id = this.CONTAINERID;

    canvas.width = this.option.canvasWidth;
    canvas.height = this.option.canvasHeight;
    context.font = this.option.font;
    context.textAlign = this.option.textAlign;
    context.fillStyle = this.option.textStyle;
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(this.option.degree * Math.PI / 180);
    context.fillText(this.option.text, 0, 0);

    // context.fillText('一二三十五12345', 50, -60);
    // context.fillText('一二三十五123456', -150, 50);

    const backgroundUrl = canvas.toDataURL('image/png');
    this.styleStr = `
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            z-index:9999;
            pointer-events:none;
            background-repeat:repeat;
            background-image:url('${backgroundUrl}')`;
    divContainer.setAttribute('style', this.styleStr);
    document.body.appendChild(divContainer);
    // this.wmObserver(divContainer);
    this.isOberserve = false;
  }

  wmObserver(divContainer) {
    const wmConf = { attributes: true, childList: true, characterData: true };
    const MutationObserver = window.MutationObserver || window.webkitMutationObserver || window.MozMutationObserver;
    if (!MutationObserver) {
      return
    }
    const wmObserver = new MutationObserver((mo) => {
      if (!this.isOberserve) {
        const _obj = mo[0].target;
        _obj.setAttribute('style', this.styleStr);
        _obj.setAttribute('id', this.CONTAINERID);
        wmObserver.takeRecords();
      }
    });
    wmObserver.observe(divContainer, wmConf);
  }

  parentObserver() {
    const MutationObserver = window.MutationObserver || window.webkitMutationObserver || window.MozMutationObserver;
    if (!MutationObserver) {
      return
    }
    const bodyObserver = new MutationObserver(() => {
      if (!this.isOberserve) {
        const __wm = document.querySelector(`#${this.CONTAINERID}`);
        if (!__wm) {
          this.drawCanvas();
        } else if (__wm.getAttribute('style') !== this.styleStr) {
          __wm.setAttribute('style', this.styleStr);
        }
      }
    });
    bodyObserver.observe(document.querySelector(`#${this.CONTAINERID}`).parentNode, { childList: true });
  }

  randomId() {
    // const $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    // const maxPos = $chars.length;
    // let id = '';
    // for (let i = 0; i < 16; i++) {
    //   id += $chars.charAt(Math.floor(Math.random() * maxPos));
    // }
    return 'watermark';
  }
}
export default waterMark;
