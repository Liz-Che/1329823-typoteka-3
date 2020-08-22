--Получить список всех категорий (идентификатор, наименование категории)
SELECT id, title
FROM categories

--Получить список категорий для которых создана минимум одна публикация 
--(идентификатор, наименование категории);
SELECT categories.id, categories.title
FROM categories INNER JOIN articles_categories ON categories.id=articles_categories.category_id
GROUP BY categories.id, categories.title

--Получить список категорий с количеством публикаций 
--(идентификатор, наименование категории, количество публикаций в категории);
SELECT categories.id, categories.title, count(articles_categories.article_id) AS "Kol_vo articles"
FROM categories INNER JOIN articles_categories ON categories.id=articles_categories.category_id
GROUP BY categories.id, categories.title

-- Получить список публикаций (идентификатор публикации, заголовок публикации, 
-- анонс публикации, дата публикации, имя и фамилия автора, контактный email, 
-- количество комментариев, наименование категорий). Сначала свежие публикации;
SELECT articles.id, articles.title, articles.announce, articles.created_date,
	concat(users.lastname,' ',users.firstname) AS "Avtora", users.email, count(DISTINCT comments.article_id) AS "Kol_vo comments", 
	string_agg(DISTINCT	categories.title, ',') AS "Name category"
FROM articles INNER JOIN users ON articles.user_id=users.id 
	INNER JOIN articles_categories ON articles_categories.article_id=articles.id
	LEFT JOIN categories ON categories.id=articles_categories.category_id
	INNER JOIN comments ON comments.article_id=articles.id
GROUP BY articles.id, articles.title, articles.announce, articles.created_date,
	concat(users.lastname,' ',users.firstname), users.email
ORDER BY articles.created_date DESC;

--Получить полную информацию определённой публикации (идентификатор публикации, 
--заголовок публикации, анонс, полный текст публикации, дата публикации, 
--путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
SELECT articles.id, articles.title, articles.announce, articles.full_text, articles.created_date,
	articles.picture, concat(users.lastname,' ',users.firstname) AS "Avtora", users.email, 
	count(DISTINCT comments.article_id) AS "Kol_vo comments", 
	string_agg(DISTINCT	categories.title, ',') AS "Name category"
FROM articles INNER JOIN users ON articles.user_id=users.id 
	INNER JOIN articles_categories ON articles_categories.article_id=articles.id
	INNER JOIN categories ON categories.id=articles_categories.category_id
	INNER JOIN comments ON comments.article_id=articles.id
WHERE articles.id=1
GROUP BY articles.id, articles.title, articles.announce, articles.created_date,
	concat(users.lastname,' ',users.firstname), users.email
ORDER BY articles.created_date DESC;

--Получить список из 5 свежих комментариев 
--(идентификатор комментария, идентификатор публикации, имя и фамилия автора, текст комментария);
SELECT comments.id, comments.article_id, concat(users.lastname,' ',users.firstname) AS "Avtor", 
		comments.text
FROM comments INNER JOIN users ON comments.user_id=users.id 
ORDER BY comments.created_date DESC
LIMIT 5
	
--Получить список комментариев для определённой публикации (идентификатор комментария, 
--идентификатор публикации, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT comments.id, comments.article_id, concat(users.lastname,' ',users.firstname) AS "Avtor", 
	comments.text
FROM comments INNER JOIN users ON comments.user_id=users.id 
WHERE comments.article_id=1
ORDER BY comments.created_date DESC

--Обновить заголовок определённой публикации на «Как я встретил Новый год»;
UPDATE articles SET title = 'Как я встретил Новый год'
WHERE articles.id=2
