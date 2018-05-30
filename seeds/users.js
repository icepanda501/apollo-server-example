
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
        id:1,
        first_name:"Cherprang",
        last_name:"Areekul",
        email:"cherprang@bnk.com",
        company_id:1
    },{
        id:2,
        first_name:"Praewa",
        last_name:"Suthamphong",
        email:"Praewa@bnk.com",
        company_id:1
    },{
        id:3,
        first_name:"Chadatan",
        last_name:"Dankul",
        email:"Chadatan@sweat.com",
        company_id:2
    }]);
    });
};
