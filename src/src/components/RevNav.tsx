import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import UserAPI from "../api/UserApi";
import { Constants } from "../helpers/Constants";


export default class RevNav extends React.Component<INavProps, INavState> {
    private userApi: UserAPI;

    constructor(props: INavProps) {
        super(props);
        this.userApi = new UserAPI();

    }

    componentDidMount() {
        this.userApi.getProfile()
            .then(response => {
                console.log('got', response.data.Nav_Items);
                this.setState({ items: response.data.Nav_Items });
            });
    }

    public render() {
        let _items = this.state?.items || [];
        console.log('_items', _items);
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        {
                            _items.map(item => {
                                //return //<Nav.Link onClick={()=>this.props.navClicked(item)}>{item.Text}</Nav.Link>
                                return <RevNavItem clicked={this.props.navClicked} item={item} />
                            })
                        }
                    </Nav>
                </Container>
            </Navbar>
        );
    }
     

}

export class RevNavItem extends React.Component<INavItemProps, any> {

    public render(){
        if(this.props.item.Image_Url){
        return (<Nav.Link onClick={()=>this.props.clicked(this.props.item)}>
                <img
                    src={Constants.revUrl.replace(/^\/|\/$/g, '') + this.props.item.Image_Url}                    
                    height="30"
                    className="d-inline-block align-top"                    
                />
                <div>{this.props.item.Text}</div>
                </Nav.Link>);
      }else{
        return <Nav.Link onClick={()=>this.props.clicked(this.props.item)}>{this.props.item.Text}</Nav.Link>
      }
    }
}

interface INavProps {
    navClicked: (item:INavItem) => void;
}

interface INavItemProps {
    item: INavItem;
    clicked: (item:INavItem)=> void;
}

export interface INavItem {
    Text: string;
    Name: string;
    Url: string;
    Image_Url: string;
}
export interface INavState {
    items: Array<INavItem>;
}