import "./dropdownmenu.css";
import 'bootstrap/dist/css/bootstrap.min.css';


const DropdownMenu = (list) => {
    
console.log(list)
const renderUsersLogin = (arr) => {
      return arr.listUsers.map((user,id) => (
            <table className="table" key={id}>
            <thead />
            <tbody>
            <tr />
            <tr >
                <th scope="row">{id}</th>
                <td colSpan={2} className="table-active">
                {user.login}
                </td>
                <td>{user.pass}</td>
            </tr>
            </tbody>
        </table>
      ))
}

const listUsers = renderUsersLogin(list);

    return(<div className="container_menu">
             {listUsers}
    </div>)
}
export default DropdownMenu;