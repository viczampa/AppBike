/*
CREATE SCHEMA IF NOT EXISTS `carrieri`;
USE `carrieri`;
*/

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */

SET `FOREIGN_KEY_CHECKS` = 0;

	DROP TABLE IF EXISTS
		`admins`,
		`cervejas`,
        `paises`,
        `estilos`,
        `cervejas_estilos`,
        `cervejas_paises`,
        /*`drafts`,*/
        `cardapio`
	;

SET `FOREIGN_KEY_CHECKS` = 1;

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


CREATE TABLE `admins`
( 	
	`id` SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`login` VARCHAR(140) UNIQUE, 
	`senha` CHAR(64), /* SHA256 em Hexadecimal */
	INDEX(`id`), INDEX(`login`)
)
CHARSET=`UTF8` ENGINE=`INNODB`;



CREATE TABLE `paises`
(
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    
    `iso` CHAR(2) NOT NULL UNIQUE,
	`iso3` CHAR(3) NOT NULL UNIQUE,
    `numcode` SMALLINT UNSIGNED NOT NULL UNIQUE,
    `nome` VARCHAR(235) NOT NULL UNIQUE,
    
    INDEX(`nome`), INDEX(`numcode`), INDEX(`iso3`), INDEX(`iso`)
)
CHARSET=`UTF8` ENGINE=`INNODB`;



CREATE TABLE `estilos`
(
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `nome` VARCHAR(235) NOT NULL UNIQUE,
    
    INDEX(`id`), INDEX(`nome`)
)
CHARSET=`UTF8` ENGINE=`INNODB`;


CREATE TABLE `cervejas`
(
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,

    `nome` VARCHAR(80) NOT NULL,
	`descricao` VARCHAR(335) NOT NULL DEFAULT 'Sem descrição',

    `abv` DECIMAL(4,2) NOT NULL,

    `datereg` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	INDEX(`id`), INDEX(`datereg`), INDEX(`abv`)
)
CHARSET=`UTF8` ENGINE=`INNODB`;




CREATE TABLE `cervejas_estilos`
(
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    
    `id_estilo` INT UNSIGNED NOT NULL,
    `id_cerveja` INT UNSIGNED NOT NULL,
    
	INDEX(`id`), INDEX(`id_cerveja`), INDEX(`id_estilo`),
    FOREIGN KEY (`id_estilo`) REFERENCES `estilos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`id_cerveja`) REFERENCES `cervejas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
CHARSET=`UTF8` ENGINE=`INNODB`;

CREATE TABLE `cervejas_paises`
(
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    
    `id_pais` INT UNSIGNED NOT NULL,
    `id_cerveja` INT UNSIGNED NOT NULL,
    
	INDEX(`id`), INDEX(`id_cerveja`), INDEX(`id_pais`),
    FOREIGN KEY (`id_pais`) REFERENCES `paises`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`id_cerveja`) REFERENCES `cervejas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
CHARSET=`UTF8` ENGINE=`INNODB`;



/*
CREATE TABLE `drafts`
(
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    
    `nome` VARCHAR(64) NOT NULL,
    `descricao` VARCHAR(128) NOT NULL DEFAULT ' ',
    `preco1` DECIMAL(4,2) NULL,
    `ap1` VARCHAR(15) NULL,
    `preco2` DECIMAL(4,2) NULL,
    `ap2` VARCHAR(15) NULL,
    
    `datereg` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	INDEX(`id`), INDEX(`datereg`)
)
CHARSET=`UTF8` ENGINE=`INNODB`;
*/


CREATE TABLE `cardapio`
(
	`id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    
    `nome` VARCHAR(80) NOT NULL,
    `descricao` VARCHAR(335) NOT NULL DEFAULT '',
    `tipo` ENUM('Appetizer','Burger','Gastronomia','Salada/Sopa','Bebida') NOT NULL,
    `preco` DECIMAL(5,2) NULL,
    
    `datereg` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	INDEX(`id`), INDEX(`datereg`), INDEX(`tipo`)
)
CHARSET=`UTF8` ENGINE=`INNODB`;


/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */


