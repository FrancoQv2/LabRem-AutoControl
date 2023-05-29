USE LabRem_Control;

-- -----------------------------------------------------
-- Laboratorios - TRIGGER INSERT
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_crearLaboratorio;

DELIMITER //
CREATE TRIGGER tg_crearLaboratorio 
AFTER INSERT ON Laboratorios 
FOR EACH ROW
BEGIN
	INSERT INTO AuditoriaLaboratorios(tipo, fechaHora, `user`, `host`, idLaboratorio, area, nombre, descripcion) 
    VALUES (
        'I',
        NOW(),
        SUBSTRING_INDEX(USER(),'@',1),
        SUBSTRING_INDEX(USER(),'@',-1),
        NEW.idLaboratorio,
        NEW.area,
        NEW.nombre,
        NEW.descripcion
    );
END //
DELIMITER ;

-- -----------------------------------------------------
-- Laboratorios - TRIGGER DELETE
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_borrarLaboratorio;

DELIMITER //
CREATE TRIGGER tg_borrarLaboratorio 
BEFORE DELETE ON Laboratorios 
FOR EACH ROW
BEGIN
	INSERT INTO AuditoriaLaboratorios(tipo, fechaHora, `user`, `host`, idLaboratorio, area, nombre, descripcion) 
    VALUES (
        'D',
        NOW(),
        SUBSTRING_INDEX(USER(),'@',1),
        SUBSTRING_INDEX(USER(),'@',-1),
        OLD.idLaboratorio,
        OLD.area,
        OLD.nombre,
        OLD.descripcion
    );
END //
DELIMITER ;

-- -----------------------------------------------------
-- Laboratorios - TRIGGER UPDATE BEFORE
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_modificarLaboratorio_before;

DELIMITER //
CREATE TRIGGER tg_modificarLaboratorio_before 
BEFORE UPDATE ON Laboratorios 
FOR EACH ROW 
BEGIN
	INSERT INTO AuditoriaLaboratorios(tipo, fechaHora, `user`, `host`, idLaboratorio, area, nombre, descripcion)  
	VALUES (
        'B',
        NOW(),
        SUBSTRING_INDEX(USER(),'@',1),
        SUBSTRING_INDEX(USER(),'@',-1),
        OLD.idLaboratorio,
        OLD.area,
        OLD.nombre,
        OLD.descripcion
    );
END //
DELIMITER ;

-- -----------------------------------------------------
-- Laboratorios - TRIGGER UPDATE AFTER
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_modificarLaboratorio_after;

DELIMITER //
CREATE TRIGGER tg_modificarLaboratorio_after 
AFTER UPDATE ON Laboratorios 
FOR EACH ROW
BEGIN
	INSERT INTO AuditoriaLaboratorios(tipo, fechaHora, `user`, `host`, idLaboratorio, area, nombre, descripcion)  
    VALUES (
        'A',
        NOW(),
        SUBSTRING_INDEX(USER(),'@',1),
        SUBSTRING_INDEX(USER(),'@',-1),
        NEW.idLaboratorio,
        NEW.area,
        NEW.nombre,
        NEW.descripcion
    );
END //
DELIMITER ;

-- -----------------------------------------------------
-- Ensayos - TRIGGER INSERT
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_crearEnsayo;

DELIMITER //
CREATE TRIGGER tg_crearEnsayo 
AFTER INSERT ON Ensayos 
FOR EACH ROW
BEGIN
	INSERT INTO AuditoriaEnsayos(tipo, fechaHora, `user`, `host`, idEnsayo, idUsuario, fechaHoraE, datosEntrada, datosSalida, idLaboratorio) 
    VALUES (
        'I',
        NOW(),
        SUBSTRING_INDEX(USER(),'@',1),
        SUBSTRING_INDEX(USER(),'@',-1),
        NEW.idEnsayo,
        NEW.idUsuario,
        NEW.fechaHora,
        NEW.datosEntrada,
        NEW.datosSalida,
        NEW.idLaboratorio
    );
END //
DELIMITER ;

-- -----------------------------------------------------
-- Ensayos - TRIGGER DELETE
-- -----------------------------------------------------

DROP TRIGGER IF EXISTS tg_borrarEnsayo;

DELIMITER //
CREATE TRIGGER tg_borrarEnsayo 
BEFORE DELETE ON Ensayos 
FOR EACH ROW
BEGIN
	INSERT INTO AuditoriaEnsayos(tipo, fechaHora, `user`, `host`, idEnsayo, idUsuario, fechaHoraE, datosEntrada, datosSalida, idLaboratorio)
    VALUES (
        'D',
        NOW(),
        SUBSTRING_INDEX(USER(),'@',1),
        SUBSTRING_INDEX(USER(),'@',-1),
        OLD.idEnsayo,
        OLD.idUsuario,
        OLD.fechaHora,
        OLD.datosEntrada,
        OLD.datosSalida,
        OLD.idLaboratorio
    );
END //
DELIMITER ;
