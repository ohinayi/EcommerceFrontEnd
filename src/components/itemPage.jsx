import React from "react";
import { useQuery } from "@tanstack/react-query";
import useApi from "./api";
import "./css/items.css";
import welcome from "./img/hero.svg";
import { useNavigate } from "react-router-dom";

const Items = () => {
    const api = useApi();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["pitem"],
        queryFn: () => api.get("items"),
        refetchOnWindowFocus: false
    });

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) return <div className="error">Error fetching data</div>;

    const items = data.data;
    const handleClick = (id) => {
        navigate(`/item/${id}`);
    }

    return (
        <div className="Iitem-body">
            <div className="Iwelcome-container" >
                <img src={welcome} alt="image" className="Iwelcome" />
            </div>
            <div className="Iitem-card-container">
                {
                    items.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="Icards-holder">
                            <div className="Icards">
                                <img src={item.path} alt={item.name} className="Icard-image" />
                                <div className="Icard-details">
                                    <div className="Iflex">
                                        <p className="Icard-name">{item.name}</p>
                                    </div>
                                        <p className="Icard-size"><span className="Ispan">Size:</span>{item.size}</p>
                                    <div className="Iflex">
                                        <p className="Iitem-cost"><span className="span">Cost:</span>{item.cost}</p>
                                        <button className="Iview" onClick={() => { handleClick(item._id) }}>view</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Items;
// 