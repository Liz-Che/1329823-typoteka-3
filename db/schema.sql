-- Database: typoteka

-- DROP DATABASE typoteka;

CREATE DATABASE typoteka
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE TABLE users (
    id bigserial NOT NULL PRIMARY KEY,
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    email character varying(100) NOT NULL UNIQUE,
    password character varying(100) NOT NULL,
    avatar character varying(1000) NOT NULL
);

CREATE TABLE categories (
    id bigserial NOT NULL PRIMARY KEY,
    title character varying(100) NOT NULL UNIQUE
);

CREATE TABLE articles (
    id bigserial NOT NULL PRIMARY KEY,
    user_id bigint NOT NULL,
    title character varying(250) NOT NULL, 
    announce character varying(250),
    full_text character varying(1000) NOT NULL,
    created_date date NOT NULL,
    picture character varying(150) NOT NULL,
	  FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE articles_categories (
  article_id bigint,
  category_id bigint,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE comments (
    id bigserial NOT NULL PRIMARY KEY,
    article_id bigint NOT NULL,
    user_id bigint NOT NULL,
    text character varying(1000) NOT NULL,
    created_date date NOT NULL,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);
