

const TableUser = (props) => {
    const { listUser } = props

    return (
        <>
            <table className="table table-hover table-dark table-striped table-bordered">
                <thead>
                    <tr style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 &&
                        listUser.map((item, index) => {
                            return (
                                <tr key={index} style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                    <td>{item.id}</td>
                                    <td>{item.username}</td>
                                    <td>{item.email}</td>
                                    <td>{item.role}</td>
                                    <td>
                                        <button className="btn btn-primary">View</button>
                                        <button className="btn btn-warning mx-3">Update</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={'4'} style={{ textAlign: 'center' }}>No data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </>

    )
}

export default TableUser;