import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './card-usage-information.reducer';

export const CardUsageInformationDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const cardUsageInformationEntity = useAppSelector(state => state.cardUsageInformation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="cardUsageInformationDetailsHeading">Card Usage Information</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{cardUsageInformationEntity.id}</dd>
          <dt>
            <span id="reportingDate">Reporting Date</span>
          </dt>
          <dd>
            {cardUsageInformationEntity.reportingDate ? (
              <TextFormat value={cardUsageInformationEntity.reportingDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="totalNumberOfLiveCards">Total Number Of Live Cards</span>
          </dt>
          <dd>{cardUsageInformationEntity.totalNumberOfLiveCards}</dd>
          <dt>
            <span id="totalActiveCards">Total Active Cards</span>
          </dt>
          <dd>{cardUsageInformationEntity.totalActiveCards}</dd>
          <dt>
            <span id="totalNumberOfTransactionsDone">Total Number Of Transactions Done</span>
          </dt>
          <dd>{cardUsageInformationEntity.totalNumberOfTransactionsDone}</dd>
          <dt>
            <span id="totalValueOfTransactionsDoneInLCY">Total Value Of Transactions Done In LCY</span>
          </dt>
          <dd>{cardUsageInformationEntity.totalValueOfTransactionsDoneInLCY}</dd>
          <dt>Bank Code</dt>
          <dd>{cardUsageInformationEntity.bankCode ? cardUsageInformationEntity.bankCode.institutionName : ''}</dd>
          <dt>Card Type</dt>
          <dd>{cardUsageInformationEntity.cardType ? cardUsageInformationEntity.cardType.cardType : ''}</dd>
          <dt>Card Brand</dt>
          <dd>{cardUsageInformationEntity.cardBrand ? cardUsageInformationEntity.cardBrand.cardBrandType : ''}</dd>
          <dt>Card Category Type</dt>
          <dd>{cardUsageInformationEntity.cardCategoryType ? cardUsageInformationEntity.cardCategoryType.cardCategoryDescription : ''}</dd>
          <dt>Transaction Type</dt>
          <dd>{cardUsageInformationEntity.transactionType ? cardUsageInformationEntity.transactionType.transactionTypeDetails : ''}</dd>
          <dt>Channel Type</dt>
          <dd>{cardUsageInformationEntity.channelType ? cardUsageInformationEntity.channelType.channelTypes : ''}</dd>
          <dt>Card State</dt>
          <dd>{cardUsageInformationEntity.cardState ? cardUsageInformationEntity.cardState.cardStateFlagDetails : ''}</dd>
        </dl>
        <Button tag={Link} to="/card-usage-information" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/card-usage-information/${cardUsageInformationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CardUsageInformationDetail;
