import { useState } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import "./formadddonation.scss";
const FormRegistration = () => {
    const [userRegistration, setUserRegistaration] = useState([]);
   
    console.log(userRegistration)
    return(
      <Formik 
            initialValues = {{
                firstName: "",
                lastName: "",
                email: "",
                tel: "",
            }}
        validationSchema = {  Yup.object({
                firstName:   Yup.string()
                            .required("Обязательно поле!")
                            .min(5, "Мин 5 символов!"),
                lastName:    Yup.string()
                            .required("Обязательное поле!")
                            .min(5, "Мин 5 символов"),
                email:       Yup.string()
                            .required("Обязательное поле!")
                            .email("Неправельный email адрес"),
                tel:         Yup.string()
                            .required("Обязательное поле!")
                            .min(10, "Мин 10 цифр")
                            .matches(/^\d+$/, "Можно вводить только цифры"),
         })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                setUserRegistaration(prevReg => [...prevReg, values])
                resetForm()
                // alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
        >
        <Form className="form_donation">
            <h2>Registration</h2>
            <label htmlFor="firstName">Ваше имя</label>
            <Field name="firstName" 
                   type="text"
                   className="input"/>
            <ErrorMessage name="firstName" />

            <label htmlFor="lastName">Ваша Фамилия</label>
            <Field name="lastName" 
                   type="text"
                   className="input"/>
            <ErrorMessage name="firstName" />

            <label htmlFor="email">Ваш email</label>
            <Field name="email" type="email"/>
            <ErrorMessage name="email" />

            <label htmlFor="tel">Ваш номер тел:</label>
            <Field name="tel" 
                   type="text"
                   className="input"/>
            <ErrorMessage name="tel" />

            <button type="submit">Отправить</button>
        </Form>
    </Formik>
    )
}

export default FormRegistration;