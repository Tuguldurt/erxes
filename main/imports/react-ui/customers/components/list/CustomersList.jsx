import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import { Wrapper } from '/imports/react-ui/layout/components';
import { Pagination } from '/imports/react-ui/common';
import Sidebar from '../../Sidebar.jsx';
import CustomerRow from './CustomerRow.jsx';


const propTypes = {
  customers: PropTypes.array.isRequired,
  brands: PropTypes.array.isRequired,
  integrations: PropTypes.array.isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
};

function CustomersList({ customers, brands, integrations, loadMore, hasMore }) {
  const content = (
    <Pagination hasMore={hasMore} loadMore={loadMore}>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Brand</th>
            <th>Integration</th>
            <th>Last online</th>
            <th>Session count</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            customers.map(customer =>
              <CustomerRow customer={customer} key={customer._id} />
            )
          }
        </tbody>
      </Table>
    </Pagination>
  );

  return (
    <div>
      <Wrapper
        header={<Wrapper.Header breadcrumb={[{ title: 'Customers' }]} />}
        leftSidebar={<Sidebar brands={brands} integrations={integrations} />}
        content={content}
      />
    </div>
  );
}

CustomersList.propTypes = propTypes;

export default CustomersList;
