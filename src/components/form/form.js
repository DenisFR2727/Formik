import { useState,useEffect, useRef } from "react";
import "./form.scss";
import "../form/formadddonation.scss";
import DropdownMenu from "../dropmenu/DropdownMenu";
import FormAddDonation from "./FormAddDonation";
import FormRegistration from "./FormRegistration";
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('')
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userLogin')) || []);
    const [active, setActive] = useState(false);
    const [borderLogin, setBorderLogin] = useState(false);
    const [borderPass, setBorderPass] = useState(false);
    const [borderLoginRed, setBorderLoginRed] = useState("input_login");
    const [openModal, setOpenModal] = useState(false);
    const [openFormDonation, setOpenFormDonation] = useState(false);

    const loginRef = useRef();
    const passRef = useRef();
useEffect(() => {
    localStorage.setItem('userLogin', JSON.stringify(user));
},[user]);

    const handlerChange = () => {
        
        const userLogin = {
               id: uuidv4(),
               login: login,
               pass:  pass,     
          }
          if(userLogin.login.length > 0 && userLogin.pass.length > 0){
            setUser(prevUser => [...prevUser, userLogin]);
            setLogin("");
            setPass("");
            setBorderLogin(false)
            validateLogin();
          }
          else{
            validateLogin();
          }
    }
    const validateLogin = () =>{
        const lengthLogin = loginRef.current;
        const lengthPass =  passRef.current;
            if(lengthLogin.value.trim() === ""){
                setBorderLoginRed("border_red");
            }if(lengthPass.value.trim() === ""){
                setBorderLoginRed("border_red");
            }else{
                setBorderLoginRed("input_login")
            }
            if(lengthLogin.value.trim().length > 0){
                setBorderLogin(true);
            }if(lengthPass.value.trim().length > 0){
                setBorderPass(true);
            }
    }
    const handleInputClick = () => {
        const inputElement = loginRef.current;
        if(inputElement.blur){
            setActive(true);
        }     
        if (inputElement && user.length > 0) {
            inputElement.blur(); // Забрати фокус з інпута
            inputElement.select(); // Виділити вміст інпута
        }
        setActive(!active); 
    };
    const handlePassMouseDown = () => {
          setActive(false)
    }
    const handleOptionClick = (value) => {
        setLogin(value);
        setPass(""); // Скидання значення пароля
        setBorderLogin(true);
        setBorderPass(true);
    };
    const handlerChangeLogin = (e) =>{
        let loginValue = e.target.value;
        if(loginValue || login){
            setBorderLogin(true)
            if(/^[a-zA-Z\s]+$/.test(loginValue) || loginValue === ""){
                setLogin(loginValue);
             }
             else{
                setLogin("");
             } 
        }        
    }
    const handlerChangePass = (e) => {
         let loginValue = e.target.value;
         if(loginValue || login){
            setBorderPass(true);
            if(/^[0-9]+$/.test(loginValue) || loginValue === ""){
                setPass(loginValue);
              }else{
                setPass("");
              } 
         }   
    }
    // ----------------------button list users-------------------------------
    const listAddUsers = () => {
          setOpenModal(!openModal)
    }
    const formChangedDonation = () => {
          setOpenFormDonation(!openFormDonation);
    }
    return(<div className="container_content">
                <form 
                    onSubmit={(e) => handlerChange(e.preventDefault())}
                    className="form_login">
                <input type="text"
                    value={login}
                    ref={loginRef} 
                    placeholder="Login"
                    onChange={handlerChangeLogin}
                    onClick={handleInputClick}
                    style={borderLogin ? { border: "3px solid green" } : {}}
                    className={borderLoginRed}
                    />
                {active  && (
                        <ul className="list_login">
                            {user.map((item, index) => (
                                <li key={index} onClick={() => handleOptionClick(item.login)}>
                                {item.login}
                                </li>
                            ))}
                        </ul>
                    )} 
                <input type="password"
                    value={pass}
                    placeholder="pass"
                    onChange={handlerChangePass}
                    ref={passRef}
                    style={borderPass ? { border: "3px solid green" } : {}}
                    className={borderLoginRed} 
                    onMouseDown={handlePassMouseDown}/>
                <button>Submit</button>
            </form>
            <div className="btn_block_list_users">
            <button 
                    onClick={listAddUsers}
                    className="listAddUsers"
                >List Add Users</button>
            <button 
                    onClick={formChangedDonation}
                    className="listAddUsers"
                >Open Form Donation</button>
            </div>
            {openModal && <DropdownMenu  listUsers={user}/>}
            {openFormDonation && <FormAddDonation />} 
            <FormRegistration />
        </div>)
}
export default Form;

/// Зробити так що якщо в інпуті є value  то бордер підсвічується зеленим 
/// Зробити компонент дропдаун меню зі списком добавлених юзері 
//  При кліку на кнопку срілки вниз відкрити випадаюче меню (можно використати анімацію).
//  Список юзерів зробити у вигляді таблиці