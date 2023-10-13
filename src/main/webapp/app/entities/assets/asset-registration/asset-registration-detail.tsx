import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './asset-registration.reducer';

export const AssetRegistrationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const assetRegistrationEntity = useAppSelector(state => state.assetRegistration.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assetRegistrationDetailsHeading">Asset Registration</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{assetRegistrationEntity.id}</dd>
          <dt>
            <span id="assetNumber">Asset Number</span>
          </dt>
          <dd>{assetRegistrationEntity.assetNumber}</dd>
          <dt>
            <span id="assetTag">Asset Tag</span>
          </dt>
          <dd>{assetRegistrationEntity.assetTag}</dd>
          <dt>
            <span id="assetDetails">Asset Details</span>
          </dt>
          <dd>{assetRegistrationEntity.assetDetails}</dd>
          <dt>
            <span id="assetCost">Asset Cost</span>
          </dt>
          <dd>{assetRegistrationEntity.assetCost}</dd>
          <dt>
            <span id="comments">Comments</span>
          </dt>
          <dd>
            {assetRegistrationEntity.comments ? (
              <div>
                {assetRegistrationEntity.commentsContentType ? (
                  <a onClick={openFile(assetRegistrationEntity.commentsContentType, assetRegistrationEntity.comments)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {assetRegistrationEntity.commentsContentType}, {byteSize(assetRegistrationEntity.comments)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="modelNumber">Model Number</span>
          </dt>
          <dd>{assetRegistrationEntity.modelNumber}</dd>
          <dt>
            <span id="serialNumber">Serial Number</span>
          </dt>
          <dd>{assetRegistrationEntity.serialNumber}</dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{assetRegistrationEntity.remarks}</dd>
          <dt>
            <span id="capitalizationDate">Capitalization Date</span>
          </dt>
          <dd>
            {assetRegistrationEntity.capitalizationDate ? (
              <TextFormat value={assetRegistrationEntity.capitalizationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>Placeholder</dt>
          <dd>
            {assetRegistrationEntity.placeholders
              ? assetRegistrationEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {assetRegistrationEntity.placeholders && i === assetRegistrationEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Payment Invoices</dt>
          <dd>
            {assetRegistrationEntity.paymentInvoices
              ? assetRegistrationEntity.paymentInvoices.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.invoiceNumber}</a>
                    {assetRegistrationEntity.paymentInvoices && i === assetRegistrationEntity.paymentInvoices.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Service Outlet</dt>
          <dd>
            {assetRegistrationEntity.serviceOutlets
              ? assetRegistrationEntity.serviceOutlets.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.outletCode}</a>
                    {assetRegistrationEntity.serviceOutlets && i === assetRegistrationEntity.serviceOutlets.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Settlement</dt>
          <dd>
            {assetRegistrationEntity.settlements
              ? assetRegistrationEntity.settlements.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.paymentNumber}</a>
                    {assetRegistrationEntity.settlements && i === assetRegistrationEntity.settlements.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Asset Category</dt>
          <dd>{assetRegistrationEntity.assetCategory ? assetRegistrationEntity.assetCategory.assetCategoryName : ''}</dd>
          <dt>Purchase Order</dt>
          <dd>
            {assetRegistrationEntity.purchaseOrders
              ? assetRegistrationEntity.purchaseOrders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.purchaseOrderNumber}</a>
                    {assetRegistrationEntity.purchaseOrders && i === assetRegistrationEntity.purchaseOrders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Delivery Note</dt>
          <dd>
            {assetRegistrationEntity.deliveryNotes
              ? assetRegistrationEntity.deliveryNotes.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.deliveryNoteNumber}</a>
                    {assetRegistrationEntity.deliveryNotes && i === assetRegistrationEntity.deliveryNotes.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Job Sheet</dt>
          <dd>
            {assetRegistrationEntity.jobSheets
              ? assetRegistrationEntity.jobSheets.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.serialNumber}</a>
                    {assetRegistrationEntity.jobSheets && i === assetRegistrationEntity.jobSheets.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Dealer</dt>
          <dd>{assetRegistrationEntity.dealer ? assetRegistrationEntity.dealer.dealerName : ''}</dd>
          <dt>Designated Users</dt>
          <dd>
            {assetRegistrationEntity.designatedUsers
              ? assetRegistrationEntity.designatedUsers.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.dealerName}</a>
                    {assetRegistrationEntity.designatedUsers && i === assetRegistrationEntity.designatedUsers.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Settlement Currency</dt>
          <dd>{assetRegistrationEntity.settlementCurrency ? assetRegistrationEntity.settlementCurrency.iso4217CurrencyCode : ''}</dd>
          <dt>Business Document</dt>
          <dd>
            {assetRegistrationEntity.businessDocuments
              ? assetRegistrationEntity.businessDocuments.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.documentTitle}</a>
                    {assetRegistrationEntity.businessDocuments && i === assetRegistrationEntity.businessDocuments.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Asset Warranty</dt>
          <dd>
            {assetRegistrationEntity.assetWarranties
              ? assetRegistrationEntity.assetWarranties.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {assetRegistrationEntity.assetWarranties && i === assetRegistrationEntity.assetWarranties.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Universally Unique Mapping</dt>
          <dd>
            {assetRegistrationEntity.universallyUniqueMappings
              ? assetRegistrationEntity.universallyUniqueMappings.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.universalKey}</a>
                    {assetRegistrationEntity.universallyUniqueMappings && i === assetRegistrationEntity.universallyUniqueMappings.length - 1
                      ? ''
                      : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Asset Accessory</dt>
          <dd>
            {assetRegistrationEntity.assetAccessories
              ? assetRegistrationEntity.assetAccessories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.assetDetails}</a>
                    {assetRegistrationEntity.assetAccessories && i === assetRegistrationEntity.assetAccessories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Main Service Outlet</dt>
          <dd>{assetRegistrationEntity.mainServiceOutlet ? assetRegistrationEntity.mainServiceOutlet.outletCode : ''}</dd>
        </dl>
        <Button tag={Link} to="/asset-registration" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/asset-registration/${assetRegistrationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssetRegistrationDetail;
