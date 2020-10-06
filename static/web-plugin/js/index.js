const logo = '<path d="M12.41,1.71l8.91,5.14v10.3l-8.91,5.14L3.49,17.15V6.85l8.92-5.14m0-1.71L2,6V18l10.4,6L22.8,18V6L12.41,0Z" transform="translate(-2.01)"/><path d="M8.82,9.17a.65.65,0,0,1-1.3,0,.64.64,0,0,1,.66-.66A.62.62,0,0,1,8.82,9.17ZM7.65,16.6V10.8h1v5.8Z" transform="translate(-2.01)"/><path d="M10.49,8.63a10.77,10.77,0,0,1,2-.17,3.26,3.26,0,0,1,2.33.66,2,2,0,0,1,.64,1.53A2.13,2.13,0,0,1,14,12.72v0a2,2,0,0,1,1.18,1.63,13,13,0,0,0,.63,2.22H14.68a10.79,10.79,0,0,1-.54-1.93c-.24-1.11-.67-1.53-1.62-1.57h-1v3.5h-1Zm1,3.68H12.6c1.12,0,1.83-.61,1.83-1.54s-.76-1.5-1.86-1.51a4,4,0,0,0-1,.1Z" transform="translate(-2.01)"/><path d="M16.13,12v-.38l.48-.47c1.16-1.1,1.69-1.69,1.7-2.38a.82.82,0,0,0-.91-.89,1.51,1.51,0,0,0-1,.39l-.2-.44a2,2,0,0,1,1.29-.46,1.28,1.28,0,0,1,1.39,1.33c0,.84-.61,1.52-1.57,2.44l-.36.34H19V12Z" transform="translate(-2.01)"/>'
const logoBig = '<path d="M24.41,3.41l17.82,10.3V34.29L24.41,44.59,6.58,34.29V13.71L24.41,3.41m0-3.41L3.62,12V36L24.41,48,45.19,36V12L24.41,0Z" transform="translate(-3.62)" style="fill:#ddbe11"/><path d="M17.24,18.33a1.24,1.24,0,0,1-1.34,1.3,1.26,1.26,0,0,1-1.27-1.3A1.29,1.29,0,0,1,16,17,1.25,1.25,0,0,1,17.24,18.33ZM14.89,33.2V21.59H17V33.2Z" transform="translate(-3.62)" style="fill:#002b36"/><path d="M20.58,17.25a22.35,22.35,0,0,1,4-.33c2.24,0,3.67.41,4.68,1.32a4,4,0,0,1,1.27,3.07,4.24,4.24,0,0,1-3,4.12v.07c1.25.44,2,1.59,2.37,3.27a25.35,25.35,0,0,0,1.25,4.43H29a21.3,21.3,0,0,1-1.08-3.86c-.48-2.23-1.34-3.07-3.24-3.14h-2v7H20.58Zm2.09,7.37H24.8c2.23,0,3.65-1.23,3.65-3.07,0-2.09-1.51-3-3.72-3a8.17,8.17,0,0,0-2.06.2Z" transform="translate(-3.62)" style="fill:#002b36"/><path d="M31.85,23.94v-.75l1-.94c2.32-2.21,3.37-3.39,3.39-4.76a1.62,1.62,0,0,0-1.81-1.78,3.11,3.11,0,0,0-1.93.77l-.39-.87a4,4,0,0,1,2.57-.93,2.57,2.57,0,0,1,2.79,2.65c0,1.68-1.22,3-3.14,4.89l-.72.67v0h4.08v1Z" transform="translate(-3.62)" style="fill:#002b36"/>'
const sidebarUrl = 'web-plugin/sidebar.html'
const sidebarTitle = 'Sample APP'
const libraryUrl = 'web-plugin/library.html'
const libraryTitle = 'Sample APP'

miro.onReady(() => {
    miro.initialize({
        extensionPoints: {
            toolbar: {
                title: sidebarTitle,
                toolbarSvgIcon: logo,
                librarySvgIcon: logoBig,
                onClick: async () => {
                    const authorized = await miro.isAuthorized()
                    if (authorized) {
                        miro.board.ui.openLeftSidebar(sidebarUrl, { title: sidebarTitle })
                    } else {
                        miro.board.ui.openModal('web-plugin/not-authorized.html')
                            .then(res => {
                                if (res === 'success') {
                                    miro.board.ui.openLeftSidebar(sidebarUrl, { title: sidebarTitle })
                                }
                            })
                    }
                }
            },
            bottomBar: {
                title: libraryTitle,
                svgIcon: logo,
                onClick: async () => {
                    const authorized = await miro.isAuthorized()
                    if (authorized) {
                        miro.board.ui.openLibrary(libraryUrl, { title: libraryTitle })
                    } else {
                        miro.board.ui.openModal('web-plugin/not-authorized.html')
                            .then(res => {
                                if (res === 'success') {
                                    miro.board.ui.openLibrary(libraryUrl, { title: libraryTitle })
                                }
                            })
                    }
                }
            }
        }
    })
})
