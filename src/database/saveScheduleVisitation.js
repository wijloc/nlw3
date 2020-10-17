function saveScheduleVisitation(db, visitation){
    return db.run(`
        INSERT INTO visitations(
            orphanage_id,
            name,
            whatsapp,
            peoplecount,
            visitationdate
        ) VALUES (
            "${visitation.orphanage_id}",
            "${visitation.name}",
            "${visitation.whatsapp}",
            "${visitation.peoplecount}",
            "${visitation.visitationdate}"
        );
    `)
}

module.exports = saveScheduleVisitation;