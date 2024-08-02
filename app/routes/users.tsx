import { createCookie, json } from '@remix-run/node'
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import User from '~/components/User';

export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export const users = createCookie("users", {});

export const loader = async ({
    request
}: LoaderFunctionArgs) => {

    const cookieHeader = request.headers.get("Cookie");
    const cookie = (await users.parse(cookieHeader)) || {};
    console.log("cookie", cookie);

    return json({
        cookieData: cookie
    })
}


export default function Index() {
    const { cookieData } = useLoaderData() as any;
    return (
        <div>
            <div>
                <Link to="/tasks">
                    <span>
                        /Task
                    </span>
                </Link>
                <span> | </span>
                <Link to="/">
                    <span>
                        /Main
                    </span>
                </Link>
            </div>
            <User cookieData={cookieData} />
        </div>
    );
}

