-- -----------------------------------------------------
-- Schema LabRem_Control
-- -----------------------------------------------------

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP DATABASE IF EXISTS LabRem_Control;
CREATE DATABASE IF NOT EXISTS LabRem_Control DEFAULT CHARACTER SET utf8mb4;
USE LabRem_Control;

-- -----------------------------------------------------
-- Tabla - Laboratorios
-- -----------------------------------------------------
DROP TABLE IF EXISTS Laboratorios;

CREATE TABLE IF NOT EXISTS Laboratorios (
  idLaboratorio INT NOT NULL AUTO_INCREMENT,
  area VARCHAR(50) NOT NULL DEFAULT 'Sistemas de control automaticos',
  nombre VARCHAR(100) NOT NULL,
  imagen VARCHAR(200) NULL,
  descripcion VARCHAR(3000) NULL,
  PRIMARY KEY (idLaboratorio),
  UNIQUE INDEX UI_Laboratorios_nombre (nombre) VISIBLE
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabla - Ensayos
-- -----------------------------------------------------
DROP TABLE IF EXISTS Ensayos;

CREATE TABLE IF NOT EXISTS Ensayos (
  idEnsayo INT NOT NULL AUTO_INCREMENT,
  idUsuario INT NOT NULL,
  fechaHora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  datosEntrada JSON NULL,
  datosSalida JSON NULL,
  idLaboratorio INT NOT NULL,
  PRIMARY KEY (idEnsayo, idUsuario, idLaboratorio),
  INDEX fk_Ensayos_Laboratorios_idx (idLaboratorio ASC) VISIBLE,
  CONSTRAINT fk_Ensayos_Laboratorios
    FOREIGN KEY (idLaboratorio)
    REFERENCES Laboratorios (idLaboratorio)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
