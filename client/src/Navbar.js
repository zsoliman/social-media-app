import { connect } from "react-redux"
import store from "./store"

const Navbar = () => {
    return (
        <ul>
            <li>HOME</li>
            <li>
                {
                    store.getState().currentUser ?
                        store.getState().currentUser.email : 'LOGIN'
                }
            </li>
        </ul>
    )
}

const mapStateToProps = state => state;
export default connect(mapStateToProps)(Navbar)