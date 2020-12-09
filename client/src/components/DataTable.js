import React from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import './styles/DataTable.css'

export default class DataTable extends React.Component {
    render() {
        return (
            <div className="table-responsive www_table disable-scrollbars">
                <MDBDataTableV5
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={
                        this.props.datatable
                    }
                    searchTop
                    searchBottom={false}
                    materialSearch 
                    checkbox={this.props.check}
                    headCheckboxID='id2'
                    bodyCheckboxID='checkboxes2'
                    getValueCheckBox={(e) => {
                        this.props.onCheckboxChange(e);
                    }}
                />
            </div>



        );
    }

}