# TodoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.


## Development server

In one terminal, run the following command:
`json-server --watch db.json`

In another terminal, run the following command:
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

## Running unit tests

The application is equipped with unit tests and functional tests to ensure its correctness. To run the tests, use the following command:

`ng test`

## Assumptions and Decisions

- **Styling Framework:**The application uses Bootstrap for styling and responsive design.

- **Data Persistence:**To create a mock API from where we will fetch data, json-server is used and file which contains the data will be db.json. To run json-server, a command is already provided in Development server section.

- **Design Patterns:** Three design patterns were applied to the application: Singleton for the data service, Observer for handling state changes, and Strategy for dynamic button behavior based on task completion status.

- **Testing Approach:** The application follows a test-driven development approach. Unit tests cover individual components and services.

- **Error Handling:** Error handling is kept minimal for the sake of simplicity. In a production application, comprehensive error handling and user feedback would be implemented.