INSERT INTO `paises`
(
	`iso`,`iso3`,`numcode`,`nome`
)
VALUES
	('AF', 'AFG', '004', 'Afeganistão'),
	('ZA', 'ZAF', '710', 'África do Sul'),
	('AX', 'ALA', '248', 'Ilhas Åland'),
	('AL', 'ALB', '008', 'Albânia'),
	('DE', 'DEU', '276', 'Alemanha'),
	('AD', 'AND', '020', 'Andorra'),
	('AO', 'AGO', '024', 'Angola'),
	('AI', 'AIA', '660', 'Anguilla'),
	('AQ', 'ATA', '010', 'Antárctida'),
	('AG', 'ATG', '028', 'Antigua e Barbuda'),
	('AN', 'ANT', '530', 'Antilhas Holandesas'),
	('SA', 'SAU', '682', 'Arábia Saudita'),
	('DZ', 'DZA', '012', 'Argélia'),
	('AR', 'ARG', '032', 'Argentina'),
	('AM', 'ARM', '051', 'Arménia'),
	('AW', 'ABW', '533', 'Aruba'),
	('AU', 'AUS', '036', 'Austrália'),
	('AT', 'AUT', '040', 'Áustria'),
	('AZ', 'AZE', '031', 'Azerbeijão'),
	('BS', 'BHS', '044', 'Bahamas'),
	('BH', 'BHR', '048', 'Bahrain'),
	('BD', 'BGD', '050', 'Bangladesh'),
	('BB', 'BRB', '052', 'Barbados'),
	('BE', 'BEL', '056', 'Bélgica'),
	('BZ', 'BLZ', '084', 'Belize'),
	('BJ', 'BEN', '204', 'Benin'),
	('BM', 'BMU', '060', 'Bermuda'),
	('BY', 'BLR', '112', 'Bielo-Rússia'),
	('BO', 'BOL', '068', 'Bolívia'),
	('BA', 'BIH', '070', 'Bósnia-Herzegovina'),
	('BW', 'BWA', '072', 'Botswana'),
	('BV', 'BVT', '074', 'Ilha Bouvet'),
	('BR', 'BRA', '076', 'Brasil'),
	('BN', 'BRN', '096', 'Brunei'),
	('BG', 'BGR', '100', 'Bulgária'),
	('BF', 'BFA', '854', 'Burkina Faso'),
	('BI', 'BDI', '108', 'Burundi'),
	('BT', 'BTN', '064', 'Butão'),
	('CV', 'CPV', '132', 'Cabo Verde'),
	('KH', 'KHM', '116', 'Cambodja'),
	('CM', 'CMR', '120', 'Camarões'),
	('CA', 'CAN', '124', 'Canadá'),
	('KY', 'CYM', '136', 'Ilhas Cayman'),
	('KZ', 'KAZ', '398', 'Cazaquistão'),
	('CF', 'CAF', '140', 'República Centro-Africana'),
	('TD', 'TCD', '148', 'Chade'),
	('CZ', 'CZE', '203', 'República Checa'),
	('CL', 'CHL', '152', 'Chile'),
	('CN', 'CHN', '156', 'China'),
	('CY', 'CYP', '196', 'Chipre'),
	('CX', 'CXR', '162', 'Ilha Christmas'),
	('CC', 'CCK', '166', 'Ilhas Cocos'),
	('CO', 'COL', '170', 'Colômbia'),
	('KM', 'COM', '174', 'Comores'),
	('CG', 'COG', '178', 'República do Congo'),
	('CD', 'COD', '180', 'República Democrática do Congo (antigo Zaire)'),
	('CK', 'COK', '184', 'Ilhas Cook'),
	('KR', 'KOR', '410', 'Coreia do Sul'),
	('KP', 'PRK', '408', 'República Democrática da Coreia (Coreia do Norte)'), -- KKKKKKKKKKKKKKKKKKKKK
	('CI', 'CIV', '384', 'Costa do Marfim'),
	('CR', 'CRI', '188', 'Costa Rica'),
	('HR', 'HRV', '191', 'Croácia'),
	('CU', 'CUB', '192', 'Cuba'),
	('DK', 'DNK', '208', 'Dinamarca'),
	('DJ', 'DJI', '262', 'Djibouti'),
	('DM', 'DMA', '212', 'Dominica'),
	('DO', 'DOM', '214', 'República Dominicana'),
	('EG', 'EGY', '818', 'Egipto'),
	('SV', 'SLV', '222', 'El Salvador'),
	('AE', 'ARE', '784', 'Emiratos Árabes Unidos'),
	('EC', 'ECU', '218', 'Equador'),
	('ER', 'ERI', '232', 'Eritreia'),
	('SK', 'SVK', '703', 'Eslováquia'),
	('SI', 'SVN', '705', 'Eslovénia'),
	('ES', 'ESP', '724', 'Espanha'),
	('US', 'EUA', '840', 'Estados Unidos'),
	('EE', 'EST', '233', 'Estónia'),
	('ET', 'ETH', '231', 'Etiópia'),
	('FO', 'FRO', '234', 'Ilhas Faroe'),
	('FJ', 'FJI', '242', 'Fiji'),
	('PH', 'PHL', '608', 'Filipinas'),
	('FI', 'FIN', '246', 'Finlândia'),
	('FR', 'FRA', '250', 'França'),
	('GA', 'GAB', '266', 'Gabão'),
	('GM', 'GMB', '270', 'Gâmbia'),
	('GH', 'GHA', '288', 'Gana'),
	('GE', 'GEO', '268', 'Geórgia'),
	('GS', 'SGS', '239', 'Ilhas Geórgia do Sul e Sandwich do Sul'),
	('GI', 'GIB', '292', 'Gibraltar'),
	('GR', 'GRC', '300', 'Grécia'),
	('GD', 'GRD', '308', 'Grenada'),
	('GL', 'GRL', '304', 'Gronelândia'),
	('GP', 'GLP', '312', 'Guadeloupe'),
	('GU', 'GUM', '316', 'Guam'),
	('GT', 'GTM', '320', 'Guatemala'),
	('GG', 'GGY', '831', 'Guernsey'),
	('GY', 'GUY', '328', 'Guiana'),
	('GF', 'GUF', '254', 'Guiana Françasa'),
	('GW', 'GNB', '624', 'Guiné-Bissau'),
	('GN', 'GIN', '324', 'Guiné-Conacri'),
	('GQ', 'GNQ', '226', 'Guiné Equatorial'),
	('HT', 'HTI', '332', 'Haiti'),
	('HM', 'HMD', '334', 'Ilha Heard e Ilhas McDonald'),
	('HN', 'HND', '340', 'Honduras'),
	('HK', 'HKG', '344', 'Hong Kong'),
	('HU', 'HUN', '348', 'Hungria'),
	('YE', 'YEM', '887', 'Iémen'),
	('IN', 'IND', '356', 'Índia'),
	('ID', 'IDN', '360', 'Indonésia'),
	('IQ', 'IRQ', '368', 'Iraque'),
	('IR', 'IRN', '364', 'Irão'),
	('IE', 'IRL', '372', 'Irlanda'),
	('IS', 'ISL', '352', 'Islândia'),
	('IL', 'ISR', '376', 'Israel'),
	('IT', 'ITA', '380', 'Itália'),
	('JM', 'JAM', '388', 'Jamaica'),
	('JP', 'JPN', '392', 'Japão'),
	('JE', 'JEY', '832', 'Jersey'),
	('JO', 'JOR', '400', 'Jordânia'),
	('KI', 'KIR', '296', 'Kiribati'),
	('KW', 'KWT', '414', 'Kuwait'),
	('LA', 'LAO', '418', 'Laos'),
	('LS', 'LSO', '426', 'Lesoto'),
	('LV', 'LVA', '428', 'Letónia'),
	('LB', 'LBN', '422', 'Líbano'),
	('LR', 'LBR', '430', 'Libéria'),
	('LY', 'LBY', '434', 'Líbia'),
	('LI', 'LIE', '438', 'Liechtenstein'),
	('LT', 'LTU', '440', 'Lituânia'),
	('LU', 'LUX', '442', 'Luxemburgo'),
	('MO', 'MAC', '446', 'Macau'),
	('MK', 'MKD', '807', 'República da Macedónia'),
	('MG', 'MDG', '450', 'Madagáscar'),
	('MY', 'MYS', '458', 'Malásia'),
	('MW', 'MWI', '454', 'Malawi'),
	('MV', 'MDV', '462', 'Maldivas'),
	('ML', 'MLI', '466', 'Mali'),
	('MT', 'MLT', '470', 'Malta'),
	('FK', 'FLK', '238', 'Ilhas Malvinas (Falkland)'),
	('IM', 'IMN', '833', 'Ilha de Man'),
	('MP', 'MNP', '580', 'Marianas Setentrionais'),
	('MA', 'MAR', '504', 'Marrocos'),
	('MH', 'MHL', '584', 'Ilhas Marshall'),
	('MQ', 'MTQ', '474', 'Martinica'),
	('MU', 'MUS', '480', 'Maurícia'),
	('MR', 'MRT', '478', 'Mauritânia'),
	('YT', 'MYT', '175', 'Mayotte'),
	('UM', 'UMI', '581', 'Ilhas Menores Distantes dos Estados Unidos'),
	('MX', 'MEX', '484', 'México'),
	('MM', 'MMR', '104', 'Myanmar (antiga Birmânia)'),
	('FM', 'FSM', '583', 'Estados Federados da Micronésia'),
	('MZ', 'MOZ', '508', 'Moçambique'),
	('MD', 'MDA', '498', 'Moldávia'),
	('MC', 'MCO', '492', 'Mónaco'),
	('MN', 'MNG', '496', 'Mongólia'),
	('ME', 'MNE', '499', 'Montenegro'),
	('MS', 'MSR', '500', 'Montserrat'),
	('NA', 'NAM', '516', 'Namíbia'),
	('NR', 'NRU', '520', 'Nauru'),
	('NP', 'NPL', '524', 'Nepal'),
	('NI', 'NIC', '558', 'Nicarágua'),
	('NE', 'NER', '562', 'Níger'),
	('NG', 'NGA', '566', 'Nigéria'),
	('NU', 'NIU', '570', 'Niue'),
	('NF', 'NFK', '574', 'Ilha Norfolk'),
	('NO', 'NOR', '578', 'Noruega'),
	('NC', 'NCL', '540', 'Nova Caledónia'),
	('NZ', 'NZL', '554', 'Nova Zelândia (Aotearoa)'),
	('OM', 'OMN', '512', 'Oman'),
	('NL', 'NLD', '528', 'Holanda'), -- Países Baixos (Holanda)
	('PW', 'PLW', '585', 'Palau'),
	('PS', 'PSE', '275', 'Palestina'),
	('PA', 'PAN', '591', 'Panamá'),
	('PG', 'PNG', '598', 'Papua-Nova Guiné'),
	('PK', 'PAK', '586', 'Paquistão'),
	('PY', 'PRY', '600', 'Paraguai'),
	('PE', 'PER', '604', 'Peru'),
	('PN', 'PCN', '612', 'Pitcairn'),
	('PF', 'PYF', '258', 'Polinésia Françasa'),
	('PL', 'POL', '616', 'Polónia'),
	('PR', 'PRI', '630', 'Porto Rico'),
	('PT', 'PRT', '620', 'Portugal'),
	('QA', 'QAT', '634', 'Qatar'),
	('KE', 'KEN', '404', 'Quénia'),
	('KG', 'KGZ', '417', 'Quirguistão'),
	('GB', 'GBR', '826', 'Inglaterra'), -- Reino Unido da Grã-Bretanha e Irlanda do Norte
	('RE', 'REU', '638', 'Reunião'),
	('RO', 'ROU', '642', 'Roménia'),
	('RW', 'RWA', '646', 'Ruanda'),
	('RU', 'RUS', '643', 'Rússia'),
	('EH', 'ESH', '732', 'Saara Ocidental'),
	('AS', 'ASM', '016', 'Samoa Americana'),
	('WS', 'WSM', '882', 'Samoa (Samoa Ocidental)'),
	('PM', 'SPM', '666', 'Saint Pierre et Miquelon'),
	('SB', 'SLB', '090', 'Ilhas Salomão'),
	('KN', 'KNA', '659', 'São Cristóvão e Névis (Saint Kitts e Nevis)'),
	('SM', 'SMR', '674', 'San Marino'),
	('ST', 'STP', '678', 'São Tomé e Príncipe'),
	('VC', 'VCT', '670', 'São Vicente e Granadinas'),
	('SH', 'SHN', '654', 'Santa Helena'),
	('LC', 'LCA', '662', 'Santa Lúcia'),
	('SN', 'SEN', '686', 'Senegal'),
	('SL', 'SLE', '694', 'Serra Leoa'),
	('RS', 'SRB', '688', 'Sérvia'),
	('SC', 'SYC', '690', 'Seychelles'),
	('SG', 'SGP', '702', 'Singapura'),
	('SY', 'SYR', '760', 'Síria'),
	('SO', 'SOM', '706', 'Somália'),
	('LK', 'LKA', '144', 'Sri Lanka'),
	('SZ', 'SWZ', '748', 'Suazilândia'),
	('SD', 'SDN', '736', 'Sudão'),
	('SE', 'SWE', '752', 'Suécia'),
	('CH', 'CHE', '756', 'Suíça'),
	('SR', 'SUR', '740', 'Suriname'),
	('SJ', 'SJM', '744', 'Svalbard e Jan Mayen'),
	('TH', 'THA', '764', 'Tailândia'),
	('TW', 'TWN', '158', 'Taiwan'),
	('TJ', 'TJK', '762', 'Tajiquistão'),
	('TZ', 'TZA', '834', 'Tanzânia'),
	('TF', 'ATF', '260', 'Terras Austrais e Antárticas Françasas (TAAF)'),
	('IO', 'IOT', '086', 'Território Britânico do Oceano Índico'),
	('TL', 'TLS', '626', 'Timor-Leste'),
	('TG', 'TGO', '768', 'Togo'),
	('TK', 'TKL', '772', 'Toquelau'),
	('TO', 'TON', '776', 'Tonga'),
	('TT', 'TTO', '780', 'Trindade e Tobago'),
	('TN', 'TUN', '788', 'Tunísia'),
	('TC', 'TCA', '796', 'Turks e Caicos'),
	('TM', 'TKM', '795', 'Turquemenistão'),
	('TR', 'TUR', '792', 'Turquia'),
	('TV', 'TUV', '798', 'Tuvalu'),
	('UA', 'UKR', '804', 'Ucrânia'),
	('UG', 'UGA', '800', 'Uganda'),
	('UY', 'URY', '858', 'Uruguai'),
	('UZ', 'UZB', '860', 'Usbequistão'),
	('VU', 'VUT', '548', 'Vanuatu'),
	('VA', 'VAT', '336', 'Vaticano'),
	('VE', 'VEN', '862', 'Venezuela'),
	('VN', 'VNM', '704', 'Vietname'),
	('VI', 'VIR', '850', 'Ilhas Virgens Americanas'),
	('VG', 'VGB', '092', 'Ilhas Virgens Britânicas'),
	('WF', 'WLF', '876', 'Wallis e Futuna'),
	('ZM', 'ZMB', '894', 'Zâmbia'),
	('ZW', 'ZWE', '716', 'Zimbabwe')
