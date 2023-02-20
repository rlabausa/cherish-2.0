USE <database>;
GO

INSERT INTO
	[cherish].[POSTS]
	(
		[title],
		[author], 
		[body],
		[latitude],
		[longitude],
		[location_name]
	)
VALUES
	(
		'TEST POST #1',
		'RUBY',
		'HELLO WORLD AND ALL WHO INHABIT IT!',
		15.1909825,
		145.746743003024,
		'Saipan, Garapan, Saipan Municipality, Northern Mariana Islands, 96950, United States'
	)