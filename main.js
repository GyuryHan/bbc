(() => {

  const actions = {
      stockFlies(key) {
        if (key) {
            document.querySelector('[data-index="2"] .stock').style.transform = `translateX(${window.innerWidth}px)`;
        } else {
            document.querySelector('[data-index="2"] .stock').style.transform = `translateX(-100%)`;
        }
      }
  };

  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; // 현재 활성화된(visible) .graphic-item을 지정
  let ioIndex;  

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;  // 문자열을 숫자로 변경 * 1
  });

  for (let i = 0; i < stepElems.length; i++) {
      io.observe(stepElems[i]);  
      // stepElems[i].setAttribute('data-index', i);
      stepElems[i].dataset.index = i;
      graphicElems[i].dataset.index = i;
  }

  function activate(action) {
    currentItem.classList.add('visible');
    if (action) {
        actions[action](true);
    }
  }

  function inactivate(action) {
    currentItem.classList.remove('visible'); 
    if (action) {
        actions[action](false);
    }
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;

    // for (let i = 0; i < stepElems.length; i++) {
  for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
        step = stepElems[i];
        if (!step) continue;
        boundingRect = step.getBoundingClientRect();

        if(boundingRect.top > window.innerHeight * 0.1 && 
           boundingRect.top < window.innerHeight * 0.8) {
              // console.log(step.dataset.index);
              inactivate(currentItem.dataset.action);
              currentItem = graphicElems[step.dataset.index]
              activate(currentItem.dataset.action);
           }
       }
  });

  // 새로고침시 상단으로 이동
  window.addEventListener('load', () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });

  activate();

})();