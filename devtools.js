chrome.devtools.panels.create(
    "showUrl",
    "./devtools/translate_icon_32.png",
    "./devtools/panel.html"
)

chrome.devtools.panels.elements.createSidebarPane('Images', (sidebar) => {
    sidebar.setExpression('document.querySelectorAll("img")', 'All Images')
})