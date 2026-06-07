import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';

const mockHotel = {
    id: "1234",
    name: "Nicecy Boutique Hotel",
    type: "Hotel",
    city: "Ho Chi Minh",
    address: "27-29 Truong Dinh, District 1, Ho Chi Minh City, Vietnam",
    distance: "2 km",
    photos: [
        'https://drive.google.com/uc?export=view&id=1Bli8YKNJUcpG3uQTiMz8cPrMJuapu9Dw',
        'https://drive.google.com/uc?export=view&id=1c9NwBtSoj9p_OFJicyEn2f8Ab0QHsPWt',
        'https://drive.google.com/uc?export=view&id=1_iuAI6CfbYKYD4SezmJQ5_0xNy9_VGCn',
        'https://drive.google.com/uc?export=view&id=1ZwTucV75YREQwGYRyIYMXT1KpBhZPteb'
      ],
    amenities: ["Excellent location", "Free WiFi", "Air conditioning", "Airport transfer", "24/7 front desk"],
    title: "Stay in the heart of Ho Chi Minh City",
    desc: "Conveniently located in Ho Chi Minh City, Nicecy Boutique Hotel is a 1-minute walk from the downtown area and 200 m from Ben Thanh Market. The air-conditioned rooms at Nicecy Boutique Hotel feature a satellite TV and a private bathroom. Guests can enjoy the use of a tea/coffee maker, a refrigerator and a mini-bar. Nicecy Boutique Hotel has a business center and offers vehicle rental services. Laundry service is also provided.",
    rating: 4,
    rooms: ['room1'],
    cheapestPrice: 1000000,
    featured: true,
};

export default mockHotel;