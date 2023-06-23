--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11
-- Dumped by pg_dump version 12.11

-- Started on 2023-05-19 20:21:03

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2864 (class 1262 OID 16994)
-- Name: db_study_app; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE db_study_app WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';


ALTER DATABASE db_study_app OWNER TO postgres;

\connect db_study_app

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 2865 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 17084)
-- Name: themes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.themes (
    id integer NOT NULL,
    create_date timestamp without time zone,
    name character varying,
    description character varying,
    keywords character varying,
    owner_user_id integer
);


ALTER TABLE public.themes OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 17082)
-- Name: themes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.themes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.themes_id_seq OWNER TO postgres;

--
-- TOC entry 2866 (class 0 OID 0)
-- Dependencies: 206
-- Name: themes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.themes_id_seq OWNED BY public.themes.id;


--
-- TOC entry 203 (class 1259 OID 16997)
-- Name: themes_properties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.themes_properties (
    id integer NOT NULL,
    theme_id integer,
    property_name character varying,
    property_value character varying
);


ALTER TABLE public.themes_properties OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16995)
-- Name: themes_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.themes_properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.themes_properties_id_seq OWNER TO postgres;

--
-- TOC entry 2867 (class 0 OID 0)
-- Dependencies: 202
-- Name: themes_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.themes_properties_id_seq OWNED BY public.themes_properties.id;


--
-- TOC entry 209 (class 1259 OID 17100)
-- Name: topics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    create_date timestamp without time zone,
    name character varying,
    topic_id integer,
    "order" integer,
    priority integer,
    color character varying,
    owner_user_id integer
);


ALTER TABLE public.topics OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 17098)
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.topics_id_seq OWNER TO postgres;

--
-- TOC entry 2868 (class 0 OID 0)
-- Dependencies: 208
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- TOC entry 205 (class 1259 OID 17073)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    last_name character varying,
    avatar character varying,
    email character varying,
    password character varying,
    deleted boolean,
    token character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 17071)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2869 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2711 (class 2604 OID 17087)
-- Name: themes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes ALTER COLUMN id SET DEFAULT nextval('public.themes_id_seq'::regclass);


--
-- TOC entry 2709 (class 2604 OID 17000)
-- Name: themes_properties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes_properties ALTER COLUMN id SET DEFAULT nextval('public.themes_properties_id_seq'::regclass);


--
-- TOC entry 2712 (class 2604 OID 17103)
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- TOC entry 2710 (class 2604 OID 17076)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2856 (class 0 OID 17084)
-- Dependencies: 207
-- Data for Name: themes; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.themes VALUES (1, '2023-05-12 00:00:00', 'Lenguaje IV', 'Aprender Java EE', 'programar, lenguaje', 1);
INSERT INTO public.themes VALUES (2, '2023-05-12 00:00:00', 'Lenguaje V', 'Aprender Ionic y Node.js', 'programar, lenguaje, modf', 1);
INSERT INTO public.themes VALUES (5, '2023-05-12 00:00:00', 'Idiomas', 'Aprender Ingles', 'ingles, castellano', 1);
INSERT INTO public.themes VALUES (4, '2023-05-19 00:00:00', 'Algoritmica', 'Logica de Programacion', 'programar, logica', 1);
INSERT INTO public.themes VALUES (6, '2023-05-19 00:00:00', 'Matematica IV', 'Aprender a multiplicar', 'multiplicar, matematica, numeros', 1);


--
-- TOC entry 2852 (class 0 OID 16997)
-- Dependencies: 203
-- Data for Name: themes_properties; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.themes_properties VALUES (1, 1, 'unidad1', '1');
INSERT INTO public.themes_properties VALUES (3, 1, 'porcentaje completo', '10');
INSERT INTO public.themes_properties VALUES (5, 4, 'visitado', 'Falso');


--
-- TOC entry 2858 (class 0 OID 17100)
-- Dependencies: 209
-- Data for Name: topics; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.topics VALUES (3, '2023-05-19 00:00:00', 'Topico Parcial', 3, 2, 100, 'Rojo', NULL);
INSERT INTO public.topics VALUES (15, '2023-05-19 00:00:00', 'Topico Dos', NULL, 3, 2, 'Lila', NULL);


