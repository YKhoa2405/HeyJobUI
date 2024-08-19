import axios from "axios";

const HOST = "https:/ykhoa123.pythonanywhere.com"

export const endpoints = {

    'getAllProvinces': 'https://thongtindoanhnghiep.co/api/city',
    // user
    'users': '/users/',
    'login': '/o/token/',
    'current_user': '/users/current_user/',
    'update_seeker': '/users/update_seeker/',
    'update_employer': '/users/update_employer/',

    //job
    'jobs': '/jobs/',
    'jobs_detail': (jobId) => `/jobs/${jobId}/`,
    'job_employer': '/jobs/employer_jobs/',
    'job_seeker': '/jobs/employer_job_seeker/',

    // save job
    'save_job': '/save_job/',
    'unsave_job': (jobId) => `/save_job/${jobId}/`,



    // technology
    'technology': '/technology/',

    // aplly
    'apply_list': '/apply/employer_apply/',
    // Lấy tỉnh thành
    'province': 'https://esgoo.net/api-tinhthanh/1/0.htm'

}

export const authApi = (accessToken) => {
    return axios.create({
        baseURL: HOST,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
}

export default axios.create({
    baseURL: HOST
})
