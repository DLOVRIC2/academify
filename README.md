![image](https://github.com/DLOVRIC2/academify/assets/66421606/07baa614-f7a3-4e8c-84d7-274ba9c95736)

Solo project for the Lablab.ai Autonomous Agents Hackathon

You can check out the application at the following link:
http://3.94.209.49:3000/

### Prerequisites

To run Academify locally, you need

- Docker (https://www.docker.com/products/docker-desktop)
- Docker Compose, which is included with Docker Desktop for Mac and Windows, but needs to be installed separately for Linux (https://docs.docker.com/compose/install/)
- Git (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- You will also need to get OpenAI API key to run OpenAI Shap-e model. (https://platform.openai.com/account/api-keys)


### Getting Started

Follow these steps to get DesignDive up and running

1. **Clone the repository**
   ```
   git clone https://github.com/DLOVRIC2/academify
   ```

2. **Navigate to the repository directory**
   ```
   cd academify
   ```

3. **Export your key to local session**
   ```
   export OPENAI_API_KEY=you_api_key
   ```

4. **Start the Docker containers**
   ```
    docker-compose -f docker-compose.dev.yml up -d
   ```

   This will start the front-end application at http://localhost:3000.

To stop the application, use the command `docker-compose -f docker-compose.dev.yml down`.

The production version uses the images built for frontend and backend deployed here: 

Frontend: https://hub.docker.com/repository/docker/dlovric2/academify-frontend

Backend: https://hub.docker.com/repository/docker/dlovric2/academify-backend/general

### Troubleshooting

If you face any issues, check

- Your Docker version Ensure that your Docker version is up-to-date.
- Dockerfile paths Ensure the paths specified in the `docker-compose.yml` are correct.

---
