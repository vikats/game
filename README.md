## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/app; npm install
    ```
3. Compile app 

    ```
    npm run compile
    ```
4. Start your app

    ```
    npm start
    ```
If you want to start app via docker

1. Containers or databases
    ```
    docker-compose up db_game db_wallet
    ```
2. Containers for apps
    ```
    docker-compose up game wallet
    ```
