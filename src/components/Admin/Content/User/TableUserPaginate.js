import ReactPaginate from "react-paginate";
import React from 'react';

const TableUserPaginate = (props) => {
    const { listUser, pageCount } = props;

    const handlePageClick = (event) => {
        props.fetchListUserWithPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1)
    };

    return (
        <>
            <div className="user-paginate">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>


            <table className="table table-hover table-bordered">
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
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => props.handleClickBtnUpdate(item)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => props.handleClickBtnDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                    {listUser && listUser.length === 0 &&
                        <tr>
                            <td colSpan={'5'} style={{ textAlign: 'center' }}>No data</td>
                        </tr>
                    }

                </tbody>
            </table>
        </>

    )
}

export default TableUserPaginate;