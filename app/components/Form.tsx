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
        emailAddress: string;
        phoneNumber: string;
        receipt: File | null;
        marketing: boolean;
        terms: boolean;
    }
    
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        emailAddress: '',
        phoneNumber: '',
        receipt: null,
        marketing: false,
        terms: false
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
                () => {
                    // Handle successful uploads on complete
                    // Construct the download URL
                    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${storageRef.bucket}/o/${encodeURIComponent(storageRef.fullPath)}`;
    
                    // Store the download URL in Firestore
                    const newFormData = { ...formData, receipt: downloadURL };
                    addDoc(collection(db, "forms"), newFormData)
                        .then(() => {
                            setInputKey(Math.random().toString()); // This will cause the file input to re-render, clearing its value
    
                            setFormData({
                                firstName: '',
                                lastName: '',
                                emailAddress: '',
                                phoneNumber: '',
                                receipt: null,
                                marketing: false,
                                terms: false
                            });
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                }
            );
        } else {
            console.error("No file selected for upload.");
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <fieldset className="flex flex-col items-center border-2 ">
             <div className="flex flex-row border-2">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" className="flex flex-col border-2 border-slate-800" type="text" name="firstName" onChange={handleChange} value={formData.firstName} required/>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" className="flex flex-col border-2 border-slate-800" type="text" name="lastName" onChange={handleChange} value={formData.lastName} required/>
                </div>
                </div>
                <div>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" className="flex flex-col border-2 border-slate-800" type="email" name="emailAddress" onChange={handleChange} value={formData.emailAddress} required/>
                </div>
               
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input id="phoneNumber" className="flex flex-col border-2 border-slate-800" type="tel" name="phoneNumber" onChange={handleChange} value={formData.phoneNumber} required/>
                </div>
                <div>
                    <label htmlFor="receipt">Receipt Upload</label>
                    <input key={inputKey} id="receipt" className="flex flex-col border-2 border-slate-800" type="file" name="receipt" accept="image/*" onChange={handleChange}/>
                </div>
                <div>
                    <input type="checkbox" id="marketing" name="marketing" onChange={handleChange} checked={formData.marketing} />
                    <label id="marketing" htmlFor="marketing">I agree to receive marketing materials</label>
                </div>
                <div>
                    <input type="checkbox" id="terms" name="terms" onChange={handleChange} checked={formData.terms} required />
                    <label id="terms" htmlFor="terms">I agree to the terms and conditions</label>
                </div>
            </fieldset>
            <div>
                <button className="border-2 border-red-500 bg-slate-950 text-white px-4" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default Form;