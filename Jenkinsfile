pipeline {
    agent {
        docker {
            image 'node:lts' 
            args '-p 3000:3000'
        }
    }

    stages {
        stage('Build') { 
            steps {
              echo 'building the app...'
                sh 'npm install'
            }
        }
          stage('test') { 
              steps {
                echo 'testing the app...'
              }
          }
          stage('deploy') { 
              steps {
                echo 'deploying the app...'
              }
          }
    }
}
