pipeline {
    agent any

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
