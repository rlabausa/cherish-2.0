USE <database>;
GO
CREATE TABLE [cherish].[POSTS] (
	id BIGINT IDENTITY (1,1) PRIMARY KEY,
	latitude DECIMAL(17,15) NOT NULL,
	longitude DECIMAL(18, 15) NOT NULL,
	title VARCHAR(256) NOT NULL,
	location_name VARCHAR(256) NOT NULL,
	author VARCHAR(100) NOT NULL,
	body VARCHAR(MAX) NOT NULL,
	photo_id BIGINT NOT NULL, 
	CONSTRAINT fk_posts_photo_id FOREIGN KEY (photo_id) REFERENCES [cherish].[PHOTOS] (id)
);
GO

CREATE TABLE [cherish].[PHOTOS] (
	id BIGINT IDENTITY(1,1) PRIMARY KEY,
	filepath VARCHAR(260) NOT NULL UNIQUE
);
GO