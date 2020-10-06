// ==============================================
//                       UI
// ==============================================

class UI {
    static displayOnLoad() {
        if (localStorage.displayPage) {
            UI.displayPage(localStorage.displayPage)
        } else {
            localStorage.displayPage = 'home'
            UI.displayPage('home')
        }
    }

    static displayPage(page) {
        // Var Container
        const homeContainer = document.getElementById('home-container')
        const firstContainer = document.getElementById('first-container')
        const homeTab = document.getElementById('homeTab')
        const firstTab = document.getElementById('firstTab')

        if (page === 'home') {
            //Set Display Page
            homeContainer.style.display = 'block'
            firstContainer.style.display = 'none'
            //Set Active Navbar Tab
            homeTab.classList = 'nav-link active'
            firstTab.classList = 'nav-link'
            //Store
            localStorage.displayPage = 'home'
        } else if (page === 'first') {
            //Set Display Page
            homeContainer.style.display = 'none'
            firstContainer.style.display = 'block'
            //Set Active Navbar Tab
            homeTab.classList = 'nav-link'
            firstTab.classList = 'nav-link active'
            //Store
            localStorage.displayPage = 'first'
        }
    }
}

// ==============================================
//                   TRANSLATOR
// ==============================================
class Translator {
    constructor(options = {}) {
        this._options = Object.assign({}, this.defaultConfig, options);
        this._elements = document.querySelectorAll("[data-i18n]");
        this._cache = new Map();

        if (
            this._options.defaultLanguage &&
            typeof this._options.defaultLanguage == "string"
        ) {
            this._getResource(this._options.defaultLanguage);
        }
    }

    _detectLanguage() {
        if (!this._options.detectLanguage) {
            return this._options.defaultLanguage;
        }

        var stored = localStorage.getItem("language");

        if (this._options.persist && stored) {
            return stored;
        }

        var lang = navigator.languages
            ? navigator.languages[0]
            : navigator.language;

        return lang.substr(0, 2);
    }

    _fetch(path) {
        return fetch(path)
            .then((response) => response.json())
            .catch(() => {
                console.error(
                    `Could not load ${path}. Please make sure that the file exists.`
                );
            });
    }

    async _getResource(lang) {
        if (this._cache.has(lang)) {
            return JSON.parse(this._cache.get(lang));
        }

        var translation = await this._fetch(
            `${this._options.filesLocation}/${lang}.json`
        );

        if (!this._cache.has(lang)) {
            this._cache.set(lang, JSON.stringify(translation));
        }

        return translation;
    }

    async load(lang) {
        if (!this._options.languages.includes(lang)) {
            return;
        }

        this._translate(await this._getResource(lang));

        document.documentElement.lang = lang;

        if (this._options.persist) {
            localStorage.setItem("language", lang);
        }
    }

    async getTranslationByKey(lang, key) {
        if (!key) throw new Error("Expected a key to translate, got nothing.");

        if (typeof key != "string")
            throw new Error(
                `Expected a string for the key parameter, got ${typeof key} instead.`
            );

        var translation = await this._getResource(lang);

        return this._getValueFromJSON(key, translation, true);
    }

    _getValueFromJSON(key, json, fallback) {
        var text = key.split(".").reduce((obj, i) => obj[i], json);

        if (!text && this._options.defaultLanguage && fallback) {
            let fallbackTranslation = JSON.parse(
                this._cache.get(this._options.defaultLanguage)
            );

            text = this._getValueFromJSON(key, fallbackTranslation, false);
        } else if (!text) {
            text = key;
            console.warn(`Could not find text for attribute "${key}".`);
        }

        return text;
    }

    _translate(translation) {
        var replace = (element) => {
            var key = element.getAttribute("data-i18n");
            var property = element.getAttribute("data-i18n-attr") || "innerHTML";
            var text = this._getValueFromJSON(key, translation, true);

            if (text) {
                element[property] = text;
            } else {
                console.error(`Could not find text for attribute "${key}".`);
            }
        };

        this._elements.forEach(replace);
    }

    get defaultConfig() {
        return {
            persist: false,
            languages: ["en"],
            defaultLanguage: "",
            detectLanguage: true,
            filesLocation: "/i18n",
        };
    }
}

var translator = new Translator({
    persist: false,
    languages: ["fr", "en"],
    defaultLanguage: "fr",
    detectLanguage: true,
    filesLocation: "./i18n"
})

const langStored = () => {
    if (localStorage.lang) {
        return localStorage.lang
    } else {
        return "en"
    }
}

translator.load(langStored())
