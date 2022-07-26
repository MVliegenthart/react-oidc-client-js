import React from "react";
import { AutoComplete } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import { toODataString } from '@progress/kendo-data-query';

export default class QuickSearch extends React.Component {
    baseUrl = 'https://demos.telerik.com/kendo-ui/service-v4/odata/Products?$count=true&';
    init = { method: 'GET', accept: 'application/json', headers: {} };
    state = { data: [], value: '', loading: false };
  
    onChange = (event: { target: { value: any; }; }) => {
      const value = event.target.value;
      let myfilter = {
        logic:"and" as const,
        filters: [
          { field: "ProductName", operator: "startswith", value: value, ignoreCase: true },
        ]
      };
      this.setState({
        loading: true
      })
      fetch(this.baseUrl + toODataString({filter:myfilter}), this.init)
        .then(response => response.json())
        .then(json => {
          this.setState({
            data: json.value,
            value: value,
            loading: false
          });
        });
  
  
    }
  
    render() {
      return (
        <AutoComplete 
            placeholder='Search'
          loading={this.state.loading}
          data={this.state.data}
          value={this.state.value}
          onChange={this.onChange}
          textField='ProductName'
        />
      );
    }
  }