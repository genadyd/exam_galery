export default function slider(frame, setStateCollback){
    const inner =frame.firstChild
    let slideActive = true
    let frameOffset = frame.offsetLeft
    let frameWidth = frame.offsetWidth
    let pos
    const innerWidth = inner.offsetWidth
    inner.style.cursor = 'move'
    document.onmousemove = function (ev) {
        if (ev.clientX>(frameOffset+(innerWidth/2)) && ev.clientX<(frameOffset+frameWidth-(innerWidth/2)) && slideActive===true) {
            pos = ev.clientX-(frameOffset+(innerWidth/2))
            inner.style.left = pos+'px'
        }
    }
    frame.onmouseup = function (e) {

        slideActive = false
        inner.style.cursor='default'
        if(pos+(innerWidth/2)<(frameWidth/2)){
            frame.classList.remove('active')
            inner.style.left = 0

            setStateCollback(false)
        }else {
            frame.classList.add('active')
            inner.style.left = frameWidth-(innerWidth)+'px'

            setStateCollback(true)
        }
    }
}

