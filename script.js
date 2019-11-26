let tagging = document.querySelector(".tagging")
const TOP = tagging.getBoundingClientRect().y
const LEFT = tagging.getBoundingClientRect().x
const BOTTOM =
  tagging.getBoundingClientRect().y + tagging.getBoundingClientRect().height
const RIGHT =
  tagging.getBoundingClientRect().x + tagging.getBoundingClientRect().width
const HIDE_BUTTON_WIDTH = 40;

let tags = document.querySelectorAll(".tagging-element")
for (tag of tags) {
  mouseDown(tag)
  hidden(tag)
}

function hidden(tag) {
  tag.onfocus = function() {
    let hideButton =
      tag.getBoundingClientRect().left + tag.getBoundingClientRect().width >
      RIGHT
        ? tag.querySelectorAll("button")[0]
        : tag.querySelectorAll("button")[1]
    hideButton.style.visibility = "visible"
    hideButton.onmousedown = function() {
      tag.style.visibility = "hidden"
    }
  }
  tag.onblur = function() {
    let hideButton = tag.querySelectorAll("button")
    for (button of hideButton) {
      button.style.visibility = "hidden"
    }
  }
}

function mouseDown(tag) {
  tag.onmousedown = function(event) {
    let shiftX = event.clientX - tag.getBoundingClientRect().left
    let shiftY = event.clientY - tag.getBoundingClientRect().top

    tag.style.position = "absolute"
    tag.style.zIndex = 1000

    document.body.append(tag)

    moveAt(event.pageX, event.pageY)

    function moveAt(pageX, pageY) {
      tag.style.left =
        (pageX - shiftX < LEFT - HIDE_BUTTON_WIDTH
          ? LEFT - HIDE_BUTTON_WIDTH
          : pageX - shiftX >
            RIGHT - tag.getBoundingClientRect().width + HIDE_BUTTON_WIDTH
          ? RIGHT - tag.getBoundingClientRect().width + HIDE_BUTTON_WIDTH
          : pageX - shiftX) + "px"
      tag.style.top =
        (pageY - shiftY < TOP
          ? TOP
          : pageY - shiftY > BOTTOM - tag.getBoundingClientRect().height
          ? BOTTOM - tag.getBoundingClientRect().height
          : pageY - shiftY) + "px"
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY)

      tag.hidden = true
      tag.hidden = false

      if (!elemBelow) return
    }

    document.addEventListener("mousemove", onMouseMove)

    tag.onmouseup = function() {
      document.removeEventListener("mousemove", onMouseMove)
      tag.onmouseup = null
    }
  }

  tag.ondragstart = function() {
    return false
  }
}
