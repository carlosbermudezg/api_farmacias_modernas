const { pool } = require('../utils/connMySql2');
const { sendMail } = require('../utils/sendMail');

const findAll = async(limit, offset, search)=>{
    const result = await pool.query('SELECT idusers, name, username, type, active, telefono, direccion, residencia, zones, brands from users WHERE name LIKE ? OR username LIKE ? limit ? offset ?',[`%${search}%`, `%${search}%`, +limit, +offset]);
    return result
}
const findAllCursor = async (limit, cursorDate, cursorId, search) => {
    let params = [`%${search}%`, `%${search}%`];
  
    let baseQuery = `
      SELECT 
        u.idusers, u.name, u.username, u.type, u.active, u.telefono, u.direccion, u.residencia, u.zones, u.brands,
        COALESCE(MAX(m.created_at), '1970-01-01 00:00:00') AS last_message_date
      FROM users u
      LEFT JOIN messages m ON (m.sender_id = u.idusers OR m.receiver_id = u.idusers)
      WHERE (u.name LIKE ? OR u.username LIKE ?)
    `;
  
    // Si tenemos un cursorDate y cursorId, agregar condiciones adicionales para la paginación
    if (cursorDate && cursorId) {
      // Validar que cursorDate esté correctamente formateada
      if (isNaN(Date.parse(cursorDate))) {
        throw new Error('Invalid cursor date format');
      }

      // Componer la consulta para los resultados después del cursor
      baseQuery += ` AND (m.created_at < ? OR (m.created_at = ? AND u.idusers < ?))`;
      params.push(cursorDate, cursorDate, cursorId);
    }
  
    // Añadir GROUP BY para los usuarios
    baseQuery += ` GROUP BY u.idusers ORDER BY last_message_date DESC, u.idusers DESC LIMIT ?`;
    params.push(+limit);
  
    // Ejecutar la consulta
    const [rows] = await pool.query(baseQuery, params);
    return rows;
};

const countUsers = async(search)=>{
    const result = await pool.query('SELECT count(*) as count from users WHERE name LIKE ? OR username LIKE ?', [`%${search}%`, `%${search}%`]);
    return result
}

const findById = async(id)=>{
    const result = await pool.query('SELECT idusers, name, username, type, active, telefono, direccion, residencia from users WHERE idusers="'+id+'"')
    return result
}


const findDoctors = async()=>{
    const result = await pool.query('SELECT idusers, name, username, telefono, residencia, zones from users WHERE type=1')
    return result
}

const findDoctorsByZone = async(zones)=>{
    const result = await pool.query(`SELECT idusers, name, username, telefono, residencia from users WHERE type=1 AND zones IN ${zones}`)
    return result
}

const findOne = async(username)=>{
    const result = await pool.query('SELECT * from users WHERE username="'+username+'"')
    return result
}

const findByUserSearch = async(search)=>{
    const result = await pool.query("SELECT idusers, name FROM users WHERE name LIKE '%"+search+"%'")
    return result
}

const changeStatus = async(id, status) => {
    const result = await pool.query(
        `UPDATE users SET active=${status} WHERE idusers=${id}`
    );
    return result
}

const create = async({name, username, password, type, telefono, direccion, residencia, brands, zones})=>{
    const review = await findOne(username)
    console.log(review[0][0])
    if(review[0][0] === undefined){
        const result = await pool.query(
            `INSERT INTO users(name, username, password, telefono, direccion, residencia, type, zones, brands) VALUES('${name}','${username}','${password}','${telefono}','${direccion}','${residencia}','${type}','${zones}','${brands}')`
        )
        const userType = type == "1" ? "Médico" : "Visitador Médico"
        const data = {
            to : "ceofarmaciaslopez@gmail.com",
            subject : `Nuevo ${userType} registrado`,
            html : `
                    <p>Datos del usuario:</p>
                    <p>${userType}</p>
                    <p>${name}</p>
                    <p>${username}</p>
                    <p>${telefono}</p>
                `
        }
        const dataPrueba = {
            to : "cbermudezg7@gmail.com",
            subject : `Nuevo ${userType} registrado`,
            html : `
                    <p>Datos del usuario:</p>
                    <p>${userType}</p>
                    <p>${name}</p>
                    <p>${username}</p>
                    <p>${telefono}</p>
                `
        }
        const dataUser = {
            to : username,
            subject : `Bienvenido a Farmacias Modernas`,
            html : `
                    <p>Se ha registrado con éxito en la plataforma de Farmacias Modernas, espere la confirmación del Administrador.</p>
                `
        }
        sendMail(data)
        sendMail(dataPrueba)
        sendMail(dataUser)
        return result
    }else{
        return false
    }
}

const update = async(data) => {
    console.log(data)
    const result = await pool.query(
        `UPDATE users SET name='${data.name}', username='${data.username}', telefono='${data.telefono}', direccion='${data.direccion}', residencia='${data.ciudad}', type='${data.type}', zones='${data.zones}', brands='${data.brands}' WHERE idusers=${data.id}`
    );
    return result
}

module.exports = {
    findAll,
    findById,
    findOne,
    create,
    changeStatus,
    findByUserSearch,
    update,
    findDoctors,
    findDoctorsByZone,
    countUsers,
    findAllCursor
}