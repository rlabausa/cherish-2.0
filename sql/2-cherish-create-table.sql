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
	--img_path VARCHAR(256) NOT NULL -- future feature!
);
GO