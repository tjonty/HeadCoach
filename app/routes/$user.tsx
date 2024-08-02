import { createCookie, json } from '@remix-run/node'
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import Task from '~/components/Task';

export const prefs = createCookie("task", {});
export const users = createCookie("users", {});
export const tasks = createCookie("tasks", {});

export const loader = async ({
    request
}: LoaderFunctionArgs) => {

    const cookieHeader = request.headers.get("Cookie");
    const cookie_task = (await tasks.parse(cookieHeader)) || {};

    return json({
        tasks: cookie_task
    })
}

export default function User() {
    const { tasks } = useLoaderData() as any;
    const params = useParams() as any;
    const cookieData = {} as any;
    cookieData[params.user] = tasks[params.user] || [];
    return (
        <div>

            <div className='navigation'>
                <Link to="/">
                    <span>
                        /Main
                    </span>
                </Link>
                <span> | </span>
                <Link to="/users">
                    <span>
                        /Users
                    </span>
                </Link>
                <span> | </span>
                <Link to="/tasks">
                    <span>
                        /Task
                    </span>
                </Link>
            </div>

            <Task cookieData={cookieData} />
        </div>
    );
}
