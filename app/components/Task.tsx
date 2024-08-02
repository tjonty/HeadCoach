const Task = ({ cookieData }: any) => {
    return (
        <div>
            {
                Object.keys(cookieData).length === 0
                    ? <h4>No Task.</h4>
                    : (
                        <>
                            <h4>Tasks</h4>
                            <div className="form">
                                {
                                    Object.entries(cookieData).map(([key, value]: any) => (
                                        <>
                                            <p>{key}:</p>
                                            {
                                                Object.keys(value).map((id: any) => (
                                                    <p>
                                                        {
                                                            value[id].is_completed
                                                                ? <s>{value[id].task}</s>
                                                                : <>{value[id].task}</>
                                                        }
                                                    </p>
                                                ))
                                            }
                                        </>
                                    ))
                                }
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Task;