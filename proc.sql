DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerTituloYear`(IN `newtipo` VARCHAR(50), IN `newcateg` VARCHAR(50), IN `newpais` VARCHAR(50), IN `newduracion` VARCHAR(50), IN `newactor` VARCHAR(50), IN `newfecha` VARCHAR(50))
    NO SQL
BEGIN
	START TRANSACTION;
    /IF duracion vacio/
    IF newduracion IS NULL OR newduracion = '' AND newactor IS NOT null THEN 
        SELECT titulo AS 'name'
        FROM   titulos
        WHERE tipo = newtipo AND categoria = newcateg AND pais = newpais AND elenco LIKE CONCAT('%', newactor, '%') AND fecha = newfecha;
        
 /IF nada vacio/        
    ELSEIF newduracion IS NOT NULL OR newduracion != ''  AND newactor IS NOT null OR newactor != '' THEN  
        SELECT titulo AS 'name'
        FROM   titulos
        WHERE tipo = newtipo AND categoria = newcateg AND pais = newpais 
        AND elenco LIKE CONCAT('%', newactor, '%') AND  duracion > newduracion AND fecha = newfecha; 
         /IF actor vacio/        
    ELSEIF newduracion IS NOT NULL OR newduracion != '' AND newactor IS null THEN  
        SELECT titulo AS 'name'
        FROM   titulos
        WHERE tipo = newtipo AND categoria = newcateg AND pais = newpais AND duracion > newduracion AND fecha = newfecha;
/IF solo tipo categ y pais/ 
    ELSEIF newduracion IS NULL OR newduracion = '' AND newactor IS null OR newactor = ''THEN  
        SELECT titulo AS 'name'
        FROM   titulos
        WHERE tipo = newtipo AND categoria = newcateg AND pais = newpais  AND fecha = newfecha;
    ELSE
    	SELECT titulo  AS 'name'  
        FROM   titulos 
        WHERE tipo = newtipo AND fecha = newfecha;
        

        
    END IF;    
    COMMIT;
    
    
END$$
DELIMITER ;