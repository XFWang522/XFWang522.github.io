(function () {
  var LANG_KEY = "site_lang";
  var DEFAULT_LANG = "en";

  var NAV_TEXT = {
    Home: { en: "Home", zh: "首页" },
    Publications: { en: "Publications", zh: "论文" },
    CV: { en: "CV", zh: "简历" }
  };

  var TEXT_MAP = {
    follow_button: { en: "Follow", zh: "联系方式" },
    sitemap: { en: "Sitemap", zh: "站点地图" },
    view_markdown_cv: { en: "View Markdown CV", zh: "查看 Markdown 简历" },
    back_home: { en: "Back to Home", zh: "返回首页" },
    publication_scholar_tip: {
      en: "You can also find my articles on my Google Scholar profile.",
      zh: "你也可以在我的 Google Scholar 主页查看论文列表。"
    }
  };

  function getSavedLang() {
    var lang = localStorage.getItem(LANG_KEY);
    return lang === "zh" || lang === "en" ? lang : DEFAULT_LANG;
  }

  function setSavedLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
  }

  function setNavLanguage(lang) {
    var navLinks = document.querySelectorAll(".masthead__menu .masthead__menu-item > a");

    navLinks.forEach(function (link) {
      var text = (link.textContent || "").trim();

      if (!link.dataset.navKey) {
        var key = Object.keys(NAV_TEXT).find(function (navKey) {
          return NAV_TEXT[navKey].en === text || NAV_TEXT[navKey].zh === text;
        });
        if (key) {
          link.dataset.navKey = key;
        }
      }

      if (link.dataset.navKey && NAV_TEXT[link.dataset.navKey]) {
        link.textContent = NAV_TEXT[link.dataset.navKey][lang];
      }
    });
  }

  function setMappedText(lang) {
    document.querySelectorAll("[data-i18n-key]").forEach(function (node) {
      var key = node.dataset.i18nKey;
      if (!TEXT_MAP[key]) {
        return;
      }

      node.textContent = TEXT_MAP[key][lang];
    });
  }

  function setLangButtonLabel(lang) {
    var button = document.querySelector("#lang-toggle a");
    if (!button) {
      return;
    }

    button.textContent = lang === "zh" ? "EN" : "中文";
  }

  function applyLanguage(lang) {
    document.documentElement.setAttribute("lang", lang === "zh" ? "zh-CN" : "en");
    setLangButtonLabel(lang);
    setNavLanguage(lang);
    setMappedText(lang);
  }

  function bindToggle() {
    var button = document.querySelector("#lang-toggle");
    if (!button) {
      return;
    }

    button.addEventListener("click", function (event) {
      event.preventDefault();
      var currentLang = getSavedLang();
      var nextLang = currentLang === "zh" ? "en" : "zh";
      setSavedLang(nextLang);
      applyLanguage(nextLang);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyLanguage(getSavedLang());
    bindToggle();
  });
})();
