# Noviti task

## Task
Create a web application for a loan schedule generation (gather input and display results).

Loan amount: 5000 - 50000 Eur
Yearly interest: 12.7%
Term: 6 months
Schedule repayment type: Annuity
Loan payment is monthly.

## Optional
* Create and use the backend REST API.
* Save result to file (REST API).
* Use a database at REST API (add db to docker).
* Use different branches (at least 2) for different functionality and merge to main at the end of development.

## Example
| No. | Remaining credit amount | Principal part | Interest   | Total payment |
|-----|-------------------------|----------------|------------|---------------|
| 1   | 10052.27                | 1947.73        | 127.00     | 2074.73       |
| 2   | 8083.93                 | 1968.34        | 106.39     | 2074.73       |
| 3   | 6094.75                 | 1989.18        | 85.55      | 2074.73       |
| 4   | 4084.52                 | 2010.23        | 64.50      | 2074.73       |
| 5   | 2053.02                 | 2031.50        | 43.23      | 2074.73       |
| 6   | 0.00                    | 2053.02        | 21.73      | 2074.75       |
|     | Total:                  | 12000.00 EUR   | 448.40 EUR | 12448.40 EUR  |

## Repository

This project consists of a front-end application and a REST API.

## Getting Started

To start the project, follow these steps:

1. Run the following command to set up the project: `make up` or `docker-compose up`
2. Run `make sh` or `docker compose exec noviti-app bash` to connect to the container and execute `composer install`
3. Once the project is running, you can access the front-end application at `http://127.0.0.1:8000` and the REST API at `http://127.0.0.1:8080/api/noviti`.

## Project Structure

- Front-end directory: The front-end application is located in the `front-end` directory.

- Back-end controller: The back-end controller responsible for handling the REST API requests is located at `/rest-api/src/Controller/NovitiController.php`.

## Dependencies

The project has the following dependencies:

- Docker
- Docker Compose

Make sure you have these dependencies installed before starting the project.

## Help

* https://www.ablebits.com/office-addins-blog/excel-pmt-function-formula-examples/
* https://www.binaryboxtuts.com/php-tutorials/how-to-make-symfony-6-rest-api/
* [dev@noviti.lt](mailto:dev@noviti.lt)