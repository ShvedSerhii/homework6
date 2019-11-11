import './styles.scss'
import './index.html'

  let slider = document.getElementById("slider")
  let sliderItems = document.getElementById("slides")
  let prev = document.getElementById("prev")
  let next = document.getElementById("next")

  function slide(wrapper, items, prev, next) {
    let posX1 = 0
    let posX2 = 0
    let posInitial
    let posFinal
    let threshold = 100
    let slides = items.getElementsByClassName("slide")
    let slidesLength = slides.length
    let slideSize = items.getElementsByClassName("slide")[0].offsetWidth
    let firstSlide = slides[0]
    let lastSlide = slides[slidesLength - 1]
    let cloneFirst = firstSlide.cloneNode(true)
    let cloneLast = lastSlide.cloneNode(true)
    let index = 0
    let allowShift = true

    // Clone first and last slide
    items.appendChild(cloneFirst)
    items.insertBefore(cloneLast, firstSlide)

    // Mouse events
    items.onmousedown = dragStart

    // Touch events
    items.addEventListener("touchstart", dragStart)
    items.addEventListener("touchend", dragEnd)
    items.addEventListener("touchmove", dragAction)

    // Click events
    prev.addEventListener("click", function() {
      shiftSlide(-1)
    })
    next.addEventListener("click", function() {
      shiftSlide(1)
    })

    // Transition events
    items.addEventListener("transitionend", checkIndex)

    function dragStart(e) {
      e = e || window.event
      e.preventDefault()
      posInitial = items.offsetLeft

      if (e.type == "touchstart") {
        posX1 = e.touches[0].clientX
      } else {
        posX1 = e.clientX
        document.onmouseup = dragEnd
        document.onmousemove = dragAction
      }
    }

    function dragAction(e) {
      e = e || window.event

      if (e.type == "touchmove") {
        posX2 = posX1 - e.touches[0].clientX
        posX1 = e.touches[0].clientX
      } else {
        posX2 = posX1 - e.clientX
        posX1 = e.clientX
      }
      items.style.left = items.offsetLeft - posX2 + "px"
    }

    function dragEnd(e) {
      posFinal = items.offsetLeft
      if (posFinal - posInitial < -threshold) {
        shiftSlide(1, "drag")
      } else if (posFinal - posInitial > threshold) {
        shiftSlide(-1, "drag")
      } else {
        items.style.left = posInitial + "px"
      }

      document.onmouseup = null
      document.onmousemove = null
    }

    function shiftSlide(dir, action) {
      items.classList.add("shifting")

      if (allowShift) {
        if (!action) {
          posInitial = items.offsetLeft
        }

        if (dir == 1) {
          items.style.left = posInitial - slideSize + "px"
          index++
        } else if (dir == -1) {
          items.style.left = posInitial + slideSize + "px"
          index--
        }
      }

      allowShift = false
    }

    function checkIndex() {
      items.classList.remove("shifting")

      if (index == -1) {
        items.style.left = -(slidesLength * slideSize) + "px"
        index = slidesLength - 1
      }

      if (index == slidesLength) {
        items.style.left = -(1 * slideSize) + "px"
        index = 0
      }

      allowShift = true
    }
  }

  slide(slider, sliderItems, prev, next)
