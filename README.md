# website

A minimal personal website for me

I do have another [personal "website"](https://ankumeah.github.io/bento/)
but I wanted something minimal and plus I kinda got intrested
in web dev so I decided to make another one

## Special thing about this website
I made my own css in js lib for this in [./modifier.js](./modifier.js)
which was inspirted from the [modifier system](https://developer.android.com/develop/ui/compose/modifiers)
in [jetpack compose](https://developer.android.com/compose) (yes your boy was intrested in android dev)

One dev opinion I will die with is that compose's modifier system is the only
sane way to write UI.

Now it does not perfectly act like modifier, rather it is still just css trough js
but just recreates the best part of compose's modifier system i.e. chaining order based
modifier

You will see that despite having this lib I am still using raw CSS too so whats with that?
Well thats the point, my main HTML and CSS describes my intent, my js does all the dirty work
