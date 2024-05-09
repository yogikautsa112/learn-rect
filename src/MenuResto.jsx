import './MenuResto.css'
import { useEffect, useState } from 'react';

function MenuResto() {
    const menuItems = [
        { nama: 'Nasi bakar 🍚 ', harga: 'Rp. 10.000' },
        { nama: 'Mie goreng 🍜 ', harga: 'Rp. 15.000' },
        { nama: 'Bolu Kukus 🥯 ', harga: 'Rp. 5.000' }
    ]

    const [menu, setMenu] = useState(() => {
        const storedMenu = localStorage.getItem('menu')
        return storedMenu ? JSON.parse(storedMenu) : menuItems.map((item => ({...item, like: 0, dislike: 0})) )
    })

    const [newItemName, setNewItemName] = useState('')
    const [newItemPrice, setNewItemPrice] = useState('')

    useEffect(() => {
        localStorage.setItem('menu', JSON.stringify(menu))
    },
    [menu])

    const handleAddMenu = () => {
        if (newItemName && newItemPrice) {
            const newItem = {
                nama: newItemName,
                harga: 'Rp. ' + newItemPrice,
                like: 0,
                dislike: 0,
            }

            setMenu(prevMenu => [...prevMenu, newItem])
            setNewItemName('')
            setNewItemPrice('')
        }
    }

    const handleLike = (index) => {
        const updatedMenu = [...menu];
        updatedMenu[index].like += 1;
        setMenu(updatedMenu);
    }

    const handleDislike = (index) => {
        const updatedMenu = [...menu];
        updatedMenu[index].dislike += 1;
        setMenu(updatedMenu);
    }

    return (
        <>
        <div className='flex justify-center rounded gap-4 mt-2 mb-2'>
            <div className='flex-col gap-2' >
                <label htmlFor="name" className='block text-sm font-medium leading-6 text-gray-900'>Nama Menu:</label>
                    <input  type="text"
                            id='name'
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            required />
                <label htmlFor="harga" className='block text-sm font-medium leading-6 text-gray-900'>Harga:</label>
                    <input  type="text"
                            id='harga'
                            value={newItemPrice}
                            onChange={(e) => setNewItemPrice(e.target.value)}
                            required />
                <button onClick={handleAddMenu}>➕</button>
            </div>
        </div>
            {menu.map((item, index) => (
                <div className="flex flex-col justify-center menu-item" key={index}>
                    <p>Nama Menu:<em>{item.nama}</em> </p> 
                    <p>Harga: <em>{item.harga}</em> </p> 
                    <div>
                        <button id='like-btn' onClick={() => handleLike(index)}>{item.like}👍</button>
                        <button id='dis-btn' onClick={() => handleDislike(index)}>{item.dislike}👎</button>
                    </div>
                </div>
            ))}
        </>

    )
}

export default MenuResto