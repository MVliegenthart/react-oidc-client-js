import React from "react";
import RevNav, { INavItem } from "../components/RevNav";
import { Constants } from "../helpers/Constants";

export default class RevPage extends React.Component<any, any>
{

    componentDidMount() {
        console.log('mounted');
        this.setState({ url: Constants.revUrl + '/calls/opencalls.aspx' });
    }

    private navItemClicked(item: INavItem) {
        console.log('navItemClicked',this);
        this.setState({ url: Constants.revUrl + item.Url });
    };

    public render() {
        console.log('render', this.state);
        return (
            <>
                <RevNav navClicked={this.navItemClicked.bind(this)} />
                
                    <iframe title='Revelation helpdesk' src={this.state?.url} width='100%' height='700px' style={{ border: 'none' }}>
                    </iframe>
                               
            </>
        )
    }


}

export class RevHomePage extends RevPage {
    public render() {
        return (<RevPage url='https://revelationVx/calls/opencalls.aspx' />)
    }
}

export class RevSearchPage extends RevPage {
    public render() {
        return (<RevPage url='https://revelationVx/search/default.aspx' />)
    }
}