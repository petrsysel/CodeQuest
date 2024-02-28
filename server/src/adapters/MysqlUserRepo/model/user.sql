CREATE TABLE IF NOT EXISTS `users` (
  id varchar(255) NOT NULL PRIMARY KEY,
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  fullname varchar(255),
  passwordhash varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;