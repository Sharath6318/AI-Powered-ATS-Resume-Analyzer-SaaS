import axios from "axios";

var token = localStorage.getItem('token')

var BASE_URL = 'http://127.0.0.1:8000'

export async function RegiserApi(data) {

    let response = await axios.post(`${BASE_URL}/register/`, data)

    return response
}

export async function LoginApi(data) {

    let response = await axios.post(`${BASE_URL}/token/`, data)

    return response
}

export async function GetUserApi() {

    let headers = {
        'Authorization': token
    }

    let response = await axios.get(`${BASE_URL}/Me/`, { headers })

    return response
}

export async function RetriveAnalyzeResumeApi(resume_id) {

    let headers = {
        'Authorization': token
    }

    let response = await axios.get(`${BASE_URL}/resume/${resume_id}/`, { headers })

    return response
}

export async function ResumeAnalysesApi() {

    let headers = {

        'Authorization': token
    }

    let response = await axios.get(`${BASE_URL}/resume-analyzes/`, { headers })

    return response
}

export async function GetAllResumeApi() {

    let headers = {
        "Authorization": token
    }

    let response = await axios.get(`${BASE_URL}/resume-analyze/`, { headers })

    return response
}


export async function GetResumesAPi() {

    let headers = {
        "Accept": "application/json",
        "Authorization": token
    }

    let response = await axios.get(`${BASE_URL}/resume/`, { headers })

    return response
}

export async function AnalyzeResumeAPi(id, jobDec) {

    if (!jobDec) {

        alert("Please select job description")

        return
    }


    let headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    let response = await axios.post(`${BASE_URL}/resume/${id}/analyze/`, { job_description_id: jobDec }, { headers })

    return response
}

export async function AllAnalyzesApi() {

    let headers = {
        "Authorization": token
    }

    let response = await axios.get(`${BASE_URL}/resume-analyzes/`, { headers })

    return response
}

export async function GetResumeAnalyzeApi(resume_id) {

    let headers = {
        'Authorization': token
    }

    let response = await axios.get(`${BASE_URL}/resume/${resume_id}/`, { headers })


    return response
}

export async function FileUploadAPi(file) {

    let headers = {
        "Authorization": token
    }

    let response = await axios.post(`${BASE_URL}/resume/`, file, { headers })

    return response

}

export async function SummaryAPi() {

    let headers = {
        'Authorization': token
    }

    let response = await axios.get(`${BASE_URL}/resume-summary/`, { headers })

    return response
}

export async function CreateJobDescriptionApi(data) {

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    let response = await axios.post(`${BASE_URL}/job-description/`, data, { headers })

    return response

}

export async function JobDescriptionlistApi() {

    let headers = {
        'Authorization': token
    }

    let response = await axios.get(`${BASE_URL}/job-description/`, { headers })

    return response
}

export async function GetJobDescriptionApi(desc_id) {

    let headers = {
        'Authorization': token
    }

    let response = await axios.get(`${BASE_URL}/job-description/${desc_id}/`, { headers })

    return response
}

export async function DestroyJobDescriptionAPi(desc_id) {

    let headers = {
        'Authorization': token
    }

    let response = await axios.delete(`${BASE_URL}/job-description/${desc_id}/`, { headers })

    return response

}

export async function SubScriptionApi(price, plan) {


    let headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    const response = await axios.post(`${BASE_URL}/create-payment/`, { price: price }, { headers });

    return response
}

// set plan for the particular user.....................
export async function PaymentSucessAPi(plan) {

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    const response = await axios.post(`${BASE_URL}/setplan/`, { plan: plan }, { headers });

    return response

}
export async function UpdateSubscriptonAPi() {

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    let response = await axios.patch("http://127.0.0.1:8000/updatesubscription/", {}, { headers })

    return response
}


export async function ListSubscriptonAPi() {

    let headers = {
        'Accept': 'application/json',
        'Authorization': token
    }

    let response = await axios.get("http://127.0.0.1:8000/all-sub/", { headers })

    return response
}

export async function UsageListApi() {

    let headers = {
        'Accept': 'application/json',
        'Authorization': token
    }

    let response = await axios.get("http://127.0.0.1:8000/usages/", { headers })

    return response
}

export async function CreditsSummaryApi() {

    let headers = {
        'Accept': 'application/json',
        'Authorization': token
    }

    let response = await axios.get("http://127.0.0.1:8000/credits-smry/", { headers })

    return response
}

export async function RetrivePlanApi() {

    let headers = {
        'Accept': 'application/json',
        'Authorization': token
    }

    let response = await axios.get("http://127.0.0.1:8000/get-plan/", { headers })

    return response
}



