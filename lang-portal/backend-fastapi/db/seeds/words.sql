-- Insert data into the `words` table
INSERT INTO words (id, japanese, romaji, english, parts) VALUES
(1, 'こんにちは', 'konnichiwa', 'hello', '{"greeting": true}'),
(2, 'ありがとう', 'arigatou', 'thank you', '{"politeness": true}'),
(3, 'さようなら', 'sayounara', 'goodbye', '{"farewell": true}'),
(4, '猫', 'neko', 'cat', '{"animal": true}'),
(5, '犬', 'inu', 'dog', '{"animal": true}'),
(6, '水', 'mizu', 'water', '{"object": true}'),
(7, '火', 'hi', 'fire', '{"element": true}'),
(8, '山', 'yama', 'mountain', '{"nature": true}'),
(9, '川', 'kawa', 'river', '{"nature": true}'),
(10, '空', 'sora', 'sky', '{"nature": true}');

-- Insert data into the `groups` table
INSERT INTO groups (id, name) VALUES
(1, 'Basic Greetings'),
(2, 'Animals'),
(3, 'Nature'),
(4, 'Elements');

-- Insert data into the `words_groups` table (many-to-many relationship between words and groups)
INSERT INTO words_groups (id, word_id, group_id) VALUES
(1, 1, 1), -- "こんにちは" belongs to "Basic Greetings"
(2, 2, 1), -- "ありがとう" belongs to "Basic Greetings"
(3, 3, 1), -- "さようなら" belongs to "Basic Greetings"
(4, 4, 2), -- "猫" belongs to "Animals"
(5, 5, 2), -- "犬" belongs to "Animals"
(6, 6, 4), -- "水" belongs to "Elements"
(7, 7, 4), -- "火" belongs to "Elements"
(8, 8, 3), -- "山" belongs to "Nature"
(9, 9, 3), -- "川" belongs to "Nature"
(10, 10, 3); -- "空" belongs to "Nature"
