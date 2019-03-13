/**
 * @author OlivierHu
 * @date 2019/03/13
 * @desc set rem 
 * if design size = 750, 1rem = 40px
 */

 function setRem() {
   const oHtml = document.documentElement
   function getSize() {
     const screenWidth = window.screen.width
     if(screenWidth >= 640) {
      oHtml.style.fontSize = '20px'
     } else if (screenWidth < 320) {
      oHtml.style.fontSize = '20px'
     } else {
      oHtml.style.fontSize = screenWidth / 375 * 20 + 'px'
     }
   }

   getSize()

   window.onresize = function () {
    getSize()
   }
 }