--
-- TOC entry 2854 (class 0 OID 17073)
-- Dependencies: 205
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (4, 'nuevo user desde postman', 'apellido desde postman', 'null', 'nuevo@gmail.com', '1238', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoibnVldm8gdXNlciBkZXNkZSBwb3N0bWFuIiwibGFzdF9uYW1lIjoiYXBlbGxpZG8gZGVzZGUgcG9zdG1hbiIsImF2YXRhciI6Im51bGwiLCJlbWFpbCI6Im51ZXZvQGdtYWlsLmNvbSIsImlhdCI6MTY4NDU0MDg0N30.8IugiqYJSp_-ygKCsYfxFPR8yXj5pyi5c01-exYlu_Q');
INSERT INTO public.users VALUES (7, 'modif user desde postman aaa2', 'modif apellido desde postman aaa2', '3223', 'nuevo@gmail.com aaa', '1238 aaa', true, NULL);
INSERT INTO public.users VALUES (1, 'Gabriela', 'Ortega', NULL, 'gabi@gmail.com', '123', false, NULL);
INSERT INTO public.users VALUES (8, 'nuevodesdewebjey', 'desedeskjsdnk', NULL, 'nuevo@gmail.com', NULL, true, NULL);
INSERT INTO public.users VALUES (9, 'para', 'eliminar', NULL, 'elimad@gmail.com', NULL, true, NULL);
INSERT INTO public.users VALUES (10, 'hol', 'udf', NULL, 'iofcs', NULL, true, NULL);
INSERT INTO public.users VALUES (11, 'gfdhg', 'fhsf', NULL, 'fsh', NULL, true, NULL);
INSERT INTO public.users VALUES (12, 'hdgd', 'dghfghdf', NULL, '43535', NULL, true, NULL);
INSERT INTO public.users VALUES (3, 'victor', 'ortiz', 'a', 'victor@gmail.com', '789', true, NULL);
INSERT INTO public.users VALUES (2, 'Iria', 'Orrego', 'ava', 'iriaorrego@gmail.com', '456', false, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiaXJpYSIsImxhc3RfbmFtZSI6Im9ycmVnbyIsImF2YXRhciI6ImF2YSIsImVtYWlsIjoiaXJpYW9ycmVnb0BnbWFpbC5jb20iLCJpYXQiOjE2ODM5MDE4Mzh9.vBGazZz2qH5-LC5jufjOV1eQ2OV8aOBCmDIZeMdyEOo');


--
-- TOC entry 2870 (class 0 OID 0)
-- Dependencies: 206
-- Name: themes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.themes_id_seq', 7, true);


--
-- TOC entry 2871 (class 0 OID 0)
-- Dependencies: 202
-- Name: themes_properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.themes_properties_id_seq', 6, true);


--
-- TOC entry 2872 (class 0 OID 0)
-- Dependencies: 208
-- Name: topics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.topics_id_seq', 16, true);


--
-- TOC entry 2873 (class 0 OID 0)
-- Dependencies: 204
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- TOC entry 2718 (class 2606 OID 17092)
-- Name: themes themes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_pkey PRIMARY KEY (id);


--
-- TOC entry 2714 (class 2606 OID 17005)
-- Name: themes_properties themes_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes_properties
    ADD CONSTRAINT themes_properties_pkey PRIMARY KEY (id);


--
-- TOC entry 2720 (class 2606 OID 17108)
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- TOC entry 2716 (class 2606 OID 17081)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2722 (class 2606 OID 17093)
-- Name: themes themes_owner_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes
    ADD CONSTRAINT themes_owner_user_id_fkey FOREIGN KEY (owner_user_id) REFERENCES public.users(id);


--
-- TOC entry 2721 (class 2606 OID 17119)
-- Name: themes_properties themes_properties_theme_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.themes_properties
    ADD CONSTRAINT themes_properties_theme_id_fkey FOREIGN KEY (theme_id) REFERENCES public.themes(id);


--
-- TOC entry 2724 (class 2606 OID 17114)
-- Name: topics topics_owner_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_owner_user_id_fkey FOREIGN KEY (owner_user_id) REFERENCES public.users(id);


--
-- TOC entry 2723 (class 2606 OID 17109)
-- Name: topics topics_topic_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_topic_id_fkey FOREIGN KEY (topic_id) REFERENCES public.topics(id);


-- Completed on 2023-05-19 20:21:03

--
-- PostgreSQL database dump complete
--

