import * as React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default class Nav extends React.Component{

    public render(){
        return (
            <Navbar expand="lg" variant="light" bg="light" >
                <Container>
                    <Navbar.Brand href="./auth">Authentication</Navbar.Brand>
                    <Navbar.Brand href="./revhome">Revelation</Navbar.Brand>
                    <Navbar.Brand href="./revsearch">Quick Search</Navbar.Brand>
                </Container>
            </Navbar>
        )
    }
}