import React, { useState, useEffect } from "react";
import getCookie from './utils/getCookie'

export default function LoginForm (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submit(e) {
        e.preventDefault();

        fetch(`${process.env.__URL__}/token-auth/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({username, password}),
            credentials: 'include',
        })
            .then(res => res.json())
            .then(json => {
                localStorage.setItem('token', json.token);
                if (json.user.username) {
                    props.setUser(json.user.username);
                    props.setPromptLogin(false);
                    props.water()
                }
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
