import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './dealer.reducer';

export const DealerDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const dealerEntity = useAppSelector(state => state.dealer.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="dealerDetailsHeading">Dealer</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{dealerEntity.id}</dd>
          <dt>
            <span id="dealerName">Dealer Name</span>
          </dt>
          <dd>{dealerEntity.dealerName}</dd>
          <dt>
            <span id="taxNumber">Tax Number</span>
          </dt>
          <dd>{dealerEntity.taxNumber}</dd>
          <dt>
            <span id="identificationDocumentNumber">Identification Document Number</span>
          </dt>
          <dd>{dealerEntity.identificationDocumentNumber}</dd>
          <dt>
            <span id="organizationName">Organization Name</span>
          </dt>
          <dd>{dealerEntity.organizationName}</dd>
          <dt>
            <span id="department">Department</span>
          </dt>
          <dd>{dealerEntity.department}</dd>
          <dt>
            <span id="position">Position</span>
          </dt>
          <dd>{dealerEntity.position}</dd>
          <dt>
            <span id="postalAddress">Postal Address</span>
          </dt>
          <dd>{dealerEntity.postalAddress}</dd>
          <dt>
            <span id="physicalAddress">Physical Address</span>
          </dt>
          <dd>{dealerEntity.physicalAddress}</dd>
          <dt>
            <span id="accountName">Account Name</span>
          </dt>
          <dd>{dealerEntity.accountName}</dd>
          <dt>
            <span id="accountNumber">Account Number</span>
          </dt>
          <dd>{dealerEntity.accountNumber}</dd>
          <dt>
            <span id="bankersName">Bankers Name</span>
          </dt>
          <dd>{dealerEntity.bankersName}</dd>
          <dt>
            <span id="bankersBranch">Bankers Branch</span>
          </dt>
          <dd>{dealerEntity.bankersBranch}</dd>
          <dt>
            <span id="bankersSwiftCode">Bankers Swift Code</span>
          </dt>
          <dd>{dealerEntity.bankersSwiftCode}</dd>
          <dt>
            <span id="fileUploadToken">File Upload Token</span>
          </dt>
          <dd>{dealerEntity.fileUploadToken}</dd>
          <dt>
            <span id="compilationToken">Compilation Token</span>
          </dt>
          <dd>{dealerEntity.compilationToken}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{dealerEntity.remarks}</dd>
          <dt>
            <span id="otherNames">Other Names</span>
          </dt>
          <dd>{dealerEntity.otherNames}</dd>
          <dt>Payment Label</dt>
          <dd>
            {dealerEntity.paymentLabels
              ? dealerEntity.paymentLabels.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {dealerEntity.paymentLabels && i === dealerEntity.paymentLabels.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Dealer Group</dt>
          <dd>{dealerEntity.dealerGroup ? dealerEntity.dealerGroup.dealerName : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {dealerEntity.placeholders
              ? dealerEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {dealerEntity.placeholders && i === dealerEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/dealer" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/dealer/${dealerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DealerDetail;
