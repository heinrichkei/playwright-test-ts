pipeline {
    agent any
    triggers {
        pollSCM('@midnight')
    }
    tools {
        nodejs 'NodeJS' // Use the name you provided in the Global Tool Configuration
    }
    options {
        timestamps()
        disableConcurrentBuilds()
    }
    environment {
        // Telegram config
        TOKEN = credentials('Telegram_bot_token')
        CHAT_ID = credentials('Telegram_bot_ID')

        // Telegram Message Pre Build
        CURRENT_BUILD_NUMBER = "${currentBuild.number}"
        GIT_MESSAGE = sh(returnStdout: true, script: "git log -n 1 --format=%s ${GIT_COMMIT}").trim()
        GIT_AUTHOR = sh(returnStdout: true, script: "git log -n 1 --format=%ae ${GIT_COMMIT}").trim()
        GIT_COMMIT_SHORT = sh(returnStdout: true, script: "git rev-parse --short ${GIT_COMMIT}").trim()
        GIT_INFO = "- Branch: ${GIT_BRANCH}\n- Commit Message: ${GIT_MESSAGE}\n- Commit: ${GIT_COMMIT_SHORT}"
        TEXT_BREAK = "\\-\\-\\-🚧🚧🚧\\-\\-\\-"
        TEXT_PRE_BUILD = "${TEXT_BREAK}\n${GIT_INFO}\n\n**${JOB_NAME}** is building..."

        // Telegram Message Success and Failure
        TEXT_SUCCESS_BUILD = "✅ **Build SUCCESSFUL**: ${env.JOB_NAME} \\#${env.BUILD_NUMBER}\n\n[Check it here](${env.BUILD_URL})"
        TEXT_FAILURE_BUILD = "❌ **Build FAILED**: ${env.JOB_NAME} \\#${env.BUILD_NUMBER}\n\n[Check it here](${env.BUILD_URL})"
    }
    stages {
        stage('Pre-Build') {
            steps {
                withCredentials([string(credentialsId: 'Telegram_bot_token', variable: 'TOKEN'), string(credentialsId: 'Telegram_bot_ID', variable: 'CHAT_ID')]) {
                    sh '''
                        curl -X POST -H "Content-Type: application/json" -d '{"chat_id":"'"${CHAT_ID}"'", "text": "'"${TEXT_PRE_BUILD}"'", "parse_mode": "MarkdownV2", "disable_notification": false}' https://api.telegram.org/bot${TOKEN}/sendMessage
                    '''
                }
            }
        }
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
                withCredentials([string(credentialsId: 'Telegram_bot_token', variable: 'TOKEN'), string(credentialsId: 'Telegram_bot_ID', variable: 'CHAT_ID')]) {
                    sh '''
                        curl -X POST -H "Content-Type: application/json" -d '{"chat_id":"'"${CHAT_ID}"'", "text": "'"${TEXT_SUCCESS_BUILD}"'", "parse_mode": "MarkdownV2", "disable_notification": false}' https://api.telegram.org/bot${TOKEN}/sendMessage
                    '''
                }
            }
        }
        failure {
            script {
                echo 'Tests failed. Check the test results for more details.'
                withCredentials([string(credentialsId: 'Telegram_bot_token', variable: 'TOKEN'), string(credentialsId: 'Telegram_bot_ID', variable: 'CHAT_ID')]) {
                    sh '''
                        curl -X POST -H "Content-Type: application/json" -d '{"chat_id":"'"${CHAT_ID}"'", "text": "'"${TEXT_FAILURE_BUILD}"'", "parse_mode": "MarkdownV2", "disable_notification": false}' https://api.telegram.org/bot${TOKEN}/sendMessage
                    '''
                }
            }
        }
    }
}
