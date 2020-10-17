const Database = require('sqlite-async');
const path = require('path');

function execute(db){    
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat TEXT,
            lng TEXT,
            name TEXT,
            about TEXT,
            whatsapp TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends TEXT
        );
    `).then(() => {
        return db.exec(`
        CREATE TABLE IF NOT EXISTS visitations(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            orphanage_id INTEGER,
            name TEXT,
            whatsapp TEXT,
            peoplecount INTEGER,
            visitationdate DATE
        )
        `)
    })
}

module.exports = Database.open(path.join(__dirname, 'database.sqlite')).then(execute) 