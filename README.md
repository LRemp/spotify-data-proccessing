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
