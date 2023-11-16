"use client"

import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore"; // Importing new Firebase functions
import { db } from "../firebase"; // Ensure this is set up for Firebase 10.6.0

// Main form that submits to Firebase Firestore
const Form = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        receipt: null,
        marketing: false,
        terms: false
    });

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData({
                ...formData, [e.target.name]: e.target.files[0]
            });
        }
        else if (e.target.type === 'checkbox') {
            setFormData({
                ...formData, [e.target.name]: e.target.checked
            });
        }
        else {
            setFormData({
                ...formData, [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Using new Firestore API to add a document
            await addDoc(collection(db, "forms"), formData);
    
            setFormData({
                firstName: '',
                lastName: '',
                emailAddress: '',
                phoneNumber: '',
                receipt: null,
                marketing: false,
                terms: false
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="flex flex-col items-center border-2 ">
             <div className="flex flex-row border-2">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input className="flex flex-col border-2 border-slate-800" type="text" name="firstName" onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input className="flex flex-col border-2 border-slate-800" type="text" name="lastName" onChange={handleChange} required/>
                </div>
                </div>
                <div>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input className="flex flex-col border-2 border-slate-800" type="email" name="emailAddress" onChange={handleChange} required/>
                </div>
               
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input className="flex flex-col border-2 border-slate-800" type="tel" name="phoneNumber" onChange={handleChange} required/>
                </div>
                <div>
                    <label htmlFor="receipt">Receipt Upload</label>
                    <input className="flex flex-col border-2 border-slate-800" type="file" name="receipt" accept="image/*" onChange={handleChange}/>
                </div>
                <div>
                    <input type="checkbox" id="marketing" name="marketing" onChange={handleChange} />
                    <label htmlFor="marketing">I agree to receive marketing materials</label>
                </div>
                <div>
                    <input type="checkbox" id="terms" name="terms" onChange={handleChange} required />
                    <label htmlFor="terms">I agree to the terms and conditions</label>
                </div>
            </fieldset>
            <div>
                <button className="border-2 border-red-500 bg-slate-950 text-white px-4" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Form;