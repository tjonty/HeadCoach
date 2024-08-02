import { createCookie, json } from '@remix-run/node'
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData, useSubmit } from "@remix-run/react";
import type {
    ActionFunctionArgs,
} from "@remix-run/node";

export const tasks = createCookie("tasks", {});

export const loader = async ({
    request
}: LoaderFunctionArgs) => {

    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await tasks.parse(cookieHeader)) || {};

    return json({
        res: ["Jonty", "David"],
        task: [],
        cookieData: cookie
    })
}


export default function Tasks() {
    const { cookieData } = useLoaderData() as any;

    function DisplayData() {
        return (
            <div>
                <h4>Tasks</h4>
                <div className='form'>
                    <Form method='post'>
                        {
                            Object.entries(cookieData).map(([key, value]: any) => (
                                <div key={key}>
                                    <p>{key}:</p>
                                    {

                                        Object.keys(value).map((id: any) => (
                                            <>
                                                <p>
                                                    <input
                                                        value={id}
                                                        name={key}
                                                        type='checkbox'
                                                    />
                                                    {
                                                        value[id].is_completed
                                                            ? <s>{value[id].task}</s>
                                                            : <>{value[id].task}</>
                                                    }
                                                </p>
                                            </>
                                        ))
                                    }
                                </div>
                            ))
                        }
                        <button type='submit'>Submit</button>
                    </Form>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div>
                <Link to="/users">
                    <span>
                        /Users
                    </span>
                </Link>
                <span> | </span>
                <Link to="/">
                    <span>
                        /Main
                    </span>
                </Link>
            </div>

            <div>
                {
                    Object.keys(cookieData).length === 0
                        ? <h4>No Task.</h4>
                        : <DisplayData />
                }
            </div>
        </div >
    );
}

export const action = async ({
    request
}: ActionFunctionArgs) => {
    const formData = await request.formData() as any;
    const cookieHeader = request.headers.get('Cookie');
    const cookie_task = (await tasks.parse(cookieHeader));

    for (var [key, value] of formData.entries()) {
        cookie_task[key][value].is_completed = !cookie_task[key][value].is_completed;
    }

    return redirect("/tasks", {
        headers: {
            "Set-cookie": await tasks.serialize(cookie_task)
        }
    });
}