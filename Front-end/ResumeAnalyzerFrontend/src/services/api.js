import axios from "axios";
import axiosInstance from "./axiosinstance";

var token = localStorage.getItem('token')

var BASE_URL = 'http://127.0.0.1:8000'

export async function RegiserApi(data) {

    let response = await axiosInstance.post(`/register/`, data)

    return response
}

export async function LoginApi(data) {

    let response = await axiosInstance.post(`/token/`, data)

    return response
}

export async function GetUserApi() {

    let response = await axiosInstance.get(`/Me/`)

    return response
}

export async function RetriveAnalyzeResumeApi(resume_id) {

    let response = await axiosInstance.get(`/resume/${resume_id}/`)

    return response
}

export async function ResumeAnalysesApi() {

    let response = await axiosInstance.get(`/resume-analyzes/`)

    return response
}

export async function GetAllResumeApi() {

    let response = await axiosInstance.get(`/resume-analyze/`)

    return response
}


export async function GetResumesAPi() {

    let response = await axiosInstance.get(`/resume/`)

    return response
}

export async function AnalyzeResumeAPi(id, jobDec) {

    if (!jobDec) {

        alert("Please select job description")

        return
    }

    let response = await axiosInstance.post(`/resume/${id}/analyze/`, { job_description_id: jobDec })

    return response
}

export async function AllAnalyzesApi() {

    let response = await axiosInstance.get(`/resume-analyzes/`)

    return response
}

export async function GetResumeAnalyzeApi(resume_id) {

    let response = await axiosInstance.get(`/resume/${resume_id}/`)


    return response
}

export async function FileUploadAPi(file) {

    let headers = {
        "Content-Type": "multipart/form-data",
        'Authorization' : token
    }

    let response = await axios.post(`${BASE_URL}/resume/`, file, {headers})

    return response

}

export async function SummaryAPi() {

    let response = await axiosInstance.get(`/resume-summary/`)

    return response
}

export async function CreateJobDescriptionApi(data) {

    let response = await axiosInstance.post(`/job-description/`, data)

    return response

}

export async function JobDescriptionlistApi() {

    let response = await axiosInstance.get(`/job-description/`)

    return response
}

export async function GetJobDescriptionApi(desc_id) {

    let response = await axiosInstance.get(`/job-description/${desc_id}/`)

    return response
}

export async function DestroyJobDescriptionAPi(desc_id) {

    let response = await axiosInstance.delete(`/job-description/${desc_id}/`)

    return response

}

export async function SubScriptionApi(price, plan) {

    const response = await axiosInstance.post(`/create-payment/`, { price: price });

    return response
}

// set plan for the particular user.....................
export async function PaymentSucessAPi(plan) {

    const response = await axiosInstance.post(`/setplan/`, { plan: plan });

    return response

}
export async function UpdateSubscriptonAPi() {


    let response = await axiosInstance.patch("/updatesubscription/", {})

    return response
}


export async function ListSubscriptonAPi() {


    let response = await axiosInstance.get("/all-sub/")

    return response
}

export async function UsageListApi() {

    let response = await axiosInstance.get("/usages/")

    return response
}

export async function CreditsSummaryApi() {


    let response = await axiosInstance.get("/credits-smry/")

    return response
}

export async function RetrivePlanApi() {

    let response = await axiosInstance.get("/get-plan/")

    return response
}



