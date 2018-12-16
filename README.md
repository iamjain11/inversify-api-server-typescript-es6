# inversify-api-server-typescript-es6
base architecture for inversify REST full API server

Requirements:
    $ sudo npm install gulp-cli -g;
    $ sudo npm install typescript ts-node eslint -g;
    $ sudo npm install -g nodemon;
    $ sudo npm install pm2 -g;

To run the project :

    Using gulp:
       1. $ gulp;
       2. $ "node dist/" or "npm run start";
    
    Using npm:
        1. $ npm run build;
        2. $ npm run start;

    Using launch in visual studio code:
        Use : "Launch API Inversify" to run server, this will run as production
    
    Using pm2 :
        $ npm run build;
        $ pm2 start pm2.yml