;




INSERT INTO `estilos`
	(`nome`)
VALUES
	('Bière Brut')
	,('Golden Strong Ale')
	,('American Barleywine')
	,('India Pale Ale (Ipa)')
	,('Berliner Weisse')
	,('Abbey Tripel')
	,('Belgian Strong Ale')
	,('Saison')
	,('Traditional Ale')
	,('Old Ale')
	,('Session Ipa')
	,('Porter')
	,('India Pale Ale')
	,('Scotch Ale')
	,('Doppelbock')
	,('Sour Red/Brown')
	,('Premium Bitter/Esb')
	,('Amber Ale')
	,('Imperial Ipa')
	,('German Hefeweizen')
	,('Abbey Dubbel')
	,('Smoked')
	,('English Strong Ale')
	,('Stout')
	,('Belgian Ale')
	,('Witbier')
	,('Zwickel/Keller/Landbier')
	,('Bitter')
	,('Heller Bock')
	,('Sour/Wild Ale')
	,('Amber Lager/Vienna')
	,('Brown Ale')
	,('Pilsener')
	,('Wheat Ale')
	,('Imperial Stout')
	,('Imperial Porter')
	,('Farmhouse Ale')
	,('Spice')
	,('Abey Tripel')
;


INSERT INTO `admins`
	(`login`,`senha`)
