import React, { useState } from "react";
import firebase from "firebase/compat/app";
import 'firebase/firestore';

const Form = () => {
    return (
        <form action="">
            <fieldset className="flex flex-col items-center border-2 ">
             <div className="flex flex-row border-2">
                <div>
                    <label htmlFor="first-name">First Name</label>
                    <input className="flex flex-col border-2 border-slate-800" type="text" name="First name" required/>
                </div>
                <div>
                    <label htmlFor="last-name">Last Name</label>
                    <input className="flex flex-col border-2 border-slate-800" type="text" name="First name" required/>
                </div>
                </div>
                <div>
                    <label htmlFor="email-address">Email Address</label>
                    <input className="flex flex-col border-2 border-slate-800" type="email" name="First name" required/>
                </div>
               
                <div>
                    <label htmlFor="phone-number">Phone Number</label>
                    <input className="flex flex-col border-2 border-slate-800" type="tel" name="Mobile number" required/>
                </div>
                <div>
                    <label htmlFor="receipt">Receipt Image</label>
                    <input className="flex flex-col border-2 border-slate-800" type="file" name="receipt" accept="image/*" required/>
                </div>
                <div>
                    <input type="checkbox" id="marketing" name="marketing" />
                    <label htmlFor="marketing">I agree to receive marketing materials</label>
                </div>
                <div>
                    <input type="checkbox" id="terms" name="terms" required />
                    <label htmlFor="terms">I agree to the terms and conditions</label>
                </div>
            </fieldset>
            <div>
                <button className="border-2 border-red-500 bg-slate-950 text-white px-4">Submit</button>
            </div>
        </form>
    )
}

export default Form;