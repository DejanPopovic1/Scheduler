-- https://docs.microsoft.com/en-us/sql/t-sql/data-types/float-and-real-transact-sql?view=sql-server-ver15
-- Although not used here, it is preferable to use decimal: https://stackoverflow.com/questions/1196415/what-datatype-to-use-when-storing-latitude-and-longitude-data-in-sql-databases

 DROP TABLE Schedule;

CREATE TABLE Schedule (
	Id int identity (1, 1),
	PickupDateTime datetime,
	ScheduleName varchar(100),
	Latitude float(25),
	Longitude float(25)
);