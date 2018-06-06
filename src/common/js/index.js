export default function () {
  {
    function computed() {
      /*
      * 说明：
      *
      * */
      const DES_W = 640;
      let window_width = document.documentElement.clientWidth;
      if (window_width >= 640) {
        return;
      }
      document.documentElement.style.fontSize = `${window_width / DES_W * 100 }px`;
    }

    computed();

    window.addEventListener('resize', computed, false);
  }

  const loadingRender = (function () {
    const $loadingBox = $('.loadingBox'),
      $run = $loadingBox.find('.run');

    const imgList = require('../../result.json'),
      total = imgList.length;
    let cur = 0;

    // 控制图片加载进度
    const computed = function () {
      imgList.forEach(item => {
        let tempImg = new Image;
        tempImg.src = item;

        tempImg.onload = function () {
          cur++;
          runHander();
          tempImg = null;
        };
      });
    };

    const runHander = function () {
      $run.css('width', `${cur / total * 100}%`);
      if (cur >= total) {
        setTimeout(()=>{
          $loadingBox.remove();

        },1500);
      }
    };



    return {
      init() {
        $loadingBox.css('display', 'block');
        computed();
      }
    }
  })();




  loadingRender.init();
}
