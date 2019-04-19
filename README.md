# Very simple forum concept using a Node.js framework called Adonis

This is a very simple forum concept using AdonisJs, it comes pre-configured with:

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

it requires Node.js

install adonis cli `npm i -g @adonisjs/cli`

run `npm install`

to create the database run `adonis migration:run`

to serve locally run `adonis server --dev`

For development it's using SQlite so it will create the database automatically when you run the migrations