USE <database>;
GO

CREATE SCHEMA cherish
GO

CREATE LOGIN svc_cherish WITH PASSWORD = '123';
GO

CREATE USER svc_cherish FOR LOGIN svc_cherish WITH DEFAULT_SCHEMA = cherish;
GO


GRANT 
	SELECT, INSERT, UPDATE, DELETE, ALTER
ON 
	SCHEMA::cherish 
TO 
	svc_cherish;
