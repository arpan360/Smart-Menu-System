import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../../";
import { Dish } from "../../../api/dish";
import { deleteOrder } from "../../../api/order";
import { useState } from "react";

export interface OrderItemProps {
  _id: string;
  table_no: string;
  orderType:"Delivery" | "Take Away" | "Dine-In"
  note: string;
  orderItems: Dish[];
  totalPrice: number;
  isEditing: boolean;
  status: "PENDING" | "PREPARING" | "READY" | "CANCELLED"
}

function OrderItem({ _id, table_no, totalPrice, orderType, note, orderItems }: OrderItemProps) {
  const [loading, setLoading] = useState(false)
  const handleAccept = () => {
    
  };
  const handleReject = () => {
    setLoading(true)
    deleteOrder(_id)
    .finally(()=>{
     setLoading(false)
   })
  };


  return (
    <div className="mt-9 flex h-[300px] w-[300px] items-center justify-center rounded-3xl border bg-orange-500 transition-all duration-300 ease-linear hover:scale-105">
      <div className="absolute mr-5 mt-5 h-[300px] w-[300px] rounded-3xl bg-orange-400">
        <h1 className="mt-4 text-center text-3xl font-bold text-white">
          {table_no}
        </h1>
        <div className="p-12">
          <p className="text-lg text-white">Total: ₹{totalPrice}</p>
          <p className="text-lg text-white">Type: {orderType}</p>
          <p className="text-lg text-white flex" >Dishes: {orderItems.length>0 && orderItems.map(item=>(
            <div>{item.name}</div>
          ))} </p>
          <p className="text-lg text-white">Tip: {note}</p>
        </div>
      </div>
      <div className="z-10 flex justify-between space-x-14 self-end">
        <Button className="green-submit-button flex" onClick={handleAccept} >
          {loading?
          <p className="font-semibold" >...Please Wait</p>:
          <>
            <TiTick size={25} />
            <p className="font-semibold">Accept</p>
          </>}
        </Button>
        <Button className="btn btn-secondary flex bg-red-600 text-white" onClick={handleReject}>
          {loading?
          <p className="font-semibold" >...Please Wait</p>
          :<>
            <RxCross2 size={25} />
            <p className="font-semibold">Reject</p>
          </>}
        </Button>
      </div>
    </div>
  );
}

export default OrderItem;
