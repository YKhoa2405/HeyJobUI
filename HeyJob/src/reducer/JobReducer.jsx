const initialState = {
    jobs: [],
    loading: true,
    error: null,
};


const JobReducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_JOB_SUCCESS':
            // Sử dụng filter để loại bỏ job với id khớp
            return {
                ...state,
                jobs: state.jobs.filter((job) => job.id !== action.payload),
            };
        case 'UPDATE_ACTIVE_JOBS':
            return {
                ...state,
                jobs: state.jobs.map((job) =>
                    job.id === action.payload ? { ...job, is_active: false } : job
                ),
            };
        case 'UNSAVE_JOB_SUCCESS':
            return {
                ...state,
                jobs: state.jobs.filter((job) => job.job.id !== action.payload),
            };
        case 'SAVE_JOB_SUCCESS':
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
            };
        case 'FETCH_JOBS_SUCCESS':
            return {
                ...state,
                jobs: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};



export { initialState }
export default JobReducer