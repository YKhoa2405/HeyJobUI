const JobReducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_JOB_SUCCESS':
            return {
                ...state,
                jobs: state.jobs.filter((job) => job.id !== action.payload),
            };
        case 'ADD_JOB':
            return {
                ...state,
                jobs: [...state.jobs, action.payload],
            };
    }
    return state
}

export default JobReducer