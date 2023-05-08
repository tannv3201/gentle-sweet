import { makeAutoObservable } from "mobx";

import { getAllUsers } from "./AdminUserService";

export default class AdminUserStore {
    adminUserList = [];

    constructor() {
        makeAutoObservable(this);
    }

    getAllUser = async () => {
        try {
            let data = await getAllUsers();
            this.adminUserList = data.data.content;
            console.log(data);
        } catch (error) {}
    };
}