VALUES
	('2up',SHA2('2up', 256));



-- `tipo` = ENUM('Appetizer','Burger','Gastronomia','Salada/Sopa','Bebida')
INSERT INTO `cardapio`
(
	`tipo`, `nome`, `preco`, `descricao`
)
VALUES
	('Appetizer',		'Onion Rings',								38.90, 'Crocantes anéis de cebola empanada polvilhada com parmesão acompanha molho Bistro Barbecue.')
	,('Appetizer',		'Buffalo Wings',							39.90, '12 Sobreasas de frango com uma mistura de temperos especiais e acompanhadas de molho blue cheese e aipo.')
    ,('Appetizer',		'Colorado',									38.90, 'Exclusivas batatas fritas country cobertas com mix de queijo, bacon tostado servido com Molho Ranch.')
    ,('Appetizer',		'Polenta Al Arrabiata',						28.90, 'Nossa Polenta Sequinha e crocante coberta com lascas de parmesão Servida com molho sauce tabasco.')
    ,('Appetizer',		'Coxinhas De Frango Com Catupiry',			29.90, 'Sequinhas e Crocantes extra Recheadas (6unid).')
    ,('Appetizer',		'Appetizer Mix',							39.90, 'Um mix de Polenta, Batata fritas e Buffalo Wings.')
    ,('Appetizer',		'Azapa',									19.90, 'Azeitonas Chilenas Graúdas.')
    ,('Appetizer',		'Dadinho De Tapioca',						29.90, 'Dadinho de tapioca com queijo coalho acompanha geleia de Pimenta')
    ,('Burger',			'Black n''Blue',							26.80, 'Hambúrguer artesanal, Blue Cheese, Bacon e cebola Caramelizados.')
    ,('Burger',			'The Classic',								24.80, 'Hambúrguer artesanal, Queijo Prato, Alface, Tomate, Cebola Roxa, pepino e Honey Maionese.')
    ,('Burger',			'Brie King',								26.90, 'Hambúrguer artesanal, Queijo Brie, Cebolas vermelhas, Bacon e Marmelada.')
	,('Burger',			'Italian Burguer',							26.90, 'Hamburguer artesanal, Queijo Provolone, Folhas de Rúcula e Tomate Seco.')
	,('Burger',			'Cheddar Burguer',							26.90, 'Hamburguer artesanal, Aged Vermont Cheddar, Bacon defumado, BBQ Sauce.')
	,('Burger',			'Mexican Burguer',							26.99, 'Hamburguer artesanal, Mozzarella de Búfala, Guacamole e Pico de Gallo.')
	,('Gastronomia',	'Lasagne Carrieri',							29.99, 'Lasanha Verde a Bolonhesa gratinada com queijos.')
    ,('Gastronomia',	'Beringela à Parmegianna',					39.90, 'Beringela grelhada gratinada com queijos.')
    ,('Gastronomia',	'Picadinho de Carne com Farofa de Banana',	26.99, 'Carne picada e temperada servida com farofa de Banana e arroz branco.')
    ,('Gastronomia',	'Filé à Parmegianna',						39.99, 'File Mignon empanado coberto com Mozzarella e molho ao sugo servido com arroz branco e batatas fritas.')
    ,('Gastronomia',	'Ancho Steak',								44.99, '350gr de Bife Ancho Argentino (Angus) preparado na Grelha e servido com Mashed Potatoes.')
    ,('Gastronomia',	'Ribs Carrieri',							54.99, 'Costelas de porco defumada e grelhada regada com delicioso molho Barbecue servida com fritas.')
    ,('Salada/Sopa',	'Chicken Salad',							29.99, 'Tiras de Frango Grelhado com nosso tempero especial sobre nossa Cesar Salad.')
    ,('Salada/Sopa',	'Blue Salad',								29.99, 'Sobre uma concha de Alface Americano, Molho blue Cheese, Ovos e Crutons de Bacon.')
    ,('Salada/Sopa',	'Sopa Creme do Dia',						24.99, 'Informe-se com nosso atendente a disponibilidade do dia.')
    ,('Bebida',			'Old Pepper Kentucky Bourbon DS',			24.99, '')
    ,('Bebida',			'Whiskie Imp.red Label DS',					18.00, '')
    ,('Bebida',			'Whiskie Imp.black Label DS',				26.90, '')
    ,('Bebida',			'Vodka Nacional DS',						13.90, '')
    ,('Bebida',			'Vodka Importada DS',						20.90, '')
    ,('Bebida',			'Steinhager Nacional DS',					13.90, '')
    ,('Bebida',			'Sake Nacional DS',							13.90, '')
    ,('Bebida',			'Tequila Importada DS',						20.90, '')
    ,('Bebida',			'Xellent Swiss Gim DS',						28.80, '')
    ,('Bebida',			'Caipira Cachaça',							22.90, '')
    ,('Bebida',			'Caipira Vodka Nacional',					25.90, '')
    ,('Bebida',			'Caipira Vodka Importada',					34.99, '')
    ,('Bebida',			'Caipira Steinhager Nacional',				22.90, '')
    ,('Bebida',			'Caipira Sake Nacional',					24.90, '')
    ,('Bebida',			'Refrigerantes Lata',						06.99, '')
    ,('Bebida',			'Água',										06.60, '')
    ,('Bebida',			'Sucos Naturais',							09.99, '')
    ,('Bebida',			'Suco Duas Frutas',							13.99, '')
    ,('Bebida',			'Café Illy',								05.20, '')
