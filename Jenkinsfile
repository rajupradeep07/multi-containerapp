pipeline {
    agent any

    stages {
        stage('Cleanup Old Containers') {
            steps {
                // This stops any old versions so we don't have port conflicts
                sh 'sudo docker compose down || true'
            }
        }

        stage('Build and Start') {
            steps {
                // This builds your fresh index.js and starts the DB
                sh 'sudo docker compose up -d --build'
            }
        }

        stage('Verify Running') {
            steps {
                // This shows the 'Up' status in your Jenkins Console Output
                sh 'sudo docker ps'
            }
        }
    }
}