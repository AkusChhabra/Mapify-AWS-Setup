# Mapify-AWS-Setup

Setup of AWS Postgres server to send data to client side of application. 

Ensure you have downloaded the appropriate certificate from AWS. Refer to the guide <a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL.html">here</a>.

# Format Data to CSV

To convert raw data files to csv, use the ```InputToCSV.js``` file

```
node InputToCSV.js
```

Upload the resultant .CSV data to the server using <a href="https://www.pgadmin.org/download/pgadmin-4-windows/">pgAdmin4</a>, <a href="https://tableplus.com">TablesPlus</a>, or PSQL shell.

# Library Installation

Install the <a href="https://www.npmjs.com/package/dotenv">dotenv</a>, <a href="https://www.npmjs.com/package/pg">postgresql</a>, and <a href="https://www.npmjs.com/package/express">express</a> libraries using npm.

```
npm install dotenv
npm install pg
npm install express
```

Create a .env file and add your configuration for the following paramaters: ```PGUSER```, ```PGPASSWORD```, ```PGHOST```, ```PGPORT```, ```PGDATABASE```


# Query AWS PostgreSQL Server

Modify the query in ```postgres.js``` as necessary and run the following command:

```
node postgres.js
```