import { useState } from "react"
import type { CheckoutData } from "../types/tshirt"


type Props = {
  onPlaceOrder: (data: CheckoutData) => void
  onCancel: () => void
}

function ChekoutForm({onPlaceOrder, onCancel}:Props){
    const [customerName, setCustomerName] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const handleSubmit = () => {
     onPlaceOrder({
    customerName,
    phone,
    address,
    })
    }
    return(
    <section>
    <h2>Checkout</h2>
  <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Name" />

  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />

  <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />

  <button onClick={handleSubmit}>Place Order</button>
  <button onClick={onCancel}>Cancel</button>
    </section>
    )
}
export default ChekoutForm