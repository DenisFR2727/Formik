import {useFormik} from "formik";
import * as Yup from "yup";
import { useState } from "react";
import "./formadddonation.scss";

// const validate = values => {
//       const errors = {};

//       if(!values.name){
//           errors.name = "Обязательное поле!"
//       }else if(values.name.length <= 4){
//           errors.name = "Минимум 5 символов!"
//       }
//       if(!values.email){
//           errors.email = "Обязательное поле!"
//       }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
//           errors.email = "Неправельный email адрес!"
//       }
//       if(!values.amount){
//           errors.amount = "Обязательное поле!"
//       }
//       if(!values.currency){
//           errors.currency = "Выбрать валюту!"
//       }
//       return errors;
// }

const FormAddDonation = () => {
    const [donations, setDonations] = useState([]);
    const formik = useFormik({
        initialValues: {
            name: "",
            email:"",
            amount: 0,
            currency:"",
            terms: false
        },
        validationSchema: Yup.object({
            name:     Yup.string()
                         .min(5, "Минимум 5 символа!")
                         .required("Обязательное поле!")
                         ,
                         
            email:    Yup.string()
                         .required("Обязательное поле!")
                         .email("Неправельный email адрес!"),
            amount:   Yup.number()
                         .required("Обязательное поле!"),
            currency: Yup.string()
                         .required("Обязательное полу!"),
                                   
        }),
        onSubmit: values =>{
            setDonations(prevDonations => [...prevDonations, values]);
            formik.resetForm();
          }
    })
    
    

    console.log(donations)
    return (
        <form className="form_donation"
              onSubmit={formik.handleSubmit}>
            <h2>Отправить пожертвование</h2>
            <label htmlFor="name">Ваше имя</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null}
            <label htmlFor="email">Ваша почта</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}
            <label htmlFor="amount">Количество</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount ? <div>{formik.errors.amount}</div> : null}
            <label htmlFor="currency">Валюта</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}>
                    <option value="">Выберите валюту</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="EUR">EUR</option>
            </select>
            {formik.errors.currency && formik.touched.currency ? <div>{formik.errors.currency}</div> : null}
            <label htmlFor="text">Ваше сообщение</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            <label className="checkbox">
                <input 
                   name="terms" 
                   type="checkbox" 
                   value={formik.values.terms}
                   onChange={formik.handleChange}
                   onBlur={formik.handleBlur}/>
                Соглашаетесь с политикой конфиденциальности?
            </label>
            <button type="submit">Отправить</button>
        </form>
    )
}

export default FormAddDonation;