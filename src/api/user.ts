import api from "./";


interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

interface UserRespond {
    error: boolean;
    data: User;
}

export const findAdmin = (id: string) => {
    const params = {
        _admin_fields: `${["username", "name", "active"]}`,
        name: 'nhan',
        age: '18'
    };
    return api
        .get(`/admin/${id}`, params)
        .then((res: any) => {
            return {
                error: res.error,
                data: res.data
            }
        })
        .catch(() => ({ error: true }));
};

// export const updateAdmin = (id, data) => {
//     return api
//         .put(`/admin/${id}`, data)
//         .then(({ status, message }) => ({ status, message }))
//         .catch(() => ({ status: false }));
// };

// export const createAdmin = (data) => {
//     return api
//         .post("/admin", data)
//         .then(({ status, message }) => ({ status, message }))
//         .catch(() => ({ status: false }));
// };

// export const deleteAdmin = (id) => {
//     return api
//         .delete(`/admin/${id}`)
//         .then(({ status, message }) => ({ status, message }))
//         .catch(() => ({ status: false }));
// };

// export const changePasswordAdmin = (id, data) => {
//     return api
//         .post("/admin/change_password", data)
//         .then(({ status, message }) => ({ status, message }))
//         .catch(() => ({ status: false }));
// };
