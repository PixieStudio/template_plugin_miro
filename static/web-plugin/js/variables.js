// ==============================================
//                       APP
// ==============================================

const APP_ID = 'APP ID'
const APP_URL = 'https://domain.com/static/web-plugin'
const LIBRARY_PATH = 'web-plugin/library.html'


// ==============================================
//                     UTILS
// ==============================================

const goToWidget = async (id) => {
    await miro.board.viewport.zoomToObject(id)
}

const getWidget = (obj) => {
    return miro.board.widgets.get(obj)
}


function getAppWidget(type, key, value) {
    return {
        type: type,
        metadata: {
            [APP_ID]: { [key]: value }
        }
    }
}




