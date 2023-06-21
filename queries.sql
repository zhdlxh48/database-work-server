create table items (
    item_id int unique not null,
    item_type varchar(32) default 'none',
    item_name varchar(64) default 'none'
);

create table players (
    player_id int primary key auto_increment,
    player_name varchar(32) default 'anonymous',
    player_email varchar(32) unique not null,
    player_password varchar(32) not null
);

create table inventories (
    player_id int references players(player_id),
    item_id int references items(item_id)
);

select * from items;
select * from players;
select * from inventories;

SELECT * from players where player_password = 'testpasswd' and player_email = 'testemail@test.com';

SELECT item_id, item_type, item_name FROM items
                                     where item_id in
                                           (SELECT item_id FROM inventories
                                                           where player_id = 4);

SELECT itm.item_id, item_type, item_name, COUNT(itm.item_id) AS count FROM inventories inv
    LEFT JOIN items itm ON inv.item_id = itm.item_id where player_id = 4 group by item_id;

INSERT INTO inventories (player_id, item_id) VALUES (1, 1);

/*
// This is MySQL
create table inventories (
    player_id int not null,
    item_id int not null,
    foreign key ('player_id') references 'players' ('player_id'),
    foreign key ('item_id') references 'items' ('item_id')
);
*/

show tables;

show create table inventories;