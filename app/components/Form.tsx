"use client"
//  "firebase": "^10.6.0" is used in this project
import React, { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; // Importing new Firebase functions
import { db } from "../firebase"; // Ensure this is set up for Firebase 10.6.0
import { v4 as uuidv4 } from 'uuid';



// Main form that submits to Firebase Firestore
const Form = () => {

    interface FormData {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        emailAddress: string;
        receipt: File | null;
        terms: boolean;
        marketing: boolean;
        
    }
    
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
        receipt: null,
        terms: false,
        marketing: false
        
    });

    const [inputKey, setInputKey] = useState (
        Math.random().toString()
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === 'file') {
            if (e.target.files) {
                setFormData({
                    ...formData, [e.target.name]: e.target.files[0]
                });
            }
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (formData.receipt) {
            // Generate a unique token
            const token = uuidv4();
    
            // Create a reference to the file in Firebase Storage with the token
            const storage = getStorage();
            const storageRef = ref(storage, `receipts/${formData.receipt.name}?alt=media&token=${token}`);
    
            // Upload the file to Firebase Storage
            const uploadTask = uploadBytesResumable(storageRef, formData.receipt);
    
            uploadTask.on('state_changed', 
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {
                    // Handle unsuccessful uploads
                    console.error("Error uploading file: ", error);
                }, 
                async () => {
                    // Handle successful uploads on complete
                    // Construct the download URL
                    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${encodeURIComponent(storageRef.fullPath)}`;
    
                    // Store the form data in Firestore
                    const newFormData = { ...formData, receipt: downloadURL };
                    await addDoc(collection(db, "forms"), newFormData);
    
                    // Send an email notification
                    const emailData = { to: formData.emailAddress };
                    await addDoc(collection(db, "mail"), emailData);
    
                    setInputKey(Math.random().toString()); // This will cause the file input to re-render, clearing its value
    
                    setFormData({
                        firstName: '',
                        lastName: '',
                        phoneNumber: '',
                        emailAddress: '',
                        receipt: null,
                        terms: false,
                        marketing: false
                        
                    });
                }
            );
        } else {
            console.error("No file selected for upload.");
        }
    };


    return (
        <form onSubmit={handleSubmit} className="w-full">
            <fieldset className="flex flex-col items-center w-full">
             <div className="flex flex-row justify-between w-full">
                <div className="w-1/2 pb-2.5 pr-2">
                    <label htmlFor="firstName">First Name *</label>
                    <input id="firstName" className="w-full" type="text" name="firstName" placeholder="Your first name" onChange={handleChange} value={formData.firstName} required/>
                </div>
                <div className="w-1/2 pb-2.5">
                    <label htmlFor="lastName">Last Name *</label>
                    <input id="lastName" className="w-full" type="text" name="lastName" placeholder="Your last name" onChange={handleChange} value={formData.lastName} required/>
                </div>
                </div>
                <div className="w-full pb-2.5">
                    <label htmlFor="phoneNumber">Phone Number *</label>
                    <input id="phoneNumber" className="w-full" type="tel" name="phoneNumber" placeholder="Your phone number" onChange={handleChange} value={formData.phoneNumber} required/>
                </div>
                <div className="w-full pb-2.5">
                    <label htmlFor="emailAddress">Email Address *</label>
                    <input id="emailAddress" className="w-full" type="email" name="emailAddress" placeholder="Your email address" onChange={handleChange} value={formData.emailAddress} required/>
                </div>
<div className="relative w-full pb-2.5">
  <label htmlFor="receipt" className="text-center absolute inset-0 cursor-pointer px-3 py-3 text-white bg-black rounded-full">
    Upload your receipt
  </label>
  <input 
    key={inputKey} 
    id="receipt" 
    className="w-full opacity-0 cursor-pointer" 
    type="file" 
    name="receipt" 
    accept="image/*" 
    onChange={handleChange}
  />
</div>
                <div className="flex justify-start items-center w-full space-x-2 pt-2.5 pb-2.5">
    <input type="checkbox" id="terms" name="terms" onChange={handleChange} checked={formData.terms} required className="form-checkbox h-5 w-5 text-gray-600 pb-2.5" />
    <label id="terms" htmlFor="terms" className="w-3/4 ">I agree to the terms and conditions *</label>
</div>
<div className="flex justify-start items-center w-full space-x-2 pb-2.5">
    <input type="checkbox" id="marketing" name="marketing" onChange={handleChange} checked={formData.marketing} className="form-checkbox h-5 w-5 text-gray-600" />
    <label id="marketing" htmlFor="marketing" className="w-3/4">I’m happy for Westinghouse to contact me regarding news, products and offers</label>
</div>
            </fieldset>
            <div className="w-full">
                <button 
  className="w-36 py-1 px-7 mt-2.5 border-2 bg-[#f6502b] border-[#f6502b] text-white rounded-full cursor-pointer text-lg font-semibold leading-tight uppercase text-center" 
  type="submit">Submit</button></div>
        </form>
    )
}

export default Form;
