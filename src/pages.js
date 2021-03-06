const Database = require("./database/db");
const saveOrphanage = require("./database/saveOrphanage");
const saveScheduleVisitation = require("./database/saveScheduleVisitation");

module.exports = {
  index(req, res) {
    return res.render("index");
  },
  async orphanage(req, res) {
    try {
      const db = await Database;
      const results = await db.all(
        `SELECT * FROM orphanages WHERE id = ${req.query.id}`
      );
      const orphanage = results[0];

      orphanage.images = orphanage.images.split(",");
      orphanage.firstImage = orphanage.images[0];
      orphanage.open_on_weekends =
        orphanage.open_on_weekends == "1" ? true : false;

      const visitations = await db.all(
        `SELECT * FROM visitations WHERE orphanage_id = ${req.query.id} ORDER BY visitationdate`
      );

      visitations.forEach(visitation =>{
        const newDate = new Date(visitation.visitationdate);
        const weekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
        visitation.visitationdate_formated = 
          weekDays[newDate.getUTCDay()] + ", " +
          newDate.getUTCDate() + "/"+
          (newDate.getUTCMonth()+1).toString() + "/" +
          newDate.getUTCFullYear() + ", (" +
          visitation.peoplecount + " " + 
          (visitation.peoplecount==1?"pessoa":"pessoas") +")";
      })

      return res.render("orphanage", { orphanage, visitations });
    } catch (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    }
  },
  async orphanages(req, res) {
    try {
      const db = await Database;
      const orphanages = await db.all("SELECT * FROM orphanages");
      return res.render("orphanages", { orphanages });
    } catch (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    }
  },
  createOrphanage(req, res) {
    return res.render("create-orphanage");
  },
  async saveOrphanage(req, res) {
    const fields = req.body;

    //validar se todos os campos estão preenchidos
    if (Object.values(fields).includes("")) {
      return res.send("Todos os campos devem ser preenchidos!");
    }

    try {
      //salvar um orfanato
      const db = await Database;
      await saveOrphanage(db, {
        lat: fields.lat,
        lng: fields.lng,
        name: fields.name,
        about: fields.about,
        whatsapp: fields.whatsapp,
        images: fields.images.toString(),
        instructions: fields.instructions,
        opening_hours: fields.opening_hours,
        open_on_weekends: fields.open_on_weekends,
      });

      //redirecionamento
      return res.redirect("/orphanages");
    } catch (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    }
  },
  async scheduleVisitation(req, res) {
    try {
      const db = await Database;
      const results = await db.all(
        `SELECT * FROM orphanages WHERE id = ${req.query.id}`
      );
      const orphanage = results[0];

      orphanage.open_on_weekends =
        orphanage.open_on_weekends == "1" ? true : false;

      return res.render("schedule-visitation", { orphanage });
    } catch (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    }
  },
  async saveScheduleVisitation(req, res) {
    const fields = req.body;

    //validar se todos os campos estão preenchidos
    if (Object.values(fields).includes("")) {
      return res.send("Todos os campos devem ser preenchidos!");
    }

    try {
      //salvar um orfanato
      const db = await Database;      
      await saveScheduleVisitation(db, {
        orphanage_id: fields.id,
        name: fields.name,
        whatsapp: fields.whatsapp,
        peoplecount: fields.peoplecount,
        visitationdate: fields.visitationdate,
      });

      //redirecionamento
      return res.redirect(`/orphanage?id=${fields.id}`);
    } catch (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    }
  },
};
