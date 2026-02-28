'use strict';
/**
 * this is garbage code.
 */
const email = '`e]f7k_\\k\\Z_gXe[X%Zfd%Xl'
const abn = '.)/\'))*+,,0'
const shiftChars = (string, shiftV = 13) => {
    let out = ''
    string = '' + string
    for (let c = 0; c < string.length; c++) {
        out += String.fromCharCode(string.charCodeAt(c) + shiftV)
    }
    return out
}
// copy to clipboard
const clipboard = src => {
    const str = src.innerText
    const el = document.createElement('textarea')
    el.value = str
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    hl(src, 'copied in clipboard!')
}
// toggle the "inverted" css class
const hl = (elm, tip) => {
    elm.classList.toggle('inverted')
    tipbox(elm, tip)
    if (elm.classList.contains('inverted')) {
        return setTimeout(() => hl(elm), 2000)
    }
    return true
}
// shows/hide a tipbox, element is used only to don't clog the body with useless html elements
const tipbox = (element, message) => {
    if (element.getElementsByTagName('tip').length > 0) {
        for (let tipbox of element.getElementsByTagName('tip')) {
            element.removeChild(tipbox)
        }
        return
    }
    let tipbox = document.createElement('tip')
    tipbox.innerText = message
    element.appendChild(tipbox)
}

// dom ready function
function ready(f) {
    if (/in/.test(document.readyState)) {
        requestAnimationFrame(() => ready(f))
    } else {
        f()
    }
}
// email@domain.tld => email [at] domain.tld
let printmail = (string) => string.replace(/@/, '&#32;&#91;&#97;&#116;&#93;&#32;')
// decode uses shift char -9
let decode = (string) => shiftChars(string, 9)

ready(() => {
    for (let spamblock of document.querySelectorAll('spam')) {
        switch (spamblock.getAttribute('role')) {
            case 'email':
                // handle email block
                spamblock.innerHTML = printmail(decode(email))
                spamblock.title = "email address"
                spamblock.onclick = () => {
                    let e = document.createElement('a')
                    e.href = 'mailto:' + decode(email)
                    e.target = "_blank"
                    document.body.appendChild(e)
                    e.click()
                    document.body.removeChild(e)
                }
                break
            case 'abn':
                // handle abn
                spamblock.innerText = decode(abn)
                spamblock.title = "Australian Business Number"
                spamblock.onclick = () => clipboard(spamblock)
                break
        }
    }
})