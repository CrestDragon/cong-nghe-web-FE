export const mockOrder = {
  id: 0,
  amountRoom: 2,
  email: "abc@gmail.com",
  endDate: 1675900800000,
  fullname: "Do Anh Linh",
  userId: "63cbb279ecfad4dfecfd66fe",
  phone: "0361234567",
  price: 2000000,
  roomId: "63e21422ec078511954b290b",
  startDate: 1675814400000,
  state: "Waiting",
  username: "linhda",
};

export const mockOrderList = () => {
  return Array(7)
    .fill(mockOrder)
    .map((it, index) => {
      return {
        ...it,
        id: index,
        state:
          index % 3 === 1
            ? "Accepted"
            : index % 3 === 2
            ? "Declined"
            : "Waiting",
      };
    });
};
