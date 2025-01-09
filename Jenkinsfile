pipeline {
    agent any 

    stages {
        stage('Invoke GitHub Actions Workflow and Get Result') {
            steps {
                script {
                    try {
                        // Step 1: Trigger the Workflow
                        def url = "https://api.github.com/repos/heinrichkei/playwright-test-ts/actions/workflows/playwright.yml/dispatches"
                        def ghToken = credentials('github-user')
                        def branchName = "main" // Replace with your branch name
                        sh(script: "curl -X POST -H 'Accept: application/vnd.github.v3+json' -H 'authorization: Bearer ${ghToken.secret}' -d '{\"ref\":\"${branchName}\"}' \"${url}\"", returnStdout: true).trim()

                        // Step 2 & 3: Get Workflow Run ID and Poll for Completion
                        def workflowRunsUrl = "https://api.github.com/repos/heinrichkei/playwright-test-ts/actions/runs"
                        def workflowRunID
                        def status = "queued"
                        
                        // Introduce a delay before polling for workflow run ID
                        sleep time: 10, unit: 'SECONDS'
                        
                        while (status == "queued" || status == "in_progress") {
                            def response = sh(script: "curl -H 'Accept: application/vnd.github.v3+json' -H 'authorization: Bearer ${ghToken.secret}' ${workflowRunsUrl}", returnStdout: true).trim()
                            def runs = readJSON text: response
                            workflowRunID = runs.workflow_runs[0].id
                            status = runs.workflow_runs[0].status

                            if (status == "queued" || status == "in_progress") {
                                sleep time: 10, unit: 'SECONDS'
                            }
                        }
                        
                        // Step 4: Retrieve the Workflow Result
                        def workflowRunDetailUrl = "${workflowRunsUrl}/${workflowRunID}"
                        def detailResponse = sh(script: "curl -H 'Accept: application/vnd.github.v3+json' -H 'authorization: Bearer ${ghToken.secret}' ${workflowRunDetailUrl}", returnStdout: true).trim()
                        def workflowRunDetails = readJSON text: detailResponse
                        
                        echo "Workflow Run Details: ${workflowRunDetails}"
                    } catch (Exception e) {
                        echo "An error occurred: ${e.message}"
                        currentBuild.result = 'FAILURE'
                    }
                }
            }
        }
    }
}