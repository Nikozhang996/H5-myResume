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
}