-- ,('','','')
;






INSERT INTO `cervejas`
	(`nome`, `abv`, `descricao`)
VALUES
	('Deus Brut De Flandres', 0.1, '')
	,('Golden Queen Bee', 0.1, '')
	,('Solstice D´hiver', 10.2, '')
	,('Moralité', 6.9, '')
	,('Solstice D''été', 5.9, '')
	,('Tripel Karmeliet', 8.4, '')
	,('Kwak', 8.4, '')
	,('Isseki Nichó', 9.5, '')
	,('Midas Touch', 0.1, '')
	,('Founders Curmudgeon', 9.8, '')
	,('Founders All Day', 4.7, '')
	,('Founders Porter', 6.5, '')
	,('Founders Mosaic Promise', 5.5, '')
	,('Founders Dirty Bastard', 8.5, '')
	,('Founders Centennial', 7.2, '')
	,('Paulaner Salvator', 7.9, '')
	,('Duchesse De Bourgogne', 0, '')
	,('Wells Sticky Toffee', 5, '')
	,('Ballast Point Even Keel', 3.8, '')
	,('Hop Valley Alphadelic', 6.7, '')
	,('Mad River Jamaica', 6.5, '')
	,('Mad River Steelhead', 8.6, '')
	,('Meantime', 7.4, '')
	,('Edelweiss Hefetrub', 5.3, '')
	,('Petrus Dubbel Bruin', 6.5, '')
	,('Eviltwin Molotov Cocktail', 0.1, '')
	,('Evil Twin Ashtray Heart', 8.9, '')
	,('Monts Des Cats', 7.6, '')
	,('St. Bernardus Tripel', 8, '')
	,('St. Bernardus Prior 8', 8, '')
	,('Wells Banana Bread', 5.2, '')
	,('Young´s Double Chocolate', 5.2, '')
	,('La Trappe Isid''or', 7.5, '')
	,('La Trappe Dubbel', 7, '')
	,('La Trappe Tripel', 8, '')
	,('Hoegaarden Wit Blanche', 4.9, '')
	,('Samuel Smith', 5, '')
	,('Hacker Pschorr', 5.5, '')
	,('Carolus Ambrio', 0.1, '')
	,('Carolus Hopsinjoor', 0.1, '')
	,('Goose Island Honkers Ale', 4.3, '')
	,('Rogue Dead Guy', 6.2, '')
	,('Blue Moon Belgian White', 5.4, '')
	,('Petrus Aged Pale', 7.3, '')
	,('Samuel Adams Boston Lager', 4.9, '')
	,('Maredsous Blonde 6', 6, '')
	,('Brigand', 9, '')
	,('Ballast Point Big Eye', 7, '')
	,('Tupiniquim Poli Mango', 9.5, '')
	,('Judas', 8.5, '')
	,('Tupiniquim Saison De Caju', 6.8, '')
	,('Samuel Smith''s Nut Brown', 0.1, '')
	,('Goose Ipa', 5.9, '')
	,('Ballast Point Sculpin', 7, '')
	,('Blue Moon Pils', 4.2, '')
	,('Blue Moon Summer Honey', 5.2, '')
	,('Blue Moon White Ipa', 5.9, '')
	,('Dieu Du Ciel Péché Mortel', 9.5, '')
	,('Dieu Du Ciel Équinoxe Du Printemps', 9.5, '')
	,('Dieu Du Ciel Chemin De Ceoix', 7.5, '')
	,('Dieu Du Ciel Saisson Du Parc', 4.2, '')
	,('Dieu Du Ciel Rosée D´hibiscus', 5.9, '')
	,('Dieu Du Ciel Herbe A Détourne', 10.2, '')
	,('Dieu Du Ciel Immoralité', 9.2, '')
