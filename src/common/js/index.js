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

  /* LOADING */
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
  const phoneRender = (function () {
    const $phoneBox = $('.phoneBox'),
      $time = $phoneBox.find('.time'),
      $listen = $phoneBox.find('.listen'),
      $listenTouch = $listen.find('.move'),
      $details = $phoneBox.find('.details'),
      $detailsTouch = $details.find('.touch');

    const listemMusic = $('#listenMusic')[0],
      detailsMucic = $('#detailsMusic')[0];

    let musicTimer = null;

    //->detailsMusicFn:播放自我介绍的音频,并且计算音频播放的进度
    const detailsMusicFn = function () {
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
    };

    const listenTouch = function (ev) {
      listenMusic.pause();
      $listen.remove();
      $details.css('transform', 'translateY(0)');
      $time.css('display', 'block');
      detailsMusicFn();
    };

    const closePhone = function (ev) {
      detailsMusic.pause();
      $phoneBox.css('transform', 'translateY(' + document.documentElement.clientHeight + 'px)').on('webkitTransitionEnd', function () {
        $phoneBox.css('display', 'none');
      });
      messageRender.init();
    };

    return {
      init() {
        $phoneBox.css('display', 'block');
        listenMusic.play();

        //->绑定接听音频事件
        $listenTouch.click(listenTouch);

        //->给DETAILS中的TOUCH绑定单击事件
        $detailsTouch.click(closePhone);
      }
    }
  })();

  /* MESSAGE */
  const messageRender = (function () {

    return {
      init() {
        console.log(this);
      }
    }
  })();






  messageRender.init();
};
