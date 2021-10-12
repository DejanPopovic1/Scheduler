--https://docs.microsoft.com/en-us/sql/t-sql/data-types/float-and-real-transact-sql?view=sql-server-ver15

CREATE TABLE Schedule (
	Id varchar(100),
	PickupDateTime datetime,
	ScheduleName varchar(100),
	Latitude float(25),
	Longitude float(25)
);