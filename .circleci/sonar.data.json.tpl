{
     "ciMessage": {
       "type": "com.symphony.integration.test.event",
       "version": "1.0",
       "icon": {
            "type" : "com.symphony.integration.icon",
            "version" : "1.0",
            "url" : "https://d3r49iyjzglexf.cloudfront.net/logo-circleci-9a5afe10588065ad315b972de5ed572c25fb39a973e4b9cd28a35f88694f1fa0.svg"
        },
       "ci": {
         "project": "${CIRCLE_PROJECT_REPONAME}",
         "baseUrl" : "https://circleci.com",
         "build_num": "${CIRCLE_BUILD_NUM}",
         "build_url": "${CIRCLE_BUILD_URL}",
         "pr_num": "${CIRCLE_PR_NUM}",
         "pr_url": "${CIRCLE_PULL_REQUEST}",
         "user": "${CIRCLE_USERNAME}"
       },
       "message": {
         "type": "com.symphony.integration.test.message",
         "version": "1.0",
         "header": "SonarQube",
         "tokenColor" : "green",
         "subject": "Code Analysis",
         "body": "Running Analysis for "
         
       }
     }
   }