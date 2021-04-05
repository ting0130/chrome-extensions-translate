chrome.runtime.onMessage.addListener((request, sender, callBack)  => {
    if (request.type == 'QUERY_TRANSLATE') {
        fetch(`https://translate.google.cn/translate_a/single?client=at&sl=en&tl=zh-CN&dt=t&q=${request.queryContent}`)
            .then(res => res.json())
            .then(res => {
                callBack(res)
            })
        return true
    }
})

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "id": "SELECT_TRANSLATE",
        "title": "翻译 %s",
        "contexts": ["selection"]
    })
})

chrome.contextMenus.onClicked.addListener((target) => {
    if (target.menuItemId == 'SELECT_TRANSLATE') {
        chrome.tabs.create({url: `https://translate.google.cn/?sl=en&tl=zh-CN&text=${target.selectionText}&op=translate`})
    }
})