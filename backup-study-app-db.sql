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
    avatar character varying,
    deleted boolean,
    token character varying
);

ALTER TABLE public.users OWNER TO postgres;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

INSERT INTO public.users VALUES (1, 'Gabriela', 'Ortega', 'gabi@gmail.com', '123', null, false, null);

CREATE SEQUENCE public.themes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE public.themes_id_seq OWNER TO postgres;

CREATE TABLE public.themes (
    id integer DEFAULT nextval('public.subjects_id_seq'::regclass) PRIMARY KEY,
    create_date timestamp without time zone,
    name character varying,
    description character varying,
    keywords character varying,
    owner_user_id integer REFERENCES public.users(id)
);

ALTER TABLE public.themes OWNER TO postgres;

ALTER SEQUENCE public.themes_id_seq OWNED BY public.subjects.id;

INSERT INTO public.themes VALUES (1, '2023-05-12 00:00:00', 'Lenguaje IV', 'Aprender Java EE', 'programar, lenguaje', 1);

CREATE SEQUENCE public.themes_properties_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.themes_properties_id_seq OWNER TO postgres;

CREATE TABLE public.themes_properties (
    id integer DEFAULT nextval('public.themes_properties_id_seq'::regclass) PRIMARY KEY,
    theme_id integer REFERENCES public.topics(id);,
    property_name character varying,
    property_value character varying
);

ALTER TABLE public.themes_properties OWNER TO postgres;

ALTER SEQUENCE public.themes_properties_id_seq OWNED BY public.themes_properties.id;

INSERT INTO public.themes_properties VALUES (1, 1, 'unidad1', '1');

CREATE SEQUENCE public.topics_id_seq AS integer START WITH 1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER TABLE public.topics_id_seq OWNER TO postgres;

CREATE TABLE public.topics (
    id integer DEFAULT nextval('public.topics_id_seq'::regclass) PRIMARY KEY,
    create_date timestamp without time zone,
    name character varying,
    theme_id integer REFERENCES public.subjects(id),
    "order" integer,
    priority integer,
    color character varying,
    owner_user_id integer REFERENCES public.users(id)
);

ALTER TABLE public.topics OWNER TO postgres;

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;

INSERT INTO public.topics VALUES (1, '2023-05-19 00:00:00', 'Topico Parcial', 1, 1, 1, 'Rojo', NULL);