const { pool } = require('../utils/connMySql2')

const allRecetasPagination = async(limit, offset)=>{
    const result = await pool.query('SELECT * from recetas limit ? offset ?', [+limit, +offset]);
    return result
}
const allRecetasPaginationUser = async(id, limit, offset, month, year)=>{
    const result = await pool.query(`SELECT * FROM recetas WHERE iduser = ? AND fechaHora LIKE ? LIMIT ? OFFSET ?`, [id, `%${year}-${month}%`, +limit, +offset]);
    return result
}

const allRecetasByUser = async(id, year)=>{
    const result = await pool.query(`SELECT * FROM recetas WHERE iduser = ? AND fechaHora LIKE ?`, [id, `%${year}%`])
    return result
}

const countRecetas = async()=>{
    const result = await pool.query('SELECT count(*) as count from recetas');
    return result
}

const countRecetasByMonth = async(month, year)=>{
    const result = await pool.query("SELECT count(*) as count from recetas WHERE fechaHora LIKE '%"+year+'-'+month+"%'");
    return result
}
const countRecetasByUser = async(id, month, year)=>{
    const result = await pool.query("SELECT count(*) as count from recetas WHERE iduser = ? AND fechaHora LIKE ?", [id, `%${year}-${month}%`]);
    return result
}
const countRecetasByMonthUser = async (year, id) => {
    const result = await pool.query(`
      SELECT 
        YEAR(r.fechaHora) AS year, 
        MONTH(r.fechaHora) AS month, 
        COUNT(*) AS count, 
        JSON_ARRAYAGG(JSON_OBJECT(
          'idReceta', r.idrecetas,
          'idUser', r.iduser,
          'userCreate', r.idusercreate,
          'date', r.fechaHora,
          'userCreateName', u.name,   -- Nombre del usuario que creó la receta
          'recetaNum', r.numReceta,
          'image', r.image,
          'medicamentos', r.medicamentos,
          'pay', r.payStatus
        )) AS recetas
      FROM recetas r
      JOIN users u ON r.idusercreate = u.idusers  -- Join con la tabla usuarios
      WHERE r.iduser = ? 
        AND YEAR(r.fechaHora) = ? 
      GROUP BY YEAR(r.fechaHora), MONTH(r.fechaHora)
    `, [id, year]);
    
    return result;
};
  
  
// const countRecetasByMonthUser = async(year, id)=>{
//     const result = await pool.query("SELECT YEAR(fechaHora) AS year, MONTH(fechaHora) AS month, COUNT(*) AS count from recetas WHERE iduser=? AND YEAR(fechaHora)=? GROUP BY YEAR(fechaHora), MONTH(fechaHora)", [id, year]);
//     return result
// }

// const findByUserSearch = async(limit, offset, search)=>{
//     const result = await pool.query("SELECT * FROM recetas WHERE PRODUCTO LIKE '%"+search+"%' limit "+limit+" offset " +offset)
//     return result
// }

const findAll = async()=>{
    const result = await pool.query('SELECT * from recetas ORDER BY idrecetas desc limit 10');
    console.log(result)
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT * from recetas WHERE idrecetas='+id)
    console.log(result)
    return result
}

const create = async({iduser, idusercreate, numReceta, fechaHora, image, medicamentos, payStatus})=>{
    const result = await pool.query(
        `INSERT INTO recetas(iduser, idusercreate, numReceta, fechaHora, image, medicamentos, payStatus) VALUES('${iduser}','${idusercreate}','${numReceta}','${fechaHora}','${image}','${medicamentos}',${payStatus})`
    );
    return result
}

const update = async(receta)=>{
    const idreceta = receta.idreceta
    const iduser = receta.iduser
    const numReceta = receta.numReceta
    const image = receta.image
    const medicamentos = JSON.stringify(receta.medicamentos)
    const result = await pool.query(
        `UPDATE recetas SET iduser='${iduser}', image='${image}', numReceta='${numReceta}', medicamentos='${medicamentos}' WHERE idrecetas=${idreceta}`
    )
    return result
}

const updatePayStatus = async(ids)=>{
    const result = await pool.query(
        `UPDATE recetas SET payStatus=1 WHERE idrecetas IN ${ids}`
    )
    return result
}

module.exports = {
    allRecetasPagination,
    allRecetasPaginationUser,
    countRecetas,
    countRecetasByMonthUser,
    findAll,
    findById,
    create,
    update,
    countRecetasByMonth,
    countRecetasByUser,
    updatePayStatus,
    allRecetasByUser
}