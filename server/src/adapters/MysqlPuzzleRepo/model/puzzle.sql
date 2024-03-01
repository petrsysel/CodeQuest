CREATE TABLE IF NOT EXISTS `puzzles` (
  id varchar(255) NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  author varchar(255) NOT NULL,
  authorid varchar(255) NOT NULL,
  content text NOT NULL,
  image text,
  code varchar(255),
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;