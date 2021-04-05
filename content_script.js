class TranslatePanel {

    createPanel = () => {
        let wrapper = document.createElement('div')
        wrapper.innerHTML = `
            <header>谷歌划词翻译插件<span class="close">X</span></header>
            <main>
                <div class="source">
                    <div class="title">英文</div>
                    <div class="content">test</div>
                </div>
                <div class="result">
                    <div class="title">简体中文</div>
                    <div class="content">...</div>
                </div>
            </main>
        `
        wrapper.classList.add('translate-panel')
        wrapper.querySelector('.close').onclick = () => {
            this.wrapper.classList.remove('show')
        }
        document.body.appendChild(wrapper)
        this.wrapper = wrapper

    }

    showPanel = () => {
        this.wrapper.classList.add('show')
    }

    translateSelect = (content) => {
        const source = this.wrapper.querySelector('.source .content')
        const result = this.wrapper.querySelector('.result .content')
        source.innerHTML = content
        result.innerHTML = '翻译中...'

        // google
        // fetch(`https://translate.google.cn/translate_a/single?client=at&sl=en&tl=zh-CN&dt=t&q=${content}`)
        //     .then(res => res.json())
        //     .then(res => {
        //         result.innerHTML = res[0][0][0]
        //     })

        chrome.runtime.sendMessage({ type: 'QUERY_TRANSLATE', queryContent: content }, (res) => {
            result.innerHTML = res[0][0][0]
        })
    }

    locationPanel = (target) => {
        this.wrapper.style.top = target.y + 'px'
        this.wrapper.style.left = target.x + 'px'
    }
}

// let checked = false
// let panel = new TranslatePanel()
// panel.createPanel()

// window.onmouseup = (target) => {
//     // 获取选中内容
//     const content = window.getSelection().toString().trim()

//     if (!content || !checked) return
//     panel.locationPanel({ x: target.pageX, y: target.pageY })
//     panel.translateSelect(content)
//     panel.showPanel()

// }

// chrome.storage.sync.get(['checked'], (target) => {
//     if (target) checked = target.checked
// })

// chrome.runtime.onMessage.addListener((target) => {
//     if (target.type == 'CHECKED') {
//         checked = target.checked
//         chrome.storage.sync.set({ checked: target.checked })
//     }
// })

let panel = new TranslatePanel()
panel.createPanel()

window.onmouseup = (target) => {
    // 获取选中内容
    const content = window.getSelection().toString().trim()

    if (!content) return
    window.chrome.storage.sync.get(['checked'], (result) => {
        if (result.checked) {
            panel.locationPanel({ x: target.pageX, y: target.pageY })
            panel.translateSelect(content)
            panel.showPanel()
        }
    })
}

chrome.runtime.onMessage.addListener((target) => {
    if (target.type == 'CHECKED') {
        chrome.storage.sync.set({ checked: target.checked })
    }
})

