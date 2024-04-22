





function getQoutes() {

    Quote = [
        {
            quote: "The best revenge is massive success.",
            Auther: "--Frank Sinatra"
        },
        {
            quote: "Do not take life too seriously.You will not get out alive.",
            Auther: "--Elbert Hubbard"
        },
        {
            quote: "Resentment is like drinking poison and waiting for your enemies to die.",
            Auther: "--Nelson Mandela"
        },
        {
            quote: "You miss 100 % of the shots you don't take.",
            Auther: "--Wayne Gretzy"
        },
        {
            quote: "It's not what happens to you, but how you react to it that matters.",
            Auther: "--Epictetus"
        },
    ]

    var num = Math.floor(Math.random() * Quote.length)
    console.log(num)

    document.getElementById("quote").innerHTML = Quote[num].quote;
    document.getElementById("Auther").innerHTML = Quote[num].Auther;

}

var button = document.querySelector('button');
button.addEventListener('click', getQoutes);

