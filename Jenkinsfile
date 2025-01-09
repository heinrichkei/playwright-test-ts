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
        GIT_INFO = "Branch(Version): ${GIT_BRANCH}\nLast Message: ${GIT_MESSAGE}\nAuthor: ${GIT_AUTHOR}\nCommit: ${GIT_COMMIT_SHORT}"
        TEXT_BREAK = "--------------------------------------------------------------"
        TEXT_PRE_BUILD = "${TEXT_BREAK}\n${GIT_INFO}\n${JOB_NAME} is Building"

        // Telegram Message Success and Failure
        TEXT_SUCCESS_BUILD = "✅ Build Successful: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nCheck it here: ${env.BUILD_URL}"
        TEXT_FAILURE_BUILD = "❌ Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}\nCheck it here: ${env.BUILD_URL}"
    }
    stages {
        stage('Pre-Build') {
            steps {
                sh "curl --location --request POST 'https://api.telegram.org/bot${TOKEN}/sendMessage' --form text='${TEXT_PRE_BUILD}' --form chat_id='${CHAT_ID}'"
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
                // Send Telegram Message
                sh "curl --location --request POST 'https://api.telegram.org/bot${TOKEN}/sendMessage' --form text='${TEXT_SUCCESS_BUILD}' --form chat_id='${CHAT_ID}'"
            }
        }
        failure {
            script {
                echo 'Tests failed. Check the test results for more details.'
                // Send Telegram Message
                sh "curl --location --request POST 'https://api.telegram.org/bot${TOKEN}/sendMessage' --form text='${TEXT_FAILURE_BUILD}' --form chat_id='${CHAT_ID}'"
            }
        }
    }
}
