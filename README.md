# Spotify data proccessing task

This task is specified to data proccessing including data transformations and data explode based on example spotify dataset.

The task is divided in three main parts:

1. Implement a Node.js script to ingest the data from the source and transform it.
2. Store the cleaned and transformed data into AWS S3 bucket and load it to the local instance of PostgreSQL.
3. Create SQL views to perform required queries.

## Dependencies for local development

- Node.js v20.14.0 (LTS) and fewer
- Docker

## How to run it?

1. Make sure that you have required dependencies mentioned in the earlier chapter installed in your machine.
2. Open console in the root folder using Command Prompt, Terminal or any other simillar tool.
3. Execute command: `npm run local`
4. Results should be generated in `data/filtered` and errors presented in the console

## What needs to be done

- Unit testing for the main program(using Jest):
  - Covering data types to ensure integrity of the data
  - Cover transformations and explode operations to ensure the integrity of data after applied transformations.
- Improved error handling:
  - Some of the data fields might have incorrect format but contain usable data.
  - Add logger to categorize logs and write to log file.
- PostgreSQL views to query and select data based on the criterias.

## Notes

During the task solution development I did notice that multithreading is a must, due to large datasets used in this project, using synchronous reading it will take a lot of time to process everything and using multiple workers would increase work time dramatically(this needs to be implemented).

Some of the example dataset fields were in the incorrect formatting but contained usable information(this could be also tackled).

The project structure was successfuly created and defines a scalable structure for further development by other people.
