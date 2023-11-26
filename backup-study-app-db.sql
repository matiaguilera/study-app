CREATE DATABASE db_study_app;

ALTER DATABASE db_study_app OWNER TO postgres;

\connect db_study_app

CREATE SCHEMA public;

ALTER SCHEMA public OWNER TO postgres;

COMMENT ON SCHEMA public IS 'standard public schema';

CREATE SEQUENCE public.users_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.users_id_seq OWNER TO postgres;

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.users_id_seq'::regclass) PRIMARY KEY,
    name character varying,
    last_name character varying,
    email character varying,
    password character varying,
    deleted boolean,
    token character varying
);

ALTER TABLE public.users OWNER TO postgres;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

INSERT INTO public.users VALUES (1, 'Alan', 'D', 'alan@gmail.com', '123', false, null);

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.topics_id_seq OWNER TO postgres;

CREATE TABLE public.topics (
    id integer DEFAULT nextval('public.topics_id_seq'::regclass) PRIMARY KEY,
    create_date timestamp without time zone,
    name character varying,
    description character varying,
    "order" integer,
    priority integer,
    owner_user_id integer REFERENCES public.users(id)
);

ALTER TABLE public.topics OWNER TO postgres;

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;

INSERT INTO public.topics VALUES (1, '2023-05-12 00:00:00', 'Lenguaje IV', 'Aprender Java EE', 1, 1, 1);

CREATE SEQUENCE public.topic_properties_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.topic_properties_id_seq OWNER TO postgres;

CREATE TABLE public.topic_properties (
    id integer DEFAULT nextval('public.topic_properties_id_seq'::regclass) PRIMARY KEY,
    topic_id integer REFERENCES public.topics(id),
    property_name character varying,
    property_value character varying
);

ALTER TABLE public.topic_properties OWNER TO postgres;

ALTER SEQUENCE public.topic_properties_id_seq OWNED BY public.topic_properties.id;

INSERT INTO public.topic_properties VALUES (1, 1, 'unidad 1', '1');

CREATE SEQUENCE public.topic_items_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.topic_items_id_seq OWNER TO postgres;

CREATE TABLE public.topic_items (
    id integer DEFAULT nextval('public.topics_id_seq'::regclass) PRIMARY KEY,
    create_date timestamp without time zone,
    name character varying,
    description character varying,
    topic_id integer REFERENCES public.topics(id)
);

ALTER TABLE public.topic_items OWNER TO postgres;

ALTER SEQUENCE public.topic_items_id_seq OWNED BY public.topic_items.id;

INSERT INTO public.topic_items VALUES (1, '2023-05-19 00:00:00', 'Tema 1', 'Algoritmos', 1);

CREATE SEQUENCE public.comments_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.comments_id_seq OWNER TO postgres;

CREATE TABLE public.comments (
    id integer DEFAULT nextval('public.comments_id_seq'::regclass) PRIMARY KEY,
    create_date timestamp without time zone,
    content character varying,
    theme_id integer REFERENCES public.topics(id),
    owner_user_id integer REFERENCES public.users(id)
);

ALTER TABLE public.comments OWNER TO postgres;

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;

INSERT INTO public.comments VALUES (1, '2023-05-19 00:00:00', 'Comentario 1', 1, 1);

