import React from "react";
import { useQuery } from "@tanstack/react-query";
import useApi from "./api";
import "./css/bought.css";

const BoughtItems = () => {
    const api = useApi();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["purchased"],
        queryFn: async () => await api.get("items/purchasedList"),
        refetchOnWindowFocus: false
    });

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) return <div className="error">Error fetching data</div>;

    const items = data.data;

    return (
        <div className="item-body">
            <table className="items-table">
            <caption><h1>Purchased Products</h1></caption> 
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>image</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.item.name}</td>
                            <td>{item.item.createdAt}</td>
                            <td><img src={item.item.path} alt={item.item.name}  className="table-image"/></td>
                            <td>{item.item.category}</td>
                            <td>{item.item.size}</td>
                            <td>{item.item.cost}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
    );
}

export default BoughtItems;
