const mockRoom = {
  id: "room1",
  hotelId: "63e1cc816bc72efcb6d1ec82",
  title: 'Deluxe Twin Room',
  price: 1000000,
  maxPeople: 3,
  amountRoom: 4, 
  desc: "27 sq m, 1 King Bed",
  roomOrder: []
}

export const Rooms = () => {
  return Array(5).fill(mockRoom);
}