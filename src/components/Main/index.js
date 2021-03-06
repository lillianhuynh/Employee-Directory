import React, { Component } from "react";
import API from "../../utils/API";
import SearchBar from "../SearchBar";
import Table from "../Table"

class Main extends Component {
  
        state = {
            searchResults: [],
            search: "",
            filteredResults: [],
            order: ""
        };
    

    //make API call to third party and display all random employees info on main page 
    //when page loads
    componentDidMount() {

        API.searchAPI().then(({ data }) => {
            console.log(data)
            console.log(data.results)
            this.setState({
                ...this.state,
                searchResults: data.results,
                filteredResults: data.results
            })
            console.log(this.state)
        }).catch(err => console.log(err)
        );
        console.log(this.state)
    };

    //sorting employees by names
    sortedByName = () => {
        const newFiltered = this.state.filteredResults;

        if (this.state.order === "asc") {
            const newList = newFiltered.sort((a, b) => (a.name.first > b.name.first) ? 1 : -1)
            this.setState({
                filteredResults: newList,
                order: "desc"
            })
        } else {
            const newList = newFiltered.sort((a, b) => (a.name.first > b.name.first) ? -1 : 1)
            this.setState({
                filteredResults: newList,
                order: "asc"
            })
        }
    };

    handleInputChange = event => {
        console.log(this.state)
        const searchResults =[...this.state.searchResults];
        const value = event.target.value.toLowerCase();
        const filteredResults = searchResults.filter(searchEmployee => searchEmployee.name.first.toLowerCase().indexOf(value) > -1)
        this.setState({
            ...this.state,
            filteredResults
        });
    };

    //update page
    searchUpdate = () => {
        API.searchAPI()
            .then(res => this.setState({
                filteredResults: res.data.results,
                searchResults: res.data.results

            }))
    }

    //submit button
    handleSubmit = event => {
        event.preventDefault();
        const { searchResults, search } = this.state;
        const filteredResults = searchResults.filter(searchEmployee => searchEmployee.name.first.includes(search))
        this.setState({
            filteredResults
        });

    };

    render() {
        return (
            <div>
                <SearchBar
                    searchEmployee={this.state.searchResults}
                    handleSubmit={this.handleSubmit}
                    handleInputChange={this.handleInputChange}
                />
                <Table results={this.state.filteredResults}
                    sortedByName={this.sortedByName} />
            </div>
        )
    }

}

export default Main;

