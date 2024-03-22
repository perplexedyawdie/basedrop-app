<h1 align="center">Welcome to Basedrop 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A visual workspace for mood boards, inspiration, and idea curation

### 🏠 [Basedrop.space](https://basedrop.space)

### Prerequisites

* Node.js (https://nodejs.org/)
* Docker (https://www.docker.com/)
* Docker Compose (https://docs.docker.com/compose/)

## Setup & Usage

Clone the repo
```sh
git clone https://github.com/perplexedyawdie/basedrop-app.git
```

Navigate to the project directory
```sh
cd basedrop-app
```

Make a copy of `.env.example` and name it `.env.local`

Populate the env vers with the required values from Baserow & Github.

Build & run the container
```sh
docker compose up -d
```

It will be available at [http://localhost:3000](htpp://localhost:3000)

### Local Development

Install the dependencies
```sh
npm install
```

Start the development server
```sh
npm run dev
```

## Author

👤 **Javel Rowe**

* Website: https://javel.dev
* Github: [@perplexedyawdie](https://github.com/perplexedyawdie)
* LinkedIn: [@javel-rowe](https://linkedin.com/in/javel-rowe)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_