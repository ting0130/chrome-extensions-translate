let switchWrapp = document.querySelector('.switch')

chrome.storage.sync.get(['checked'], (target) => {
    if (target) {
        switchWrapp.checked = target.checked
    }
})

switchWrapp.onclick = (e) => {
    chrome.storage.sync.set({ checked: e.target.checked })

    chrome.tabs.query( {active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { checked: e.target.checked, type: 'CHECKED' })
    })
}