;




INSERT INTO `cervejas_estilos`
	(`id_cerveja`, `id_estilo`)
VALUES
	((SELECT `id` FROM `cervejas` WHERE `nome`='Deus Brut De Flandres'), (SELECT `id` FROM `estilos` WHERE `nome`='Bière Brut'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Golden Queen Bee'), (SELECT `id` FROM `estilos` WHERE `nome`='Golden Strong Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Solstice D´hiver'), (SELECT `id` FROM `estilos` WHERE `nome`='American Barleywine'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Moralité'), (SELECT `id` FROM `estilos` WHERE `nome`='India Pale Ale (Ipa)'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Solstice D''été'), (SELECT `id` FROM `estilos` WHERE `nome`='Berliner Weisse'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Tripel Karmeliet'), (SELECT `id` FROM `estilos` WHERE `nome`='Abbey Tripel'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Kwak'), (SELECT `id` FROM `estilos` WHERE `nome`='Belgian Strong Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Isseki Nichó'), (SELECT `id` FROM `estilos` WHERE `nome`='Saison'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Midas Touch'), (SELECT `id` FROM `estilos` WHERE `nome`='Traditional Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Curmudgeon'), (SELECT `id` FROM `estilos` WHERE `nome`='Old Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders All Day'), (SELECT `id` FROM `estilos` WHERE `nome`='Session Ipa'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Porter'), (SELECT `id` FROM `estilos` WHERE `nome`='Porter'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Mosaic Promise'), (SELECT `id` FROM `estilos` WHERE `nome`='India Pale Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Dirty Bastard'), (SELECT `id` FROM `estilos` WHERE `nome`='Scotch Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Centennial'), (SELECT `id` FROM `estilos` WHERE `nome`='India Pale Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Paulaner Salvator'), (SELECT `id` FROM `estilos` WHERE `nome`='Doppelbock'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Duchesse De Bourgogne'), (SELECT `id` FROM `estilos` WHERE `nome`='Sour Red/Brown'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Wells Sticky Toffee'), (SELECT `id` FROM `estilos` WHERE `nome`='Premium Bitter/Esb'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Ballast Point Even Keel'), (SELECT `id` FROM `estilos` WHERE `nome`='Session Ipa'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Hop Valley Alphadelic'), (SELECT `id` FROM `estilos` WHERE `nome`='India Pale Ale (Ipa)'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Mad River Jamaica'), (SELECT `id` FROM `estilos` WHERE `nome`='Amber Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Mad River Steelhead'), (SELECT `id` FROM `estilos` WHERE `nome`='Imperial Ipa'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Meantime'), (SELECT `id` FROM `estilos` WHERE `nome`='India Pale Ale (Ipa)'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Edelweiss Hefetrub'), (SELECT `id` FROM `estilos` WHERE `nome`='German Hefeweizen'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Petrus Dubbel Bruin'), (SELECT `id` FROM `estilos` WHERE `nome`='Abbey Dubbel'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Eviltwin Molotov Cocktail'), (SELECT `id` FROM `estilos` WHERE `nome`='Imperial Ipa'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Evil Twin Ashtray Heart'), (SELECT `id` FROM `estilos` WHERE `nome`='Smoked'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Monts Des Cats'), (SELECT `id` FROM `estilos` WHERE `nome`='Belgian Strong Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='St. Bernardus Tripel'), (SELECT `id` FROM `estilos` WHERE `nome`='Abbey Tripel'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='St. Bernardus Prior 8'), (SELECT `id` FROM `estilos` WHERE `nome`='Abbey Dubbel'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Wells Banana Bread'), (SELECT `id` FROM `estilos` WHERE `nome`='English Strong Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Young´s Double Chocolate'), (SELECT `id` FROM `estilos` WHERE `nome`='Stout'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='La Trappe Isid''or'), (SELECT `id` FROM `estilos` WHERE `nome`='Belgian Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='La Trappe Dubbel'), (SELECT `id` FROM `estilos` WHERE `nome`='Abbey Dubbel'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='La Trappe Tripel'), (SELECT `id` FROM `estilos` WHERE `nome`='Abbey Tripel'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Hoegaarden Wit Blanche'), (SELECT `id` FROM `estilos` WHERE `nome`='Witbier'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Samuel Smith'), (SELECT `id` FROM `estilos` WHERE `nome`='Premium Bitter/Esb'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Hacker Pschorr'), (SELECT `id` FROM `estilos` WHERE `nome`='Zwickel/Keller/Landbier'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Carolus Ambrio'), (SELECT `id` FROM `estilos` WHERE `nome`='Belgian Strong Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Carolus Hopsinjoor'), (SELECT `id` FROM `estilos` WHERE `nome`='Belgian Strong Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Goose Island Honkers Ale'), (SELECT `id` FROM `estilos` WHERE `nome`='Bitter'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Rogue Dead Guy'), (SELECT `id` FROM `estilos` WHERE `nome`='Heller Bock'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Blue Moon Belgian White'), (SELECT `id` FROM `estilos` WHERE `nome`='Witbier'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Petrus Aged Pale'), (SELECT `id` FROM `estilos` WHERE `nome`='Sour/Wild Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Samuel Adams Boston Lager'), (SELECT `id` FROM `estilos` WHERE `nome`='Amber Lager/Vienna'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Maredsous Blonde 6'), (SELECT `id` FROM `estilos` WHERE `nome`='Belgian Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Brigand'), (SELECT `id` FROM `estilos` WHERE `nome`='Belgian Strong Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Ballast Point Big Eye'), (SELECT `id` FROM `estilos` WHERE `nome`='India Pale Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Tupiniquim Poli Mango'), (SELECT `id` FROM `estilos` WHERE `nome`='Imperial Ipa'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Judas'), (SELECT `id` FROM `estilos` WHERE `nome`='Belgian Strong Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Tupiniquim Saison De Caju'), (SELECT `id` FROM `estilos` WHERE `nome`='Saison'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Samuel Smith''s Nut Brown'), (SELECT `id` FROM `estilos` WHERE `nome`='Brown Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Goose Ipa'), (SELECT `id` FROM `estilos` WHERE `nome`='India Pale Ale (Ipa)'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Ballast Point Sculpin'), (SELECT `id` FROM `estilos` WHERE `nome`='India Pale Ale (Ipa)'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Blue Moon Pils'), (SELECT `id` FROM `estilos` WHERE `nome`='Pilsener'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Blue Moon Summer Honey'), (SELECT `id` FROM `estilos` WHERE `nome`='Wheat Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Blue Moon White Ipa'), (SELECT `id` FROM `estilos` WHERE `nome`='India Pale Ale (Ipa)'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Péché Mortel'), (SELECT `id` FROM `estilos` WHERE `nome`='Imperial Stout'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Équinoxe Du Printemps'), (SELECT `id` FROM `estilos` WHERE `nome`='Scotch Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Chemin De Ceoix'), (SELECT `id` FROM `estilos` WHERE `nome`='Imperial Porter'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Saisson Du Parc'), (SELECT `id` FROM `estilos` WHERE `nome`='Farmhouse Ale'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Rosée D´hibiscus'), (SELECT `id` FROM `estilos` WHERE `nome`='Spice'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Herbe A Détourne'), (SELECT `id` FROM `estilos` WHERE `nome`='Abey Tripel'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Immoralité'), (SELECT `id` FROM `estilos` WHERE `nome`='Imperial Ipa'))
;



INSERT INTO `cervejas_paises`
	(`id_cerveja`, `id_pais`)
VALUES
	((SELECT `id` FROM `cervejas` WHERE `nome`='Deus Brut De Flandres'), (SELECT `id` FROM `paises` WHERE `nome`='França'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Deus Brut De Flandres'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Golden Queen Bee'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Solstice D´hiver'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Moralité'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Solstice D''été'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Tripel Karmeliet'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Kwak'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Isseki Nichó'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Midas Touch'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Curmudgeon'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders All Day'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Porter'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Mosaic Promise'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Dirty Bastard'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Founders Centennial'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Paulaner Salvator'), (SELECT `id` FROM `paises` WHERE `nome`='Alemanha'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Duchesse De Bourgogne'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Wells Sticky Toffee'), (SELECT `id` FROM `paises` WHERE `nome`='Inglaterra'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Ballast Point Even Keel'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Hop Valley Alphadelic'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Mad River Jamaica'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Mad River Steelhead'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Meantime'), (SELECT `id` FROM `paises` WHERE `nome`='Inglaterra'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Edelweiss Hefetrub'), (SELECT `id` FROM `paises` WHERE `nome`='Áustria'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Petrus Dubbel Bruin'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Eviltwin Molotov Cocktail'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Evil Twin Ashtray Heart'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Monts Des Cats'), (SELECT `id` FROM `paises` WHERE `nome`='França'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='St. Bernardus Tripel'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='St. Bernardus Prior 8'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Wells Banana Bread'), (SELECT `id` FROM `paises` WHERE `nome`='Inglaterra'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Young´s Double Chocolate'), (SELECT `id` FROM `paises` WHERE `nome`='Inglaterra'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='La Trappe Isid''or'), (SELECT `id` FROM `paises` WHERE `nome`='Holanda'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='La Trappe Dubbel'), (SELECT `id` FROM `paises` WHERE `nome`='Holanda'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='La Trappe Tripel'), (SELECT `id` FROM `paises` WHERE `nome`='Holanda'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Hoegaarden Wit Blanche'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Samuel Smith'), (SELECT `id` FROM `paises` WHERE `nome`='Inglaterra'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Hacker Pschorr'), (SELECT `id` FROM `paises` WHERE `nome`='Alemanha'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Carolus Ambrio'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Carolus Hopsinjoor'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Goose Island Honkers Ale'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Rogue Dead Guy'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Blue Moon Belgian White'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Petrus Aged Pale'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Samuel Adams Boston Lager'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Maredsous Blonde 6'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Brigand'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Ballast Point Big Eye'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Tupiniquim Poli Mango'), (SELECT `id` FROM `paises` WHERE `nome`='Brasil'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Judas'), (SELECT `id` FROM `paises` WHERE `nome`='Bélgica'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Tupiniquim Saison De Caju'), (SELECT `id` FROM `paises` WHERE `nome`='Brasil'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Samuel Smith''s Nut Brown'), (SELECT `id` FROM `paises` WHERE `nome`='Inglaterra'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Goose Ipa'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Ballast Point Sculpin'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Blue Moon Pils'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Blue Moon Summer Honey'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Blue Moon White Ipa'), (SELECT `id` FROM `paises` WHERE `nome`='Estados Unidos'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Péché Mortel'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Équinoxe Du Printemps'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Chemin De Ceoix'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Saisson Du Parc'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Rosée D´hibiscus'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Herbe A Détourne'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))
	,((SELECT `id` FROM `cervejas` WHERE `nome`='Dieu Du Ciel Immoralité'), (SELECT `id` FROM `paises` WHERE `nome`='Canadá'))

;


/*
INSERT INTO `drafts`
(
    `nome`,
    `preco1`,`preco2`,
    `descricao`,
    `ap1`,`ap2`
)
VALUES
	('Honey Dew', 23.00,  19.99, 'Witbier / ABV 5,00% / Belgica / Bavik De Barbandere', NULL, NULL)
    ,('Founders All Day Ipa', 29.90, 14.00, 'Session IPA / ABV 4,7% / USA / Founders', '(470ml)', NULL)
    ,('Bengal Lancer', 21.99, 10.60, 'English India Pale Ale / ABV 5,3% / England / Fuller´s', NULL, NULL)
    ,('Founders Dirty Bastard Scoth Ale', 29.90, 14.00, 'Scotch ale / ABV 8,5% / USA / Founders', '(470ml)', NULL)
    ,('Old Speckled Hen', 18.99, 10.60, 'Premium Bitter / ABV 5,0% / England / Greene King', NULL, NULL)
    ,('Kasteel Rouge (97RB)', 24.99, 14.00, 'Fruit Beer / ABV 8,0% / Bélgica / Van Honsebrourg', '(330ml)', NULL)
    ,('Guinness', 23.00, 10.99, 'Dry Stout / ABV 4,2 % / Irlanda / St’ James Gate', NULL, NULL)
    ,('Chimay Red (100PTS RB)', 24.99, 14.00, 'Abbey Dubbel Ale / ABV 7,0% / Bélgica / Chimay', '(330ml)', NULL)
    ,('London Pride', 19.00, 10.60, 'English Pale Ale / ABV 4,7% / England / Fuller´s', NULL, NULL)
    ,('Delirium Tremens', 24.99, NULL, 'Belgian Golden Ale / ABV 8,5% / Bélgica / Huyghe', '(250ml)', NULL)
    ,('Petrus Oud Bruin', 14.99, 6.99, 'Sour Red / ABV 5,5% / Bélgica / Bavik de Barbandere', NULL, NULL)
    ,('Cydes Aspall Brut', 11.99, NULL, 'English Cyder Apple / ABV 7,0% / England / Aspall Cyder', '(350ml)', NULL)
;
*/

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