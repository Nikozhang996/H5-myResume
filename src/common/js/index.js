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
        setTimeout(() => {
          $loadingBox.remove();
          phoneRender.init();
        }, 3000);
      }
    };


    return {
      init() {
        $loadingBox.css('display', 'block');
        computed();
      }
    }
  })();

  /* PHONE */
  const phoneRender = (function (Zepto) {
    const $phoneBox = $('.phoneBox'),
      $time = $phoneBox.find('.time'),
      $listen = $phoneBox.find('.listen'),
      $listenTouch = $listen.find('.move'),
      $details = $phoneBox.find('.details'),
      $detailTouch = $details.find('.touch');

    const listemMusic = $('#listenMusic')[0],
      detailsMucis = $('#detailsMusic')[0];

    let musicTimer = null;

    //->detailsMusicFn:播放自我介绍的音频,并且计算音频播放的进度
    function detailsMusicFn() {
      detailsMusic.play();
      musicTimer = window.setInterval(function () {
        var curTime = detailsMusic.currentTime,
          minute = Math.floor(curTime / 60),
          second = Math.floor(curTime);
        minute < 10 ? minute = '0' + minute : null;
        second < 10 ? second = '0' + second : null;
        $time.html(minute + ':' + second);

        //->音频播放完成
        if (curTime === detailsMusic.duration) {
          window.clearInterval(musicTimer);
          closePhone();
        }
      }, 1000);

      //->closePhone:关闭当前的PHONE区域展示下一个区域
      function closePhone() {
        detailsMusic.pause();
        $phone.css('transform', 'translateY(' + document.documentElement.clientHeight + 'px)').on('webkitTransitionEnd', function () {
          $phone.css('display', 'none');
        });
        messageRender.init();
      }
    }

    // const $phonePlan = $.callback();

    const listenTouch = function () {
      $listenTouch.click(function () {
        console.log(this);
        $listen.remove();
        $details.css('transform', 'translateY(0)');
      });
    };

    return {
      init() {
        $phoneBox.css('display', 'block');
        listenTouch();
        console.log(detailsMucis);
      }
    }
  })();


  phoneRender.init();
}
