// $(function domReady($) {
//     // Cache the jQuery object
//     var $content = $('#content');


//     // $content.handlebars('add', '#template', { remove: false });
//     $content.handlebars('add', '#template2', {
//         remove: false
//     });

//     // Testing only!

//     // $content.handlebars('remove', '#template'); // Remove single template id
//     // $content.handlebars('remove'); // Remove all templates
//     window.console.log('Rendered templates: %o', $content.handlebars('get')); // Get the rendered templates for the content element
//     window.console.log('Compiled templates: %o', $content.handlebars('compiled')); // Get the compiled templates for the content element





//     var $content = $('#content');

//     $(function () {

//         function atualizar() {
//             console.log("entrei")

//             //query2()

//             var request = $.ajax({
//                 type: 'POST',
//                 dataType: "json",
//                 contentType: 'application/json',
//                 url: 'http://localhost:3000/home2'
//             });
//             request.done(function (data) {
//                 //alert(JSON.stringify(data))
//                 context = {
//                     dados: data
//                 };
//                 console.log(context)
//                 $content.handlebars('remove', '#template2', context, {
//                     remove: false
//                 });
//                 $content.handlebars('add', '#template2', context, {
//                     remove: false
//                 });
//             })

//         };


//         atualizar()
//     });

// });

function countdw() {
    $('[data-countdown]').each(function () {
        var $this = $(this),
            finalDate = $(this).data('countdown');
        console.log(finalDate)
        $this.countdown(finalDate, function (event) {
            $this.html(event.strftime('%H:%M:%S'));



        });
    });
};