# INI8 Labs

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

In backend Folder

`PORT`
`CORS_ORIGIN`
`MEMORY`

`MONGODB_URI`

In frontend Folder

`VITE_BASE_URL`

## Run Locally

Clone the repository:

```bash
  git clone https://github.com/Lohit-Behera/INI8-Labs.git
  cd INI8-Labs
```

**Running using [Docker](https://www.docker.com/)**

in root directory

```bash
  docker compose up
```

Then go to [localhost:5173](http://localhost:5173/) for frontend and [localhost:8000](http://localhost:8000/) for backend

**Running without Docker**

Clone the repository:

```bash
  git clone https://github.com/Lohit-Behera/INI8-Labs.git
  cd INI8-Labs
```

Now change directory to backend

```bash
  cd backend
```

Install node modules

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

In another terminal for React js

Now change directory to frontend

```bash
  cd INI8-Labs
  cd frontend
```

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Then go to [http://localhost:5173](http://localhost:5173)
