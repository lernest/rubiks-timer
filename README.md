# rubiks-timer

## Project setup
```
npm install
```
# Rubiks Cube Timer

### Flashcards mode

Cycle through selected cases.
- Start whole thing on 'space'
- Record time and move to next case on next 'space'
- No time between spaces or time between spaces (toggle setting)

-------

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Start a postgres container to connect to

`docker run -e POSTGRES_PASSWORD=lol --name=pg --rm -d -p 5432:5432 postgres:14`

---

### Connect to this database through pgAdmin

Create a db called 'rubiks'

### Initialize the recipe table

```
CREATE SEQUENCE public.rubiks_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public.rubiks_id_seq
    OWNER TO postgres;

CREATE TABLE public.rubiks
(
    id integer NOT NULL DEFAULT nextval('rubiks_id_seq'::regclass),
    phase text COLLATE pg_catalog."default",
    date datetime COLLATE pg_catalog."default",
    duration interval COLLATE pg_catalog."default",
    CONSTRAINT rubiks_pkey PRIMARY KEY (id)
);

TABLESPACE pg_default;

ALTER TABLE public.rubiks
    OWNER to postgres;
```
