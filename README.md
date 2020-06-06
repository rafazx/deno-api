# deno-api
This is a rest web API built with deno and using mongodb as database

Installation
Just see the deno documentation https://deno.land/ after download deno you can run this api.

<h5>don't forget to chagne the .env to your configurations</h5>

Running
$ denon run --allow-net  --allow-read --unstable --allow-write --allow-plugin --allow-env 'path to server.js'

# testing
$ deno test --unstable --allow-read --allow-write --allow-net --allow-plugin --allow-env user.spec.ts 
