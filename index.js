$(document).ready(() => {
    console.log('jQuery is ready to go!');
});

$(window).on('load', () =>{
    console.log('window ready')
})

const $container = $('<div>');

const $title = $('<h1>', {
    text: 'Dad Jokes'
})

$container.append($title);
$(document.body).append($container);
$title.css('color', 'tomato');

const $jokeButton = $('<button></button>', {
    text: 'Click for a new joke 😂'
})
//$jokeButton.appendTo($container)
$container.append($jokeButton)

$jokeButton.on('click', Event => {
   
    getJoke()
    .then(joke => {
        $('.joke').remove();

        $('<p></p>',{
           text: joke,

       }).addClass('joke')
         .hide()
         .appendTo($container)
         .fadeIn();
    });
});
function getJoke(){
$.ajax({
    url:'https://icanhazdadjoke.com/',
    headers: {
        'Accept': 'application/json'
    }

}).then(res =>{
    return res.joke;
}).catch(err => {
    console.log(err);
    return 'There was an error making the request';
});
}


$.get('/my-file.json')
    .then(data => {
        
    })
    .catch(err => {
        
    })

    function searchJoke(term) {
        return $.ajax({
            url: 'https://icanhazdadjoke.com/search?term=' + term,
            headers: {
                'Accept': 'application/json'        
            }
        }).then(res => {
            return res.results.map(result => result.joke)
        }).catch(err => {
            console.log(err);
            return 'There was an error making the reqeuest';
        });
    }
    
    const $jokeForm = $('<form>');
    const $jokeInput = $('<input>', {
        placeholder: 'Enter search term'
    });
    const $submitBtn = $('<input>', {
        type: 'submit',
        value: '😂 Search!'
    });
    
    $jokeForm
        .append($jokeInput)
        .append($submitBtn)
        .appendTo(document.body)
        .on('submit', event => {
            event.preventDefault();
            const searchTerm = $jokeInput.val();
            searchJoke(searchTerm)
                .then(jokesArray => {
                    $(jokesArray).each((index, joke) => {
                        $('<p>', {
                            text: joke
                        }).appendTo(document.body)
                            .on('click', event => {
                                console.log('Removing ' + joke);
                                $(event.target).remove();
                            })
                    })
                })
        });
    
    // const $buttonPressed = $('<button>', {
    //     text : 'test button'
    // }).css('margin-top', '50px').on('click', event=> {
    //     console.log('Button Pressed')
    // })
    
    // $buttonPressed.appendTo($(document.body));









