import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useApi from "./api";



const SingleItem = () => {
    const api = useApi();
    const { id } = useParams();

    const handleClick = async (item) => {
        try {
            const response = await api.post(`items/purchase/${item._id}`);
            window.alert('Item Was Purchased Succesfully');
            
        } catch (error) {
            console.log(error);
            window.alert('Error While Purchasing Item');
           window.location.href('/items')
        }
    }

    const { isLoading, isError, data } = useQuery({
        queryKey: ["S-item", id],
        queryFn: () => api.get(`items/${id}`),
        refetchOnWindowFocus: false
    });

    if (isLoading) return <div className="loading">Loading...</div>;

    if (isError) return <div className="error">Error fetching data</div>;

    const item = data.data;
    return (
        <div className="item-card-container">
            {
                <div key={`${item.id}`} className="cards-holder">
                <div className="cards">
                    <img src={item.path} alt={item.name} className="card-image" />
                    <div className="card-details">
                        <div className="flex">
                            <p className="card-name">{item.name}</p>
                        </div>
                            <p className="card-size"><span className="span">Size:</span>{item.size}</p>
                        <div className="flex">
                            <p className="item-cost"><span className="span">Cost:</span>{item.cost}</p>
                            <button className="view" onClick={() => { handleClick(item) }}>purchase</button>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default SingleItem;
