// ==============================================
//                       APP
// ==============================================

const APP_ID = '3074457350398298989'
const APP_URL = 'https://bfeb261d6b84.ngrok.io/static/web-plugin'
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

const addDiv = (container, text) => {
    container.insertAdjacentHTML('afterbegin', text)
}

const randomNumber = (maxValue) => {
    return Math.floor(Math.random() * Math.floor(maxValue) + 1)
}

const compareSymbols = (el) => {
    let value
    if (el === 'gt') {
        value = '>'
    } else if (el === 'gteq') {
        value = '>='
    } else if (el === 'lt') {
        value = '<'
    } else if (el === 'lteq') {
        value = '<='
    }
    return value
}



