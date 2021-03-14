# cs261
To get all dependecies, use npm install in the cs261/event-lifepro and cs261/api folders, and pip install in cs261/python_api.
Additionally, a PostgreSQL server needs to be running in the background, and Prisma needs to be installed. Once this is done, run npx prisma dev --preview-feature in the cs261/app folder.
The project has three servers, and all need to be run for the website to function correctly.
1. Node API:
To run the Node API, navigate to cs261/app and run the command npm start. This will open a server on port 3000.
2. Web application:
To run the web application itself, navigate to cs261/event-lifepro and run the command npm start. This will ask to open a port on a new port, as 3000 is taken. Select yes, and the server will open on port 3001.
3. Flask API:
To run the Flask API, navigate to cs261/python_api/api and run the command python app.py. This will open a server on port 5000.
