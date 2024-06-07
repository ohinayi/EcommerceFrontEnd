import React from "react";
import { useQuery } from "@tanstack/react-query";
import useApi from "./api";
import "./css/bought.css";

const Users = () => {
    const api = useApi();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["users"],
        queryFn: async () => await api.get("users"),
        refetchOnWindowFocus: false
    });

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) return <div className="error">Error fetching data</div>;

    const users = data.data;
    console.log(users);

    return (
        <div className="item-body">
            <table className="items-table">
            <caption><h1>Users</h1></caption> 
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Admin': 'User'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
}

export default Users;
