import React, { useState } from "react";
import "./App.css";
import 'semantic-ui-css/semantic.min.css';
import { Button, Form, Segment, Icon } from 'semantic-ui-react';
import { useAuthenticateUser } from "./data";

function LoginForm() {

    const [userId, setUserId] = useState(null);
    const [password, setPassword] = useState(null);
    const [credentials, setCredentials] = useState(null);
    const { result } = useAuthenticateUser(credentials);

    const handleClick = () => {
        let creds = { userId, password };
        if (userId !== null && password !== null) {
            setCredentials(creds);
        }
    };

    return (
        <div className="App">
            <Segment textAlign='center' style={{ height: '50px', paddingTop: '15px', color: '#203174', backgroundColor: '#7f9ade' }}>
                <span style={{ float: 'left', fontSize: '25px' }}><Icon name='newspaper outline' /></span>
                <span style={{ float: 'left', fontFamily: 'Audiowide', fontSize: '25px' }}>News Labeler</span>
            </Segment>
            <Segment style={{ backgroundColor: '#b9d7f9', marginTop: '100px', color: '#203174'}}>
                <Form size='huge'>
                    <Form.Group widths='equal'>
                        <Form.Input
                            style={{ fontFamily: 'Open Sans'}}
                            fluid label='User ID'
                            placeholder='User name'
                            onChange={e => setUserId(e.target.value)} />
                        <Form.Input
                            style={{ fontFamily: 'Open Sans'}}
                            fluid label='Password'
                            placeholder='Password'
                            type='password'
                            onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                </Form>
            </Segment>
            <Button style={{ float: 'right', fontFamily: 'Open Sans', color: '#203174', backgroundColor: '#f5cddf' }}
                type='submit' size='large' onClick={handleClick}>Submit</Button>
        </div>
    );
}

export default LoginForm;