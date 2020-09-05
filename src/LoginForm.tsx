import React, { useState } from "react";

export default function LoginForm (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function refreshToken() {
        fetch(`${process.env.__URL__}/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'refresh': localStorage.getItem('refresh')
            })
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('access', json.access);
                console.log('refreshed!', json);
            });
    }

    function submit(e) {
        e.preventDefault();

        fetch(`${process.env.__URL__}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('access', json.access);
                localStorage.setItem('refresh', json.refresh);
                props.setPromptLogin(false);
                props.water();
                refreshToken();
            });
    }

    return (
        <form onSubmit={(e) => {submit(e)}}>
            <h3>Please log in</h3>
            <input
                name="username"
                value={username}
                placeholder="username"
                onChange={e => {setUsername(e.target.value)}}
                type="text"
                autoFocus
            />
            <input
                name="password"
                value={password}
                placeholder="password"
                onChange={e => {setPassword(e.target.value)}}
                type="password"
            />
            <input type="submit"/>
        </form>
    )
}
