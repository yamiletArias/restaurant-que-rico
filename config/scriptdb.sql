CREATE DATABASE restaurant;
USE restaurant;

CREATE TABLE categorias
(
	idcategoria			INT AUTO_INCREMENT PRIMARY KEY,
    categoria			VARCHAR(40)	NOT NULL,
    CONSTRAINT uk_categoria_cat UNIQUE (categoria)
)ENGINE = INNODB;

INSERT INTO categorias (categoria)
	VALUES
		('Chilcano'),
        ('Comidas'),
        ('Pescado frito'),
        ('Ceviche');

CREATE TABLE platos
(
	idplato			INT AUTO_INCREMENT PRIMARY KEY,
    idcategoria		INT NOT NULL,
	nombre			VARCHAR(70) NOT NULL,
    precio			DECIMAL(7,2) NOT NULL,
    delivery		ENUM('S', 'N') NOT NULL,
    descripcion		VARCHAR(150) NULL,
    CONSTRAINT fk_idcategoria_pla FOREIGN KEY (idcategoria) REFERENCES categorias (idcategoria)
)ENGINE = INNODB;

INSERT INTO platos (idcategoria, nombre, precio, delivery, descripcion)
	VALUES
		(1, 'Chilcano puro', 3.5, 'N', NULL),
        (2, 'Apanado de bonito', 15, 'S', 'Incluye guarnicion de arroz y yucas');

select * from platos;