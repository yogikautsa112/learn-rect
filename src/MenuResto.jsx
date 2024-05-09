import './MenuResto.css'
import { useState } from 'react';

function MenuResto() {
    const menuItems = [
        { nama: 'Nasi bakar 🍚 ', harga: 'Rp. 10.000' },
        { nama: 'Mie goreng 🍜 ', harga: 'Rp. 15.000' },
        { nama: 'Donut 🥯 ', harga: 'Rp. 5.000' }
    ];

    const [menu, setMenu] = useState(menuItems.map(item => ({ ...item, like: 0, dislike: 0 })));

    const handleLike = (index) => {
        const updatedMenu = [...menu];
        updatedMenu[index].like += 1;
        setMenu(updatedMenu);
    };

    const handleDislike = (index) => {
        const updatedMenu = [...menu];
        updatedMenu[index].dislike += 1;
        setMenu(updatedMenu);
    };

    return (
        <>
            {menu.map((item, index) => (
                <div className="menu-item" key={index}>
                    <b>Nama Menu: </b> <em>{item.nama}</em>
                    <br />
                    <b>Harga: </b> <em>{item.harga}</em>
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