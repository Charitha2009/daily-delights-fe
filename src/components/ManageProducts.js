// src/components/ManageProducts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/ManageProducts.css';
import DashboardNavbar from './DashboardNavbar';
import ProductCard from './ProductCard';

const ManageProducts = () => {
    const [selectedTab, setSelectedTab] = useState('Fruits');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fruitDetails, setFruitDetails] = useState({ name: '', description: '', image: null, price: '', unit: '', count: '' });
    const [isEditMode, setIsEditMode] = useState(false);

    const handleFruitInputChange = (e) => {
        const { name, value } = e.target;
        setFruitDetails({ ...fruitDetails, [name]: value });
    };

    const handleFruitImageChange = (e) => {
        setFruitDetails({ ...fruitDetails, image: e.target.files[0] });
    }; 

    const handleAddFruit = async (e) => {
        console.log("start add fruit");
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', fruitDetails.name);
        formData.append('description', fruitDetails.description);
        formData.append('price', fruitDetails.price);
        formData.append('unit', fruitDetails.unit);
        formData.append('count', fruitDetails.count);
        if (fruitDetails.image) {
        formData.append('image', fruitDetails.image);
        }
        console.log("form add fruit");

        try {
        await axios.post('http://localhost:4000/api/fruits', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        console.log("backend add fruit");

        //   fetchCategories();
        setIsModalOpen(false);
        setFruitDetails({ name: '', description: '', image: null, price: '', unit: '', count: '' });
        fetchFruits();
        } catch (error) {
        console.error('Error adding fruit:', error);
        }
    };

    const [fruits, setFruits] = useState([]);

    useEffect(() => {
        fetchFruits();
    }, []);

    const fetchFruits = async () => {
        try {
            console.log("fetchFruits");
        const response = await axios.get('http://localhost:4000/api/fruits');
        setFruits(response.data);
        console.log(fruits);
        } catch (error) {
        console.error('Error fetching fruits:', error);
        }
    };


    const [editFruitDetails, setEditFruitDetails] = useState({});

        const handleEditFruitInputChange = (e) => {
        const { name, value } = e.target;
        setEditFruitDetails({ ...editFruitDetails, [name]: value });
        };

        const handleEditFruitImageChange = (e) => {
        setEditFruitDetails({ ...editFruitDetails, image: e.target.files[0] });
        };

        const handleEditFruitSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editFruitDetails.name);
        formData.append('description', editFruitDetails.description);
        formData.append('price', editFruitDetails.price);
        formData.append('unit', editFruitDetails.unit);
        formData.append('count', editFruitDetails.count);
        if (editFruitDetails.image) {
            formData.append('image', editFruitDetails.image);
        }

        try {
            await axios.put(`http://localhost:4000/api/fruits/${editFruitDetails._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('Fruit updated successfully.');
            // Update local state or fetch updated list
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditFruitDetails({});
            fetchFruits();
        } catch (error) {
            console.error('Error updating fruit:', error);
        }
        };

  // Vegetable logic starts
    const [vegetableDetails, setVegetableDetails] = useState({ name: '', description: '', image: null, price: '', unit: '', count: '' });

    const handleVegetableInputChange = (e) => {
    const { name, value } = e.target;
    setVegetableDetails({ ...vegetableDetails, [name]: value });
    };

    const handleVegetableImageChange = (e) => {
    setVegetableDetails({ ...vegetableDetails, image: e.target.files[0] });
    };

    const handleAddVegetable = async (e) => {
    console.log("start add vegetable");
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', vegetableDetails.name);
    formData.append('description', vegetableDetails.description);
    formData.append('price', vegetableDetails.price);
    formData.append('unit', vegetableDetails.unit);
    formData.append('count', vegetableDetails.count);
    if (vegetableDetails.image) {
        formData.append('image', vegetableDetails.image);
    }
    console.log("form add vegetable");

    try {
        await axios.post('http://localhost:4000/api/vegetables', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log("backend add vegetable");

        setIsModalOpen(false);
        setVegetableDetails({ name: '', description: '', image: null, price: '', unit: '', count: '' });
        fetchVegetables();
    } catch (error) {
        console.error('Error adding vegetable:', error);
    }
    };
    const [vegetables, setVegetables] = useState([]);

    useEffect(() => {
    fetchVegetables();
    }, []);

    const fetchVegetables = async () => {
    try {
        console.log("fetchVegetables");
            const response = await axios.get('http://localhost:4000/api/vegetables');
            setVegetables(response.data);
            console.log(vegetables);
        } catch (error) {
            console.error('Error fetching vegetables:', error);
        }
        };

    const [editVegetableDetails, setEditVegetableDetails] = useState({});

    const handleEditVegetableInputChange = (e) => {
        const { name, value } = e.target;
        setEditVegetableDetails({ ...editVegetableDetails, [name]: value });
        };

    const handleEditVegetableImageChange = (e) => {
        setEditVegetableDetails({ ...editVegetableDetails, image: e.target.files[0] });
        };

    const handleEditVegetableSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editVegetableDetails.name);
        formData.append('description', editVegetableDetails.description);
        formData.append('price', editVegetableDetails.price);
        formData.append('unit', editVegetableDetails.unit);
        formData.append('count', editVegetableDetails.count);
        if (editVegetableDetails.image) {
            formData.append('image', editVegetableDetails.image);
        }

        try {
            await axios.put(`http://localhost:4000/api/vegetables/${editVegetableDetails._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('Vegetable updated successfully.');
            // Update local state or fetch updated list
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditVegetableDetails({});
            fetchVegetables();
        } catch (error) {
            console.error('Error updating vegetable:', error);
        }
        };

    // Snack logic starts

    const [snackDetails, setSnackDetails] = useState({ name: '', description: '', image: null, price: '', unit: '', count: '' });

    const handleSnackInputChange = (e) => {
    const { name, value } = e.target;
    setSnackDetails({ ...snackDetails, [name]: value });
    };

    const handleSnackImageChange = (e) => {
    setSnackDetails({ ...snackDetails, image: e.target.files[0] });
    };

    const handleAddSnack = async (e) => {
    console.log("start add snack");
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', snackDetails.name);
    formData.append('description', snackDetails.description);
    formData.append('price', snackDetails.price);
    formData.append('unit', snackDetails.unit);
    formData.append('count', snackDetails.count);
    if (snackDetails.image) {
        formData.append('image', snackDetails.image);
    }
    console.log("form add snack");

    try {
        await axios.post('http://localhost:4000/api/snacks', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log("backend add snack");

        setIsModalOpen(false);
        setSnackDetails({ name: '', description: '', image: null, price: '', unit: '', count: '' });
        fetchSnacks();
    } catch (error) {
        console.error('Error adding snack:', error);
    }
    };
    const [snacks, setSnacks] = useState([]);

    useEffect(() => {
    fetchSnacks();
    }, []);

    const fetchSnacks = async () => {
    try {
        console.log("fetchSnacks");
            const response = await axios.get('http://localhost:4000/api/snacks');
            setSnacks(response.data);
            console.log(snacks);
        } catch (error) {
            console.error('Error fetching snacks:', error);
        }
        };


    const [editSnackDetails, setEditSnackDetails] = useState({});

    const handleEditSnackInputChange = (e) => {
        const { name, value } = e.target;
        setEditSnackDetails({ ...editSnackDetails, [name]: value });
        };

    const handleEditSnackImageChange = (e) => {
        setEditSnackDetails({ ...editSnackDetails, image: e.target.files[0] });
        };

    const handleEditSnackSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editSnackDetails.name);
        formData.append('description', editSnackDetails.description);
        formData.append('price', editSnackDetails.price);
        formData.append('unit', editSnackDetails.unit);
        formData.append('count', editSnackDetails.count);
        if (editSnackDetails.image) {
            formData.append('image', editSnackDetails.image);
        }

        try {
            await axios.put(`http://localhost:4000/api/snacks/${editSnackDetails._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('Snack updated successfully.');
            // Update local state or fetch updated list
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditSnackDetails({});
            fetchSnacks();
        } catch (error) {
            console.error('Error updating snack:', error);
        }
        };


    // Meat logic starts

    const [meatDetails, setMeatDetails] = useState({ name: '', description: '', image: null, price: '', unit: '', count: '' });

    const handleMeatInputChange = (e) => {
    const { name, value } = e.target;
    setMeatDetails({ ...meatDetails, [name]: value });
    };

    const handleMeatImageChange = (e) => {
    setMeatDetails({ ...meatDetails, image: e.target.files[0] });
    };

    const handleAddMeat = async (e) => {
    console.log("start add meat");
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', meatDetails.name);
    formData.append('description', meatDetails.description);
    formData.append('price', meatDetails.price);
    formData.append('unit', meatDetails.unit);
    formData.append('count', meatDetails.count);
    if (meatDetails.image) {
        formData.append('image', meatDetails.image);
    }
    console.log("form add meat");

    try {
        await axios.post('http://localhost:4000/api/meats', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log("backend add meat");

        setIsModalOpen(false);
        setMeatDetails({ name: '', description: '', image: null, price: '', unit: '', count: '' });
        fetchMeats();
    } catch (error) {
        console.error('Error adding meat:', error);
    }
    };
    const [meats, setMeats] = useState([]);

    useEffect(() => {
    fetchMeats();
    }, []);

    const fetchMeats = async () => {
    try {
        console.log("fetchMeats");
            const response = await axios.get('http://localhost:4000/api/meats');
            setMeats(response.data);
            console.log(meats);
        } catch (error) {
            console.error('Error fetching meats:', error);
        }
        };

        const [editMeatDetails, setEditMeatDetails] = useState({});

        const handleEditMeatInputChange = (e) => {
        const { name, value } = e.target;
        setEditFruitDetails({ ...editFruitDetails, [name]: value });
        };

        const handleEditMeatImageChange = (e) => {
        setEditFruitDetails({ ...editFruitDetails, image: e.target.files[0] });
        };

        const handleEditMeatSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editMeatDetails.name);
        formData.append('description', editMeatDetails.description);
        formData.append('price', editMeatDetails.price);
        formData.append('unit', editMeatDetails.unit);
        formData.append('count', editMeatDetails.count);
        if (editMeatDetails.image) {
            formData.append('image', editMeatDetails.image);
        }

        try {
            await axios.put(`http://localhost:4000/api/meats/${editMeatDetails._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('Meat updated successfully.');
            // Update local state or fetch updated list
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditMeatDetails({});
            fetchMeats();
        } catch (error) {
            console.error('Error updating meat:', error);
        }
        };
    // Nuts logic starts

    const [nutDetails, setNutDetails] = useState({ name: '', description: '', image: null, price: '', unit: '', count: '' });

    const handleNutInputChange = (e) => {
    const { name, value } = e.target;
    setNutDetails({ ...nutDetails, [name]: value });
    };

    const handleNutImageChange = (e) => {
    setNutDetails({ ...nutDetails, image: e.target.files[0] });
    };

    const handleAddNut = async (e) => {
    console.log("start add nut");
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', nutDetails.name);
    formData.append('description', nutDetails.description);
    formData.append('price', nutDetails.price);
    formData.append('unit', nutDetails.unit);
    formData.append('count', nutDetails.count);
    if (nutDetails.image) {
        formData.append('image', nutDetails.image);
    }
    console.log("form add nutDetails");

    try {
        await axios.post('http://localhost:4000/api/nuts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log("backend add nut");

        setIsModalOpen(false);
        setNutDetails({ name: '', description: '', image: null, price: '', unit: '', count: '' });
        fetchNuts();
    } catch (error) {
        console.error('Error adding nut:', error);
    }
    };
    const [nuts, setNuts] = useState([]);

    useEffect(() => {
    fetchNuts();
    }, []);

    const fetchNuts = async () => {
    try {
        console.log("fetchNuts");
            const response = await axios.get('http://localhost:4000/api/nuts');
            setNuts(response.data);
            console.log(nuts);
        } catch (error) {
            console.error('Error fetching nuts:', error);
        }
        };

    const [editNutDetails, setEditNutDetails] = useState({});

    const handleEditNutInputChange = (e) => {
        const { name, value } = e.target;
        setEditNutDetails({ ...editNutDetails, [name]: value });
        };

    const handleEditNutImageChange = (e) => {
        setEditNutDetails({ ...editNutDetails, image: e.target.files[0] });
        };

    const handleEditNutSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editNutDetails.name);
        formData.append('description', editNutDetails.description);
        formData.append('price', editNutDetails.price);
        formData.append('unit', editNutDetails.unit);
        formData.append('count', editNutDetails.count);
        if (editNutDetails.image) {
            formData.append('image', editNutDetails.image);
        }

        try {
            await axios.put(`http://localhost:4000/api/nuts/${editNutDetails._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('Nut updated successfully.');
            // Update local state or fetch updated list
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditNutDetails({});
            fetchNuts();
        } catch (error) {
            console.error('Error updating nut:', error);
        }
        };

    // Dairy logic starts

    const [dairyProductDetails, setDairyProductDetails] = useState({ name: '', description: '', image: null, price: '', unit: '', count: '' });

    const handleDairyProductInputChange = (e) => {
    const { name, value } = e.target;
    setDairyProductDetails({ ...dairyProductDetails, [name]: value });
    };

    const handleDairyProductImageChange = (e) => {
    setDairyProductDetails({ ...dairyProductDetails, image: e.target.files[0] });
    };

    const handleAddDairyProduct= async (e) => {
    console.log("start add dairy product");
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', dairyProductDetails.name);
    formData.append('description', dairyProductDetails.description);
    formData.append('price', dairyProductDetails.price);
    formData.append('unit', dairyProductDetails.unit);
    formData.append('count', dairyProductDetails.count);
    if (dairyProductDetails.image) {
        formData.append('image', dairyProductDetails.image);
    }
    console.log("form add dairyProductDetails");

    try {
        await axios.post('http://localhost:4000/api/dairyProducts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log("backend add dairy product");

        setIsModalOpen(false);
        setDairyProductDetails({ name: '', description: '', image: null, price: '', unit: '', count: '' });
        fetchDairyProducts();
    } catch (error) {
        console.error('Error adding dairy product:', error);
    }
    };
    const [dairyProducts, setDairyProducts] = useState([]);

    useEffect(() => {
    fetchDairyProducts();
    }, []);

    const fetchDairyProducts = async () => {
    try {
        console.log("fetchDairyProducts");
            const response = await axios.get('http://localhost:4000/api/dairyProducts');
            setDairyProducts(response.data);
            console.log(dairyProducts);
        } catch (error) {
            console.error('Error fetching dairy products:', error);
        }
        };

    const [editDairyProductDetails, setEditDairyProductDetails] = useState({});

        const handleEditDairyProductInputChange = (e) => {
        const { name, value } = e.target;
        setEditDairyProductDetails({ ...editDairyProductDetails, [name]: value });
        };

        const handleEditDairyProductImageChange = (e) => {
        setEditDairyProductDetails({ ...editDairyProductDetails, image: e.target.files[0] });
        };

        const handleEditDairyProductSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editDairyProductDetails.name);
        formData.append('description', editDairyProductDetails.description);
        formData.append('price', editDairyProductDetails.price);
        formData.append('unit', editDairyProductDetails.unit);
        formData.append('count', editDairyProductDetails.count);
        if (editDairyProductDetails.image) {
            formData.append('image', editDairyProductDetails.image);
        }

        try {
            await axios.put(`http://localhost:4000/api/dairyProducts/${editDairyProductDetails._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('DairyProduct updated successfully.');
            // Update local state or fetch updated list
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditDairyProductDetails({});
            fetchDairyProducts();
        } catch (error) {
            console.error('Error updating dairy product:', error);
        }
        };

    // Pulse logic starts

    const [pulseDetails, setPulseDetails] = useState({ name: '', description: '', image: null, price: '', unit: '', count: '' });

    const handlePulseInputChange = (e) => {
    const { name, value } = e.target;
    setPulseDetails({ ...pulseDetails, [name]: value });
    };

    const handlePulseImageChange = (e) => {
    setPulseDetails({ ...pulseDetails, image: e.target.files[0] });
    };

    const handleAddPulse= async (e) => {
    console.log("start add dairy product");
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', pulseDetails.name);
    formData.append('description', pulseDetails.description);
    formData.append('price', pulseDetails.price);
    formData.append('unit', pulseDetails.unit);
    formData.append('count', pulseDetails.count);
    if (pulseDetails.image) {
        formData.append('image', pulseDetails.image);
    }
    console.log("form add pulseDetails");

    try {
        await axios.post('http://localhost:4000/api/pulses', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });
        console.log("backend add dairy product");

        setIsModalOpen(false);
        setPulseDetails({ name: '', description: '', image: null, price: '', unit: '', count: '' });
        fetchPulses();
    } catch (error) {
        console.error('Error adding dairy product:', error);
    }
    };
    const [pulses, setPulses] = useState([]);

    useEffect(() => {
    fetchPulses();
    }, []);

    const fetchPulses = async () => {
    try {
        console.log("fetchPulses");
            const response = await axios.get('http://localhost:4000/api/pulses');
            setPulses(response.data);
            console.log(pulses);
        } catch (error) {
            console.error('Error fetching pulses:', error);
        }
        };

    const [editPulseDetails, setEditPulseDetails] = useState({});

    const handleEditPulseInputChange = (e) => {
        const { name, value } = e.target;
        setEditPulseDetails({ ...editPulseDetails, [name]: value });
        };

    const handleEditPulseImageChange = (e) => {
        setEditPulseDetails({ ...editPulseDetails, image: e.target.files[0] });
        };

    const handleEditPulseSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editPulseDetails.name);
        formData.append('description', editPulseDetails.description);
        formData.append('price', editPulseDetails.price);
        formData.append('unit', editPulseDetails.unit);
        formData.append('count', editPulseDetails.count);
        if (editPulseDetails.image) {
            formData.append('image', editPulseDetails.image);
        }

        try {
            await axios.put(`http://localhost:4000/api/pulses/${editPulseDetails._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
            console.log('Pulse updated successfully.');
            // Update local state or fetch updated list
            setIsModalOpen(false);
            setIsEditMode(false);
            setEditPulseDetails({});
            fetchPulses();
        } catch (error) {
            console.error('Error updating pulse:', error);
        }
        };


    const getProductList = () => {
            switch (selectedTab) {
              case 'Fruits':
                return { products: fruits, type: 'fruits' };
              case 'Vegetables':
                return { products: vegetables, type: 'vegetables' };
              case 'Snacks':
                return { products: snacks, type: 'snacks' };
              case 'Dairy':
                return { products: dairyProducts, type: 'dairyProducts' };
              case 'Pulses':
                return { products: pulses, type: 'pulses' };
              case 'Meat':
                return { products: meats, type: 'meats' };
              case 'Nuts':
                return { products: nuts, type: 'nuts' };
              default:
                return { products: [], type: '' };
            }
          };
          
    const { products, type } = getProductList();
          

    const buttonLabels = {
            Fruits: 'Add Fruit',
            Vegetables: 'Add Vegetable',
            Snacks: 'Add Snack',
            Meat: 'Add Meat',
            Nuts: 'Add Nut',
            Dairy: 'Add Dairy Product',
            Pulses: 'Add Pulse'
          };

    const onEdit = (product, type) => {
            console.log(product);
            console.log(type);
            switch (type) {
            case 'fruits':
                setEditFruitDetails({
                    ...product,
                    imageUrl: product.image, // Store the current image URL
                });
            case 'vegetables':
                setEditVegetableDetails({
                    ...product,
                    imageUrl: product.image, // Store the current image URL
                });
            case 'snacks':
                setEditSnackDetails({
                    ...product,
                    imageUrl: product.image,
                });
            case 'pulses':
                setEditPulseDetails({
                    ...product,
                    imageUrl: product.image,
                });
            case 'meats':
                setEditMeatDetails({
                    ...product,
                    imageUrl: product.image,
                });
            case 'nuts':
                setEditNutDetails({
                    ...product,
                    imageUrl: product.image,
                });
            case 'dairyProducts':
                setEditDairyProductDetails({
                    ...product,
                    imageUrl: product.image,
                });
            default:
                {}
            }

            setIsEditMode(true);
            setIsModalOpen(true);
        };
        
    const onDelete = async (productId, type) => {
            try {
              const response = await axios.delete(`http://localhost:4000/api/${type}/${productId}`);
              if (response.status === 200) {
                console.log(`${type} deleted successfully.`);
                // Refresh the product list or remove the item from state
              }
              switch (type) {
                case 'fruits':
                    fetchFruits();
                case 'vegetables':
                    fetchVegetables();
                case 'snacks':
                    fetchSnacks();
                case 'pulses':
                    fetchPulses();
                case 'meats':
                    fetchMeats();
                case 'nuts':
                    fetchNuts();
                case 'dairyProducts':
                    fetchDairyProducts();
              }
            } catch (error) {
              console.error(`Error deleting ${type}:`, error);
            }
          };
        
  return (
    <div>
      <DashboardNavbar />
      <div className='manage-products-container'>
        <h2>Manage Products</h2>

        {/* Tabs */}
        <div className='tabs'>
          {['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Snacks', 'Pulses', 'Nuts'].map(tab => (
            <button
              key={tab}
              className={selectedTab === tab ? 'active' : ''}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {buttonLabels[selectedTab] && (
            <button className='add-product-button' onClick={() => setIsModalOpen(true)}>
                {buttonLabels[selectedTab]}
            </button>
            )}

        <div className='product-list'>
            {products.map(product => (
                <ProductCard key={product._id} product={product} type={type} onEdit={onEdit} onDelete={onDelete}/>
            ))}
            </div>

      </div>

    {isModalOpen && (
    <div className='modal'>
        <div className='modal-content'>
        <span className='close' onClick={() => {
            setIsModalOpen(false); 
            setEditFruitDetails({}); 
            setEditVegetableDetails({}); 
            setEditSnackDetails({});
            setEditPulseDetails({});
            setEditMeatDetails({});
            setEditNutDetails({});
            setEditDairyProductDetails({});
            setIsEditMode(false);
            }}>&times;</span>
        <h2>{isEditMode ? `Edit ${selectedTab}` : `Add ${selectedTab}`}</h2>
        
        {/* fruit form */}
        {selectedTab === 'Fruits' && (
            <form onSubmit={isEditMode ? handleEditFruitSubmit : handleAddFruit} className='product-form'>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Fruit Name'
                                    value={isEditMode ? editFruitDetails.name : fruitDetails.name}
                                    onChange={isEditMode ? handleEditFruitInputChange : handleFruitInputChange}
                                    required
                                />
                                <textarea
                                    name='description'
                                    placeholder='Fruit Description'
                                    value={isEditMode ? editFruitDetails.description : fruitDetails.description}
                                    onChange={isEditMode ? handleEditFruitInputChange : handleFruitInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='price'
                                    placeholder='Fruit Price'
                                    value={isEditMode ? editFruitDetails.price : fruitDetails.price}
                                    onChange={isEditMode ? handleEditFruitInputChange : handleFruitInputChange}
                                    required
                                />
                                <input
                                    type='text'
                                    name='unit'
                                    placeholder='Fruit Unit'
                                    value={isEditMode ? editFruitDetails.unit : fruitDetails.unit}
                                    onChange={isEditMode ? handleEditFruitInputChange : handleFruitInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='count'
                                    placeholder='Fruit Count'
                                    value={isEditMode ? editFruitDetails.count : fruitDetails.count}
                                    onChange={isEditMode ? handleEditFruitInputChange : handleFruitInputChange}
                                    required
                                />
                                <input type='file' name='image' onChange={isEditMode ? handleEditFruitImageChange : handleFruitImageChange} />
                                <button className='add-product-button' type='submit'>{isEditMode ? 'Update Fruit' : 'Add Fruit'}</button>
                            </form>
        )}
        
        {/* vegetable form */}
        {selectedTab === 'Vegetables' && (
            <form onSubmit={isEditMode ? handleEditVegetableSubmit : handleAddVegetable} className='product-form'>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Vegetable Name'
                                    value={isEditMode ? editVegetableDetails.name : vegetableDetails.name}
                                    onChange={isEditMode ? handleEditVegetableInputChange : handleVegetableInputChange}
                                    required
                                />
                                <textarea
                                    name='description'
                                    placeholder='Vegetable Description'
                                    value={isEditMode ? editVegetableDetails.description : vegetableDetails.description}
                                    onChange={isEditMode ? handleEditVegetableInputChange : handleVegetableInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='price'
                                    placeholder='Vegetable Price'
                                    value={isEditMode ? editVegetableDetails.price : vegetableDetails.price}
                                    onChange={isEditMode ? handleEditVegetableInputChange : handleVegetableInputChange}
                                    required
                                />
                                <input
                                    type='text'
                                    name='unit'
                                    placeholder='Vegetable Unit'
                                    value={isEditMode ? editVegetableDetails.unit : vegetableDetails.unit}
                                    onChange={isEditMode ? handleEditVegetableInputChange : handleVegetableInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='count'
                                    placeholder='Vegetable Count'
                                    value={isEditMode ? editVegetableDetails.count : vegetableDetails.count}
                                    onChange={isEditMode ? handleEditVegetableInputChange : handleVegetableInputChange}
                                    required
                                />
                                <input type='file' name='image' onChange={isEditMode ? handleEditVegetableImageChange : handleVegetableImageChange} />
                                <button className='add-product-button' type='submit'>{isEditMode ? 'Update Vegetable' : 'Add Vegetable'}</button>
                            </form>
        )}
        
        {/* snack form */}
        {selectedTab === 'Snacks' && (
            <form onSubmit={isEditMode ? handleEditSnackSubmit : handleAddSnack} className='product-form'>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Snack Name'
                                    value={isEditMode ? editSnackDetails.name : snackDetails.name}
                                    onChange={isEditMode ? handleEditSnackInputChange : handleSnackInputChange}
                                    required
                                />
                                <textarea
                                    name='description'
                                    placeholder='Snack Description'
                                    value={isEditMode ? editSnackDetails.description : snackDetails.description}
                                    onChange={isEditMode ? handleEditSnackInputChange : handleSnackInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='price'
                                    placeholder='Snack Price'
                                    value={isEditMode ? editSnackDetails.price : snackDetails.price}
                                    onChange={isEditMode ? handleEditSnackInputChange : handleSnackInputChange}
                                    required
                                />
                                <input
                                    type='text'
                                    name='unit'
                                    placeholder='Snack Unit'
                                    value={isEditMode ? editSnackDetails.unit : snackDetails.unit}
                                    onChange={isEditMode ? handleEditSnackInputChange : handleSnackInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='count'
                                    placeholder='Snack Count'
                                    value={isEditMode ? editSnackDetails.count : snackDetails.count}
                                    onChange={isEditMode ? handleEditSnackInputChange : handleSnackInputChange}
                                    required
                                />
                                <input type='file' name='image' onChange={isEditMode ? handleEditSnackImageChange : handleSnackImageChange} />
                                <button className='add-product-button' type='submit'>{isEditMode ? 'Update Snack' : 'Add Snack'}</button>
                            </form>
        )}

        {/* meat form */}
        {selectedTab === 'Meat' && (
            <form onSubmit={isEditMode ? handleEditMeatSubmit : handleAddMeat} className='product-form'>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Meat Name'
                                    value={isEditMode ? editMeatDetails.name : meatDetails.name}
                                    onChange={isEditMode ? handleEditMeatInputChange : handleMeatInputChange}
                                    required
                                />
                                <textarea
                                    name='description'
                                    placeholder='Meat Description'
                                    value={isEditMode ? editMeatDetails.description : meatDetails.description}
                                    onChange={isEditMode ? handleEditMeatInputChange : handleMeatInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='price'
                                    placeholder='Meat Price'
                                    value={isEditMode ? editMeatDetails.price : meatDetails.price}
                                    onChange={isEditMode ? handleEditMeatInputChange : handleMeatInputChange}
                                    required
                                />
                                <input
                                    type='text'
                                    name='unit'
                                    placeholder='Meat Unit'
                                    value={isEditMode ? editMeatDetails.unit : meatDetails.unit}
                                    onChange={isEditMode ? handleEditMeatInputChange : handleMeatInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='count'
                                    placeholder='Meat Count'
                                    value={isEditMode ? editMeatDetails.count : meatDetails.count}
                                    onChange={isEditMode ? handleEditMeatInputChange : handleMeatInputChange}
                                    required
                                />
                                <input type='file' name='image' onChange={isEditMode ? handleEditMeatImageChange : handleMeatImageChange} />
                                <button className='add-product-button' type='submit'>{isEditMode ? 'Update Meat' : 'Add Meat'}</button>
                            </form>
        )}

        {/* nut form */}
        {selectedTab === 'Nuts' && (
            <form onSubmit={isEditMode ? handleEditNutSubmit : handleAddNut} className='product-form'>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Nut Name'
                                    value={isEditMode ? editNutDetails.name : nutDetails.name}
                                    onChange={isEditMode ? handleEditNutInputChange : handleNutInputChange}
                                    required
                                />
                                <textarea
                                    name='description'
                                    placeholder='Nut Description'
                                    value={isEditMode ? editNutDetails.description : nutDetails.description}
                                    onChange={isEditMode ? handleEditNutInputChange : handleNutInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='price'
                                    placeholder='Nut Price'
                                    value={isEditMode ? editNutDetails.price : nutDetails.price}
                                    onChange={isEditMode ? handleEditNutInputChange : handleNutInputChange}
                                    required
                                />
                                <input
                                    type='text'
                                    name='unit'
                                    placeholder='Nut Unit'
                                    value={isEditMode ? editNutDetails.unit : nutDetails.unit}
                                    onChange={isEditMode ? handleEditNutInputChange : handleNutInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='count'
                                    placeholder='Nut Count'
                                    value={isEditMode ? editNutDetails.count : nutDetails.count}
                                    onChange={isEditMode ? handleEditNutInputChange : handleNutInputChange}
                                    required
                                />
                                <input type='file' name='image' onChange={isEditMode ? handleEditNutImageChange : handleNutImageChange} />
                                <button className='add-product-button' type='submit'>{isEditMode ? 'Update Nut' : 'Add Nut'}</button>
                            </form>
        )}

        {/* dairy form */}
        {selectedTab === 'Dairy' && (
            <form onSubmit={isEditMode ? handleEditDairyProductSubmit : handleAddDairyProduct} className='product-form'>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Dairy Product Name'
                                    value={isEditMode ? editDairyProductDetails.name : dairyProductDetails.name}
                                    onChange={isEditMode ? handleEditDairyProductInputChange : handleDairyProductInputChange}
                                    required
                                />
                                <textarea
                                    name='description'
                                    placeholder='Dairy Product Description'
                                    value={isEditMode ? editDairyProductDetails.description : dairyProductDetails.description}
                                    onChange={isEditMode ? handleEditDairyProductInputChange : handleDairyProductInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='price'
                                    placeholder='Dairy Product Price'
                                    value={isEditMode ? editDairyProductDetails.price : dairyProductDetails.price}
                                    onChange={isEditMode ? handleEditDairyProductInputChange : handleDairyProductInputChange}
                                    required
                                />
                                <input
                                    type='text'
                                    name='unit'
                                    placeholder='Dairy Product Unit'
                                    value={isEditMode ? editDairyProductDetails.unit : dairyProductDetails.unit}
                                    onChange={isEditMode ? handleEditDairyProductInputChange : handleDairyProductInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='count'
                                    placeholder='Dairy Product Count'
                                    value={isEditMode ? editDairyProductDetails.count : dairyProductDetails.count}
                                    onChange={isEditMode ? handleEditDairyProductInputChange : handleDairyProductInputChange}
                                    required
                                />
                                <input type='file' name='image' onChange={isEditMode ? handleEditDairyProductImageChange : handleDairyProductImageChange} />
                                <button className='add-product-button' type='submit'>{isEditMode ? 'Update Dairy Product' : 'Add Dairy Product'}</button>
                            </form>
        )}

        {/* pulse form */}
        {selectedTab === 'Pulses' && (
            <form onSubmit={isEditMode ? handleEditPulseSubmit : handleAddPulse} className='product-form'>
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Pulse Name'
                                    value={isEditMode ? editPulseDetails.name : pulseDetails.name}
                                    onChange={isEditMode ? handleEditPulseInputChange : handlePulseInputChange}
                                    required
                                />
                                <textarea
                                    name='description'
                                    placeholder='Pulse Description'
                                    value={isEditMode ? editPulseDetails.description : pulseDetails.description}
                                    onChange={isEditMode ? handleEditPulseInputChange : handlePulseInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='price'
                                    placeholder='Pulse Price'
                                    value={isEditMode ? editPulseDetails.price : pulseDetails.price}
                                    onChange={isEditMode ? handleEditPulseInputChange : handlePulseInputChange}
                                    required
                                />
                                <input
                                    type='text'
                                    name='unit'
                                    placeholder='Pulse Unit'
                                    value={isEditMode ? editPulseDetails.unit : pulseDetails.unit}
                                    onChange={isEditMode ? handleEditPulseInputChange : handlePulseInputChange}
                                    required
                                />
                                <input
                                    type='number'
                                    name='count'
                                    placeholder='Pulse Count'
                                    value={isEditMode ? editPulseDetails.count : pulseDetails.count}
                                    onChange={isEditMode ? handleEditPulseInputChange : handlePulseInputChange}
                                    required
                                />
                                <input type='file' name='image' onChange={isEditMode ? handleEditPulseImageChange : handlePulseImageChange} />
                                <button className='add-product-button' type='submit'>{isEditMode ? 'Update Pulse' : 'Add Pulse'}</button>
                            </form>
        )}
        </div>
    </div>
    )}

    </div>
  );
};

export default ManageProducts;

