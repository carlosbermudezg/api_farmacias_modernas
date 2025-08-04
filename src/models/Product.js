const { pool_sheyla } = require('../utils/connMySql2')

const allProductsPagination = async (limit, offset, search, category, zone) => {
    let result;
    const zones = JSON.parse(zone).join(",")

    if (category) {
        // Convertimos el string de categorías a un array de números
        const categoriesArray = category.split(',').map(Number);

        // Usamos marcadores de posición (para el array de categorías)
        const placeholders = categoriesArray.map(() => '?').join(',');

        // Consulta con las categorías
        result = await pool_sheyla.query(
            `SELECT ${zones}, PRODUCTO, CATEGORIA, COSTO, MARCA 
            FROM productos 
            WHERE CATEGORIA IN (${placeholders}) 
            AND PRODUCTO LIKE ? 
            LIMIT ? OFFSET ?`, 
            [...categoriesArray, `%${search}%`, +limit, +offset]
        );
    } else {
        // Consulta cuando no se pasa la categoría (excluye ciertas categorías)
        result = await pool_sheyla.query(
            `SELECT ${zones}, PRODUCTO, CATEGORIA, COSTO, MARCA 
            FROM productos 
            WHERE CATEGORIA NOT IN (12, 1, 211, 202, 213, 13, 191, 2, 203, 198, 200, 201, 208, 212, 37) 
            AND PRODUCTO LIKE ? 
            LIMIT ? OFFSET ?`, 
            [`%${search}%`, +limit, +offset]
        );
    }

    return result;
};
const countProducts = async (search, category) => {
    let result;

    // Validar si category es un string no vacío
    if (category && category.trim() !== '') {
        // Convertir el string de categorías a un array
        const categoriesArray = category.split(',').map(Number).filter(Boolean); // Filtramos valores no numéricos

        if (categoriesArray.length > 0) {
            // Crear los placeholders para las categorías
            const placeholders = categoriesArray.map(() => '?').join(',');

            // Consulta SQL con las categorías
            result = await pool_sheyla.query(
                `SELECT count(*) as count 
                FROM productos 
                WHERE CATEGORIA IN (${placeholders}) 
                AND PRODUCTO LIKE ?`, 
                [...categoriesArray, `%${search}%`]
            );
        } else {
            // Si el array de categorías está vacío, lanzar un error o manejarlo
            throw new Error('Categorías inválidas o vacías');
        }
    } else {
        // Consulta sin categorías, excluyendo ciertas categorías específicas
        result = await pool_sheyla.query(
            `SELECT count(*) as count 
            FROM productos 
            WHERE CATEGORIA NOT IN (12,1,211,202,213,13,191,2,203,198,200,201,208,212,37) 
            AND PRODUCTO LIKE ?`, 
            [`%${search}%`]
        );
    }

    return result;
};
const allProductsPaginationReceta = async (limit, offset, search) => {
    const result = await pool_sheyla.query(
        `SELECT p.PRODUCTO, p.CATEGORIA, p.COSTO, m.marca_NOMBRE AS MARCA, p.MARCA AS ID_MARCA
        FROM productos p
        INNER JOIN productos_marcas m ON p.MARCA = m.marca_ID
        WHERE p.CATEGORIA IN (149,188,194,205,206,207)
        AND p.PRODUCTO LIKE ? 
        ORDER BY p.CODIGO ASC
        LIMIT ? OFFSET ?`, 
        [`%${search}%`, +limit, +offset]
    );

    return result;
};
const countProductsReceta = async (search) => {
    let result;
    result = await pool_sheyla.query(
        `SELECT count(*) as count 
        FROM productos 
        WHERE CATEGORIA IN (149,188,194,205,206,207)
        AND PRODUCTO LIKE ?`, 
        [`%${search}%`]
    );
    return result;
};
const productsByCategory = async(array)=>{
    const result = await pool_sheyla.query('SELECT CANTIDAD, PRODUCTO, CATEGORIA, COSTO, MARCA, b1, b2 from productos WHERE CATEGORIA IN ' + array );
    return result
}
const getBrands = async()=>{
    // SHOW TABLES FROM farmacia_lopez
    const result = await pool_sheyla.query('SELECT * from productos_marcas');
    return result[0]
}
const findBrandsBySearch = async(limit, offset, search)=>{
    const result = await pool_sheyla.query("SELECT * FROM productos_marcas WHERE marca_NOMBRE LIKE '%"+search+"%' limit "+limit+" offset " +offset)
    return result
}
const countBrands = async(limit, search)=>{
    const result = await pool_sheyla.query("SELECT count(*) as count FROM productos_marcas WHERE marca_NOMBRE LIKE '%"+search+"%' limit "+limit+" offset 0")
    return result
}
const getBrandById = async(id)=>{
    const result = await pool_sheyla.query('SELECT * from productos_marcas WHERE marca_ID='+id);
    return result[0]
}
const getProductsByBrands = async(brands)=>{
    const result = await pool_sheyla.query("SELECT * from productos WHERE MARCA IN " + brands);
    return result
}
const findById = async(id)=>{
    const result = await pool_sheyla.query('SELECT * from productos WHERE CODIGO='+id)
    return result
}
const findByUserSearch = async(search)=>{
    const result = await pool_sheyla.query("SELECT CANTIDAD, PRODUCTO, CATEGORIA, COSTO, MARCA, b1, b2 FROM productos WHERE PRODUCTO LIKE '%"+search+"%'")
    return result
}
const findByUserSearchCount = async(limit, search)=>{
    const result = await pool_sheyla.query("SELECT count(*) as count FROM productos WHERE PRODUCTO LIKE '%"+search+"%' limit "+limit+" offset 0")
    return result
}
module.exports = {
    allProductsPagination,
    allProductsPaginationReceta,
    findById,
    findByUserSearch,
    countProducts,
    countProductsReceta,
    findByUserSearchCount,
    productsByCategory,
    getBrands,
    getProductsByBrands,
    getBrandById,
    countBrands,
    findBrandsBySearch
}