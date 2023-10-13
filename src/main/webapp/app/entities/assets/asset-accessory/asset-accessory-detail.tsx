import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset-accessory.reducer';

export const AssetAccessoryDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetAccessoryEntity = useAppSelector(state => state.assetAccessory.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetAccessoryDetailsHeading">Asset Accessory</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{assetAccessoryEntity.id}</dd>
          <dt>
            <span id="assetTag">Asset Tag</span>
          </dt>
          <dd>{assetAccessoryEntity.assetTag}</dd>
          <dt>
            <span id="assetDetails">Asset Details</span>
          </dt>
          <dd>{assetAccessoryEntity.assetDetails}</dd>
          <dt>
            <span id="comments">Comments</span>
          </dt>
          <dd>
            {assetAccessoryEntity.comments ? (
              <div>
                {assetAccessoryEntity.commentsContentType ? (
                  <a onClick={openFile(assetAccessoryEntity.commentsContentType, assetAccessoryEntity.comments)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {assetAccessoryEntity.commentsContentType}, {byteSize(assetAccessoryEntity.comments)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="modelNumber">Model Number</span>
          </dt>
          <dd>{assetAccessoryEntity.modelNumber}</dd>
          <dt>
            <span id="serialNumber">Serial Number</span>
          </dt>
          <dd>{assetAccessoryEntity.serialNumber}</dd>
          <dt>Asset Warranty</dt>
          <dd>
            {assetAccessoryEntity.assetWarranties
              ? assetAccessoryEntity.assetWarranties.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {assetAccessoryEntity.assetWarranties && i === assetAccessoryEntity.assetWarranties.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {assetAccessoryEntity.placeholders
              ? assetAccessoryEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {assetAccessoryEntity.placeholders && i === assetAccessoryEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Invoices</dt>
          <dd>
            {assetAccessoryEntity.paymentInvoices
              ? assetAccessoryEntity.paymentInvoices.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.invoiceNumber}</a>
                    {assetAccessoryEntity.paymentInvoices && i === assetAccessoryEntity.paymentInvoices.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Service Outlet</dt>
          <dd>{assetAccessoryEntity.serviceOutlet ? assetAccessoryEntity.serviceOutlet.outletCode : ''}</dd>
          <dt>Settlement</dt>
          <dd>
            {assetAccessoryEntity.settlements
              ? assetAccessoryEntity.settlements.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.paymentNumber}</a>
                    {assetAccessoryEntity.settlements && i === assetAccessoryEntity.settlements.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Asset Category</dt>
          <dd>{assetAccessoryEntity.assetCategory ? assetAccessoryEntity.assetCategory.assetCategoryName : ''}</dd>
          <dt>Purchase Order</dt>
          <dd>
            {assetAccessoryEntity.purchaseOrders
              ? assetAccessoryEntity.purchaseOrders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.purchaseOrderNumber}</a>
                    {assetAccessoryEntity.purchaseOrders && i === assetAccessoryEntity.purchaseOrders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Delivery Note</dt>
          <dd>
            {assetAccessoryEntity.deliveryNotes
              ? assetAccessoryEntity.deliveryNotes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.deliveryNoteNumber}</a>
                    {assetAccessoryEntity.deliveryNotes && i === assetAccessoryEntity.deliveryNotes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Job Sheet</dt>
          <dd>
            {assetAccessoryEntity.jobSheets
              ? assetAccessoryEntity.jobSheets.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.serialNumber}</a>
                    {assetAccessoryEntity.jobSheets && i === assetAccessoryEntity.jobSheets.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Dealer</dt>
          <dd>{assetAccessoryEntity.dealer ? assetAccessoryEntity.dealer.dealerName : ''}</dd>
          <dt>Designated Users</dt>
          <dd>
            {assetAccessoryEntity.designatedUsers
              ? assetAccessoryEntity.designatedUsers.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.dealerName}</a>
                    {assetAccessoryEntity.designatedUsers && i === assetAccessoryEntity.designatedUsers.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Business Document</dt>
          <dd>
            {assetAccessoryEntity.businessDocuments
              ? assetAccessoryEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {assetAccessoryEntity.businessDocuments && i === assetAccessoryEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Universally Unique Mapping</dt>
          <dd>
            {assetAccessoryEntity.universallyUniqueMappings
              ? assetAccessoryEntity.universallyUniqueMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {assetAccessoryEntity.universallyUniqueMappings && i === assetAccessoryEntity.universallyUniqueMappings.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/asset-accessory" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset-accessory/${assetAccessoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetAccessoryDetail;
