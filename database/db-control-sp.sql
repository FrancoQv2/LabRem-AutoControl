-- -----------------------------------------------------
-- Procedimientos Almacenados
-- -----------------------------------------------------

USE LabRem_Teleco;

-- -----------------------------------------------------
-- Ultima experiencia realizada por un alumno
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS UltimaExperiencia;

DELIMITER //
CREATE PROCEDURE UltimaExperiencia(idUsuarioE INT,OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF (idUsuarioE IS NULL) THEN
		SET mensaje = 'el id del usuario es null';
		LEAVE SALIR;
	ELSEIF NOT EXISTS (SELECT idEnsayo FROM Ensayos where idUsuario=idUsuarioE) THEN
		SET mensaje = 'no existe un usuario con ese id';
        LEAVE SALIR;
    ELSE
		SELECT fechaHora,JSON_VALUE(datosEntrada,'$.rangoAzimut') AS Azimut,JSON_VALUE(datosEntrada,'$.rangoElevacion') AS Elevacion FROM Ensayos where idUsuario = idUsuarioE ORDER BY fechaHora DESC LIMIT 1;
		SET mensaje = 'ultimo valor';
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- Experiencia promedio de una experiencia dada
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS PromedioExperiencia;

DELIMITER //
CREATE PROCEDURE PromedioExperiencia(idUsuarioE INT,OUT mensaje VARCHAR(100))
SALIR: BEGIN
            
	IF (idUsuarioE IS NULL) THEN
		SET mensaje = 'el id del usuario es null';
		LEAVE SALIR;
	ELSEIF NOT EXISTS (SELECT idEnsayo FROM Ensayos where idUsuario=idUsuarioE) THEN
		SET mensaje = 'no existe un usuario con ese id';
        LEAVE SALIR;
    ELSE
		SELECT avg(JSON_VALUE(datosEntrada,'$.rangoAzimut')) AS PromedioAzimut,avg(JSON_VALUE(datosEntrada,'$.rangoElevacion')) AS PromedioElevacion FROM Ensayos where idUsuario = idUsuarioE;
		SET mensaje = 'ultimo valor';
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- Experiencia de todos los alumnos ordenado por usuario y fecha
-- -----------------------------------------------------

SELECT fechaHora,idUsuario,JSON_VALUE(datosEntrada,'$.rangoAzimut') AS Azimut,JSON_VALUE(datosEntrada,'$.rangoElevacion') AS Elevacion FROM Ensayos ORDER BY idUsuario,fechaHora ASC;

-- -----------------------------------------------------
-- Promedio de valor obtenido total de los usuarios
-- -----------------------------------------------------

SELECT avg(JSON_VALUE(datosEntrada,'$.rangoAzimut')) AS Azimut,avg(JSON_VALUE(datosEntrada,'$.rangoElevacion')) AS Elevacion FROM Ensayos;