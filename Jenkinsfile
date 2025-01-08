pipeline {
    agent any 

    stages {
        stage('Trigger GitHub Action') {
            steps {
                script {
                    def ghAccessToken = credentials('github_token') 
                    def githubApiUrl = 'https://api.github.com/repos/heinrichkei/playwright-test-ts/actions/workflows/playwright.yml/dispatches' 
                    def response = httpRequest method: 'POST', 
                                    url: githubApiUrl, 
                                    requestBody: '''
                                        {
                                            "ref": "main", 
                                            "inputs": {
                                                "my_input": "value" 
                                            }
                                        }
                                    ''', 
                                    headers: [
                                        'Authorization: Bearer ' + ghAccessToken.secret 
                                    ]
                    if (response.status != 204) { 
                        error "Failed to trigger GitHub Action: ${response.status} - ${response.data}" 
                    }
                }
            }
        }
    }
}