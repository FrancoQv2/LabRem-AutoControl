USE LabRem_Control;

-- -----------------------------------------------------
-- Crear Ensayo
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_crearEnsayo;

DELIMITER //
CREATE PROCEDURE sp_crearEnsayo(pIdUsuario INT, pDatosEntrada JSON, pDatosSalida JSON, pIdLaboratorio INT)
SALIR: BEGIN
	IF (pIdUsuario IS NULL) THEN
		SELECT 'Falta el Id del usuario';
		LEAVE SALIR;
	ELSEIF (pDatosEntrada IS NULL) THEN
		SELECT 'Faltan los datos de entrada';
		LEAVE SALIR;
	ELSEIF (pIdLaboratorio IS NULL) THEN
		SELECT 'Falta el Id del laboratorio';
		LEAVE SALIR;
	ELSE
		START TRANSACTION;
			INSERT INTO Ensayos(idUsuario,fechaHora,datosEntrada,datosSalida,idLaboratorio) VALUES (pIdUsuario,NOW(),pDatosEntrada,pDatosSalida,pIdLaboratorio);
			SELECT 'Ensayo creado con éxito';
        COMMIT;
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- Selecciona todas los Ensayos realizadas de un Laboratorio
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameEnsayos;

DELIMITER //
CREATE PROCEDURE sp_dameEnsayos(pIdLaboratorio INT)
SALIR: BEGIN
            
	IF (pIdLaboratorio IS NULL) THEN
		SELECT 'Falta el Id del laboratorio';
		LEAVE SALIR;
    ELSE
		SELECT 
			idEnsayo, 
			DATE_FORMAT(fechaHora,'%d/%m/%y') AS Fecha, 
			TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora,
			datosEntrada,
			datosSalida
		FROM Ensayos
		WHERE idLaboratorio = pIdLaboratorio 
		ORDER BY fechaHora ASC;
	END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- Selecciona los Ensayos realizados por un Alumno en particular
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameEnsayosUsuario;

DELIMITER //
CREATE PROCEDURE sp_dameEnsayosUsuario(pIdLaboratorio INT, pIdUsuario INT)
SALIR: BEGIN
            
	IF (pIdUsuario IS NULL) OR (pIdLaboratorio IS NULL) THEN
        SELECT 'Falta el Id del usuario';
		LEAVE SALIR;
	ELSEIF (pIdLaboratorio IS NULL) THEN
		SELECT 'Falta el Id del laboratorio';
		LEAVE SALIR;
    ELSE
		SELECT 
			DATE_FORMAT(fechaHora,'%d/%m/%y') AS Fecha, 
			TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora, 
			datosEntrada, 
			datosSalida 
		FROM Ensayos 
		WHERE idLaboratorio = pIdLaboratorio AND idUsuario = pIdUsuario;
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- Borrado de un Ensayo
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_borrarEnsayo;

DELIMITER //
CREATE PROCEDURE sp_borrarEnsayo(pIdEnsayo INT)
SALIR: BEGIN
	IF (pIdEnsayo IS NULL) THEN
		SELECT 'Falta el Id del ensayo';
		LEAVE SALIR;
    ELSE
		DELETE FROM Ensayos where idEnsayo = pIdEnsayo;
		SELECT 'Ensayo borrado con éxito';
    END IF;
END//
DELIMITER ;

-- -----------------------------------------------------
-- Selecciona todas los Ensayos del Laboratorio de Submuestreo
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameEnsayosSubmuestreo;

DELIMITER //
CREATE PROCEDURE sp_dameEnsayosSubmuestreo()
SALIR: BEGIN
	SELECT 
		idEnsayo, 
        idUsuario,
		DATE_FORMAT(fechaHora,'%d/%m/%y') AS Fecha, 
		TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora,
		datosEntrada,
		datosSalida
	FROM Ensayos
	WHERE idLaboratorio = 1
	ORDER BY fechaHora ASC;
END//
DELIMITER ;

-- -----------------------------------------------------
-- Selecciona todas los Ensayos del Laboratorio de Posición
-- -----------------------------------------------------

DROP PROCEDURE IF EXISTS sp_dameEnsayosPosicion;

DELIMITER //
CREATE PROCEDURE sp_dameEnsayosPosicion()
SALIR: BEGIN
	SELECT 
		idEnsayo, 
        idUsuario,
		DATE_FORMAT(fechaHora,'%d/%m/%y') AS Fecha, 
		TIME(CONVERT_TZ(fechaHora,'+00:00','-03:00')) AS Hora,
		datosEntrada,
		datosSalida
	FROM Ensayos
	WHERE idLaboratorio = 2
	ORDER BY fechaHora ASC;
END//
DELIMITER ;
