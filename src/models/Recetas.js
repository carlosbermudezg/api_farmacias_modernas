const pool = require('../utils/connMySql2')

const allRecetasPagination = async(limit, offset)=>{
    const result = await pool.query('SELECT * from recetas limit ? offset ?', [+limit, +offset]);
    return result
}
const allRecetasPaginationUser = async(id, limit, offset, month, year)=>{
    const result = await pool.query(`SELECT * FROM recetas WHERE iduser = ? AND fechaHora LIKE ? LIMIT ? OFFSET ?`, [id, `%${year}-${month}%`, +limit, +offset]);
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
const countRecetasByMonthUser = async(month, year, id)=>{
    const result = await pool.query("SELECT count(*) as count from recetas WHERE iduser='"+id+"' AND fechaHora LIKE '%"+year+'-'+month+"%'");
    return result
}

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

const create = async({iduser, idusercreate, numReceta, fechaHora, image, medicamentos})=>{
    const result = await pool.query(
        `INSERT INTO recetas(iduser, idusercreate, numReceta, fechaHora, image, medicamentos) VALUES('${iduser}','${idusercreate}','${numReceta}','${fechaHora}','${image}','${medicamentos}')`
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

module.exports = {
    allRecetasPagination,
    allRecetasPaginationUser,
    countRecetas,
    countRecetasByMonthUser,
    findAll,
    findById,
    create,
    update,
    countRecetasByMonth
}