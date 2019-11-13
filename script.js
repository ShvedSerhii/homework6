let tags = document.querySelectorAll(".tagging-element")
for (tag of tags) {
  mouseDown(tag)
  hidden(tag)
}

function hidden(tag) {
  let hideButton = tag.querySelector("button")
  tag.onfocus = function() {
    hideButton.style.visibility = "visible"
  }
  tag.onblur = function() {
    hideButton.style.visibility = "hidden"
  }
  hideButton.onmousedown = function() {
    tag.style.visibility = "hidden"
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
      tag.style.left = pageX - shiftX + "px"
      tag.style.top = pageY - shiftY + "px"
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY)

      tag.hidden = true
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY)
      tag.hidden = false

      if (!elemBelow) return
    }

    document.addEventListener("mousemove", onMouseMove)

    tag.onmouseup = function() {
      document.removeEventListener("mousemove", onMouseMove);
      tag.onmouseup = null
    }
  }

  tag.ondragstart = function() {
    return false
  }
}
