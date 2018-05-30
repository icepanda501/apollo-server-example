
exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('companies').del()
      .then(function () {
        // Inserts seed entries
        return knex('companies').insert([{
            id: 1,
            name:"bnk48",
        },{
            id:2,
            name:"sweat16",
        }]);
      });
  };
  