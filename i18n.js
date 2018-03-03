function localize() {
    var generator_src = i18next.language === 'zh-TW'? 'generator-zhTW' : 'generator';
    $('head').localize();
    $('body').localize();
    $('img').each(function() {
        $(this).attr("src", this.src.replace(/generator(-zhTW)?/, generator_src));
    });
}

$(document).ready(function(){
    i18next.use(i18nextXHRBackend).init({
        lng: 'jp',
        fallbackLng: 'jp',
        backend: {
          loadPath: './locales/{{lng}}/{{ns}}.json'
        }
    }, function(err, t) {
        jqueryI18next.init(i18next, $);
        localize();
    });
    $('.lang').click(function(evt) {
        var list = ['jp', 'zh-TW'];
        var lang = $(this).data("lang");
        if(!list.includes(lang)) return;
        i18next.changeLanguage(lang, function(){
            localize();
        });
    });
});
