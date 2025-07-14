import mockHotel from "../Hotel/mock_hotel";

export const mockHotelList = [mockHotel, mockHotel, mockHotel, mockHotel, mockHotel]
    .map((it, index) => {
        return { ...it, rating: (index + 1) }
    })
    .reverse();

