import { Form, useSubmit } from "@remix-run/react";

export function Test() {
    const submit = useSubmit();
    const handleOnChange = () => {
        console.log('in handle');
    }
    return (
        <Form method="POST">
            <input
                type="checkbox"
                name="test"
                value='value'
                onChange={(event) => submit(event.currentTarget, { method: "post", encType: "application/json" })} />
        </Form>
    );
}
