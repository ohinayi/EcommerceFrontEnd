import { useState, useRef } from 'react';
import './css/addItem.css';
import useApi from './api';

const AddItem = () => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [size, setSize] = useState('');
    const [category, setCategory] = useState('Shirt');
    const [image, setImage] = useState(null); // Change to null
    const [description, setDescription] = useState('');
    const imageInputRef = useRef(null); // Create a ref for the image input
    const api = useApi();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        formData.append('name', name);
        formData.append('cost', cost);
        formData.append('size', size);
        formData.append('category', category);
        formData.append('description', description);
        try {
            await api.post('items/create', formData, 
            {headers:{'Content-Type':'multipart/form-data'}
        });
        window.alert('Successfully uploaded');
        setName('');
        setCategory('Shirt');
        setCost('');
        setImage(null); // Reset the image state
        setSize('');
        setDescription('');
        imageInputRef.current.value = ''; // Clear the image input field
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-containers'>
                <div className='form-elements'>
                    <div className='form-div'>
                        <label htmlFor="name" className='label'>Name</label>
                        <input className="input" type="text" placeholder="Item name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='form-div'>
                        <label className="label" htmlFor="cost">Cost</label>
                        <input className="input" type="text" placeholder="Item cost" value={cost} onChange={(e) => setCost(e.target.value)} />
                    </div>
                    <div className='form-div'>
                        <label className="label" htmlFor="size">Size</label>
                        <input className="input" type="number" placeholder="Item size" value={size} onChange={(e) => setSize(e.target.value)} />
                    </div>
                    <div className='form-div'>
                        <label className="label" htmlFor="name">Type</label>
                        <select className='select' id="type" name="type" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="Shirt">Shirt</option>
                            <option value="Trouser">Trouser</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Bag">Bag</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>
                <label className="label" htmlFor="image">Image</label>
                <input className="input" type="file" ref={imageInputRef} onChange={(e) => setImage(e.target.files[0])} />
                <label className="label" htmlFor="description">Description</label>
                <textarea className="textarea" name="description" id="description" placeholder="Item Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button className='button' type="submit">Submit</button>
            </form>
        </div>
    )
}
export default AddItem;
