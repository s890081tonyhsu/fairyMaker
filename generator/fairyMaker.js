(function($) {
    $.fn.wysiwygEvt = function() {
        return this.each(function() {
            var $this = $(this);
            var htmlOld = $this.html();
            $this.bind('blur keyup paste copy cut mouseup', function() {
                var htmlNew = $this.html();
                if (htmlOld !== htmlNew) {
                    $this.trigger('change');
                    htmlOld = htmlNew;
                }
            })
        })
    }
})(jQuery);


function* attriubteGenerator() {
    const attriubtes = ['fire', 'thunder', 'water', 'light', 'dark']
    var main, sub;
    main = sub = 0;
    while (true) {
        yield [attriubtes[main], attriubtes[sub]];
        sub++;
        if (sub == attriubtes.length) {
            sub = 0;
            main++;
        }
        if (main == 3) {
            main = 0;
        }
    }
}

var attrgen = attriubteGenerator();

var nowAttr = attrgen.next().value;
changeFrame(nowAttr)


$('.card-attrs-skill-title').wysiwygEvt().on('change', (e) => {
    var $el = $(e.target);
    if ($el.text() === '') {
        $el.text(i18next.t('editor.none'))
    }
})

$('.card-attr-changer').on('click', () => {
    nowAttr = attrgen.next().value;
    changeFrame(nowAttr)
})

$('#filer').on('change', (e) => {
    var files = e.target.files;
    var reader = new FileReader;

    reader.readAsDataURL(files[0]);
    reader.onload = function() {
        var url = reader.result;
        $('.card-image-source').attr({
            src: url
        })
    }
})

$('#generate').click(e => {
    html2canvas(document.getElementById('card')).then(function(canvas) {
        var $canvas = $(canvas);
        $('#output > img').remove();
        $('#output').append($('<img>',{
			src:canvas.toDataURL()
        }));
    });
})

function changeFrame(attriubte) {
    var arr = $('.card-frame').attr('src').split('\/');
    arr[arr.length - 1] = attriubte.join('_') + '.png'
    $('.card-frame').attr({
        src: arr.join('\/')
    })
}
