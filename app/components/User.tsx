import { Link } from "@remix-run/react"

const User = ({ cookieData }: any) => {

    return (
        <div>
            {
                cookieData.list?.length <= 0
                    ? <h4> No Active Developer at the</h4>
                    : (
                        <>
                            <h4>Users</h4>
                            <div className="form">
                                {
                                    cookieData.list?.map((user: any) => (
                                        <Link to={`/${user}`}>
                                            <button>
                                                {user}
                                            </button>
                                        </Link>
                                    ))
                                }
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default User;