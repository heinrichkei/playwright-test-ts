pipeline {
    agent any
    /* triggers {
        pollSCM('H/5 * * * *')
    } */
    tools {
        nodejs 'NodeJS' // Use the name you provided in the Global Tool Configuration
    }
    options {
        timestamps()
        disableConcurrentBuilds()
    }
    environment {
        // Telegram configuration
        TOKEN = credentials('Telegram_bot_token')
        CHAT_ID = credentials('Telegram_bot_ID')
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install pnpm') {
            steps {
                sh 'npm install -g pnpm'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'pnpm install --no-frozen-lockfile'
            }
        }
        stage('Install Playwright Browser') {
            steps {
                sh 'pnpm exec playwright install --with-deps'
            }
        }
        stage('Run Automated Test Case with Cucumber') {
            steps {
                sh 'pnpm exec playwright test'
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'test-results/playwright-report.*,test-results/screenshots/*.png', allowEmptyArchive: true
            // Clean Workspace
            sh "ls"
            deleteDir()
            sh "ls"
        }
        success {
            script {
                echo 'Tests passed successfully!'
                sh 'curl -X POST -H \"Content-Type: application/json\" -d \"{\\\"chat_id\\\":${CHAT_ID}, \\\"text\\\": \\\"Build succeeded!\\\", \\\"disable_notification\\\": false}\" https://api.telegram.org/bot${TOKEN}/sendMessage'
            }
        }
        failure {
            script {
                echo 'Tests failed. Check the test results for more details.'
                sh 'curl -X POST -H \"Content-Type: application/json\" -d \"{\\\"chat_id\\\":${CHAT_ID}, \\\"text\\\": \\\"Build failed!\\\", \\\"disable_notification\\\": false}\" https://api.telegram.org/bot${TOKEN}/sendMessage'
            }
        }
    }
}
