import { Link } from 'react-router-dom'

function Sidebar () {
    return <div>
        <Link to="dashboard">Dashboard</Link><br />
        <Link to="profile">Profile</Link>
    </div>
}

export default Sidebar