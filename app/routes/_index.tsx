import { createCookie, json } from '@remix-run/node'
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData } from "@remix-run/react";
import type {
  ActionFunctionArgs,
} from "@remix-run/node";
import User from '~/components/User';
import Task from '~/components/Task';
import { useState } from 'react';
import uniqid from 'uniqid';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const users = createCookie("users", {});
export const tasks = createCookie("tasks", {});

export const loader = async ({
  request
}: LoaderFunctionArgs) => {

  const cookieHeader = request.headers.get("Cookie");
  const cookie_user = (await users.parse(cookieHeader)) || {};
  const cookie_task = (await tasks.parse(cookieHeader)) || {};

  return json({
    users: cookie_user,
    tasks: cookie_task
  })
}


export default function Index() {
  const { users, tasks } = useLoaderData() as any;
  const [selectedUser, setSelectedUser] = useState("Jonty");

  return (
    <div>

      <div>
        <h1>Head Coach</h1>
      </div>

      <div>
        <Link to={`/Tasks`}>
          <span className='mx-4'>
            /Task
          </span>
        </Link>
        <span> | </span>
        <Link to={`/Users`}>
          <span className='mx-4'>
            /Users
          </span>
        </Link>
      </div>

      <Form id="task-form" method="post">
        <h4>ADD NEW DEV</h4>
        <div className='form'>
          <input
            className='input'
            defaultValue=''
            aria-label="user"
            name="user"
            type='text'
            placeholder='Add new user'
          />
          <button type='submit' name='action' value="user">Add new user</button>
        </div>
        <h4>ADD NEW TASK</h4>
        <div className='form'>
          <select
            className='input'
            name='name'
            value={selectedUser}
            onChange={event => setSelectedUser(event.target.value)}>
            {users.list?.map((user: any, index: any) => {
              return (
                <option key={index} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
          <input
            className='input'
            defaultValue=''
            aria-label="Task"
            name="task"
            type='text'
            placeholder='Task'
          />
          <button type='submit' name='action' value="task">Add new task</button>
        </div>
      </Form>

      <User cookieData={users} />

      <Task cookieData={tasks} />

    </div >
  );
}

export const action = async ({
  request
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  const cookieHeader = request.headers.get('Cookie');

  switch (formData.get("action")) {
    case "task": {
      const cookie_task = (await tasks.parse(cookieHeader)) || {} as any;
      const { name, task } = updates as any;
      if (name === '' || task === '')
        return redirect("");

      !cookie_task[name] ? cookie_task[name] = {} : null;
      cookie_task[name][uniqid()] = {
        task: updates.task,
        is_completed: false
      };
      return redirect("/", {
        headers: {
          "Set-cookie": await tasks.serialize(cookie_task)
        }
      });
    }
    case "user": {
      const cookie_user = (await users.parse(cookieHeader)) || {};
      const { user } = updates;
      if (user === '' || cookie_user.list?.includes(user))
        return redirect("");
      !cookie_user.list ? cookie_user.list = [] : null;
      cookie_user.list = [...cookie_user.list, user]
      return redirect("/", {
        headers: {
          "Set-cookie": await users.serialize(cookie_user)
        }
      });
    }
    default: {
      throw new Error("Unknown action");
    }
  }
}
