
exports.up = function(knex) {
    return knex.schema.createTable("critics", (table) => {
        table.increments("critic_id").primary(); //set critic id as primary key
        table.string("preferred_name"); //critics preferred first name
        table.string("surname"); //critics last name
        table.string("organization_name"); //name of org critic works for
        table.timestamps(true, true);
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable("critics"); 
};
