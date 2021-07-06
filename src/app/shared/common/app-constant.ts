export const appConstant = {
    settings: {
        successCodes: {
            APP_RESULT: "appResult"
        },
        errorCodes: {
            404: "APP_404",
            500: "APP_500"
        },
        successMessage: {
            "appResult": "Results are here!!"
        },
        errorMessages: {
            APP_404: "Not Found",
            APP_500: "Internal Server Error"
        }
    },
    employmentCertificateConfig:{
        local:'assets/data/employmentCertificate.json'
    },
    userInfo:{
        local:'assets/data/userInfo.json'
    },
    scriptConfig:[{
        name:'appScripts',
        src:{

        },
        css:{

        }
    }]
}