USE LabRem_Control;

-- -----------------------------------------------------
-- Crear Laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_crearLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_crearLaboratorio(pNombre VARCHAR(100), pDescripcion TEXT)
SALIR: BEGIN
    IF (pNombre IS NULL) THEN
        SELECT 'Falta el nombre';
        LEAVE SALIR;
    ELSEIF (pDescripcion IS NULL) THEN
        SELECT 'Falta la descripción';
        LEAVE SALIR;
    ELSE
        START TRANSACTION;
            INSERT INTO Laboratorios(area,nombre,descripcion) VALUES (DEFAULT,pNombre,pDescripcion);
            SELECT 'Laboratorio creado con éxito';
        COMMIT;
    END IF;
END //
DELIMITER ;

-- -----------------------------------------------------
--  Selección de todos los Laboratorios
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameLaboratorios;

DELIMITER //
CREATE PROCEDURE sp_dameLaboratorios()
SALIR: BEGIN
    SELECT 
        idLaboratorio, 
        area, 
        nombre, 
        descripcion 
    FROM Laboratorios 
    ORDER BY idLaboratorio ASC;
END //
DELIMITER ;

-- -----------------------------------------------------
--  Selección de un Laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_dameLaboratorio(pIdLaboratorio VARCHAR(6))
SALIR: BEGIN
    IF pIdLaboratorio IS NULL THEN
        SELECT 'Falta el Id';
        LEAVE SALIR;
    ELSE
        SELECT 
            idLaboratorio, 
            area, 
            nombre, 
            descripcion 
        FROM Laboratorios 
        WHERE idLaboratorio = pIdLaboratorio;
    END IF;
END //
DELIMITER ;


-- -----------------------------------------------------
-- Modificación de un Laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_modificarLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_modificarLaboratorio(pIdLaboratorio INT, pArea VARCHAR(50), pNombre VARCHAR(100), pDescripcion TEXT)
SALIR: BEGIN
    IF (pIdLaboratorio IS NULL) THEN
        SELECT 'Falta el Id';
        LEAVE SALIR;
    ELSEIF (pNombre IS NULL) THEN
        SELECT 'Falta el nombre';
        LEAVE SALIR;
    ELSEIF (pArea IS NULL) THEN
        SELECT 'Falta el área';
        LEAVE SALIR;
    ELSEIF (pDescripcion IS NULL) THEN
        SELECT 'Falta la descripción';
        LEAVE SALIR;
    ELSEIF NOT EXISTS (SELECT * FROM Laboratorios WHERE idLaboratorio = pIdLaboratorio) THEN
        SELECT 'No existe un laboratorio con este Id';
        LEAVE SALIR;
    ELSE
        START TRANSACTION;
            UPDATE Laboratorios
            SET 
                area = pArea, 
                nombre = pNombre, 
                descripcion = pDescripcion 
            WHERE idLaboratorio = pIdLaboratorio;
            SELECT 'Laboratorio modificado con éxito';
        COMMIT;
    END IF;
END //
DELIMITER ;

-- -----------------------------------------------------
-- Borrado de un Laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_borrarLaboratorio;

DELIMITER //
CREATE PROCEDURE sp_borrarLaboratorio(pIdLaboratorio INT)
SALIR: BEGIN
    IF (pIdLaboratorio IS NULL) THEN
        SELECT 'Falta id de laboratorio';
    ELSEIF NOT EXISTS (SELECT * FROM Laboratorios WHERE idLaboratorio = pIdLaboratorio) THEN
        SELECT 'No existe un laboratorio con este Id';
	ELSE
		START TRANSACTION;
			DELETE FROM Laboratorios WHERE idLaboratorio = pIdLaboratorio;
            SELECT 'OK';
            SELECT 'Laboratorio borrado con éxito';
		COMMIT;
    END IF;
END //
DELIMITER ;
