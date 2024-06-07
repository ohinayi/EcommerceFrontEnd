import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "./api";
import "./css/edit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const ModalDiv = ({ modal, setModal, name, setName, cost, setCost, size, setSize, category, setCategory, description, setDescription, image, setImage, handleSubmit }) => {
    return (
        <div className="modal-container">
            <div className="modal-div">
            <FontAwesomeIcon icon={faTimes} size="1x" color="none" onClick={()=>setModal(!modal)} />  
                <form className='edit-form-containers' method="POST" onSubmit={handleSubmit}>
                    <div className='edit-form-elements'>
                        <div className='edit-form-div'>
                            <label htmlFor="name" className='edit-label'>Name</label>
                            <input
                                className="edit-input"
                                type="text"
                                placeholder="Item name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='edit-form-div'>
                            <label className="edit-label" htmlFor="cost">Cost</label>
                            <input
                                className="edit-input"
                                type="text"
                                placeholder="Item cost"
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </div>
                        <div className='edit-form-div'>
                            <label className="edit-label" htmlFor="size">Size</label>
                            <input
                                className="edit-input"
                                type="number"
                                placeholder="Item size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            />
                        </div>
                        <div className='edit-form-div'>
                            <label className="edit-label" htmlFor="category">Type</label>
                            <select
                                className='edit-select'
                                id="type"
                                name="type"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Shirt">Shirt</option>
                                <option value="Trouser">Trouser</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Bag">Bag</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    <label className="edit-label" htmlFor="image">Image</label>
                    <input
                        className="edit-input-file"
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label className="edit-label" htmlFor="description">Description</label>
                    <textarea
                        className="edit-textarea"
                        name="description"
                        id="description"
                        placeholder="Item Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className='edit-button' type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

const EditItems = () => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [size, setSize] = useState('');
    const [category, setCategory] = useState('');
    const [itemId, setItemId] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const api = useApi();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["pitem"],
        queryFn: () => api.get("items"),
        refetchOnWindowFocus: false
    });

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) return <div className="error">Error fetching data</div>;

    const items = data.data;
    const handleClick = (item) => {
        setName(item.name);
        setCost(item.cost);
        setCategory(item.category);
        setDescription(item.description);
        setSize(item.size);
        setItemId(item._id);
        setModal(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (name !== "") {
            formData.append('name', name);
        }
        if (size !== "") {
            formData.append('size', size);
        }
        if (cost !== "") {
            formData.append('cost', cost);
        }
        if (category !== "") {
            formData.append('category', category);
        }
        if (description !== "") {
            formData.append('description', description);
        }
        if (image !== null) {
            formData.append('image', image);
        }
        try {
            await api.put(`items/${itemId}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            window.alert('Successfully Edited');
            setName('');
            setCategory('');
            setCost('');
            setImage(null);
            setSize('');
            setDescription('');
            setModal(false);
            queryClient.invalidateQueries(["pitem"]); // Invalidate and refetch
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="item-body">
            <div className="item-card-container">
                {modal && (
                    <ModalDiv
                        name={name}
                        setName={setName}
                        cost={cost}
                        setCost={setCost}
                        size={size}
                        setSize={setSize}
                        category={category}
                        setCategory={setCategory}
                        description={description}
                        setDescription={setDescription}
                        image={image}
                        setImage={setImage}
                        handleSubmit={handleSubmit}
                        modal={modal}
                        setModal={setModal}
                    />
                )}
                {
                    items.map((item, index) => (
                        <div key={`${item.id}-${index}`} className="cards-holder">
                            <div className="cards">
                                <img src={item.path} alt={item.name} className="card-image" />
                                <div className="card-details">
                                    <div className="flex">
                                        <p className="card-name">{item.name}</p>
                                    </div>
                                    <p className="card-size"><span className="span">Size:</span>{item.size}</p>
                                    <div className="flex">
                                        <p className="item-cost"><span className="span">Cost:</span>{item.cost}</p>
                                        <button className="view" onClick={() => { handleClick(item) }}>Edit Details</button>
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

export default EditItems;
