/*
CREATE SCHEMA IF NOT EXISTS `app_mobilidade`;
USE `app_mobilidade`;
*/

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

SET `FOREIGN_KEY_CHECKS` = 0;

	DROP TABLE IF EXISTS
		`usuarios`
	;

SET `FOREIGN_KEY_CHECKS` = 1;

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


CREATE TABLE `usuarios`
( 	
	`id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,

	`email` VARCHAR(140) UNIQUE NOT NULL, 
	`senha` CHAR(64) NOT NULL, -- SHA256 em Hexadecimal

	`nome` VARCHAR(190) NOT NULL,

    -- IDs que são permitidas a rastrear esse usuário, separadas por ","
	`permitidos_rastreamento` VARCHAR(1000) CHARSET `ASCII` NOT NULL DEFAULT '',
	INDEX(`id`), INDEX(`email`)
)
CHARSET=`UTF8` ENGINE=`INNODB`;


/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


INSERT INTO `usuarios`
(
	`email`,
	`senha`,
	`nome`,
)
VALUES
(
	'henry_tuori@hotmail.com', 
	SHA2('apps', 256),
	'Henrique Borsatto de Campos'
);

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */





-- Select cervejas total informação
SELECT DISTINCT
	cervejas.id as id,
    cervejas.nome as nome,
    cervejas.descricao as descricao,
    cervejas.abv as abv,
    cervejas_estilos.id_estilo as id_estilo,
    cervejas_paises.id_pais as id_pais
FROM
	cervejas
INNER JOIN 
	cervejas_estilos
ON
	cervejas_estilos.id_cerveja = cervejas.id
INNER JOIN 
	cervejas_paises
ON
	cervejas_paises.id_cerveja = cervejas.id
;  




-- Select cervejas total informação única pronta para PHP explode nas de "array"
SELECT DISTINCT
	cervejas.id as id,
    cervejas.nome as nome,
    cervejas.descricao as descricao,
    cervejas.abv as abv,
    (SELECT GROUP_CONCAT(cervejas_estilos.id_estilo SEPARATOR ',') FROM cervejas_estilos WHERE cervejas.id = cervejas_estilos.id_cerveja) as ids_estilos,
    (SELECT GROUP_CONCAT(cervejas_paises.id_pais SEPARATOR ',') FROM cervejas_paises WHERE cervejas.id = cervejas_paises.id_cerveja) as ids_paises
FROM
	cervejas
;






-- Select países usados
SELECT DISTINCT
	paises.id as id,
    paises.nome as nome
FROM
	paises
WHERE
	paises.id IN (SELECT cervejas_paises.id_pais FROM cervejas_paises)
;

-- Select estilos usados
SELECT DISTINCT
	estilos.id as id,
    estilos.nome as nome
FROM
	estilos
WHERE
	estilos.id IN (SELECT cervejas_estilos.id_estilo FROM cervejas_estilos)
;





-- Select Estatísticas de ABV
SELECT
	MAX(abv) as maximo,
    MIN(abv) as minimo,
    AVG(abv) as media
FROM
	cervejas
;