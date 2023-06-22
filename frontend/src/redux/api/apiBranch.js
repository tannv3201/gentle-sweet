import toast from "react-hot-toast";

import {
    getAllBranchFailed,
    getAllBranchStart,
    getAllBranchSuccess,
} from "../slice/branchSlice";
import axios from "axios";

export const getAllBranch = async (dispatch) => {
    dispatch(getAllBranchStart());
    try {
        const res = await axios.get("/v1/branch");
        dispatch(getAllBranchSuccess(res?.data));
        return res?.data;
    } catch (error) {
        dispatch(getAllBranchFailed());
    }
};
