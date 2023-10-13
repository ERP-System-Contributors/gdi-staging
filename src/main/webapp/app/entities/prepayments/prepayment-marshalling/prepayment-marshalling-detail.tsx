import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './prepayment-marshalling.reducer';

export const PrepaymentMarshallingDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const prepaymentMarshallingEntity = useAppSelector(state => state.prepaymentMarshalling.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="prepaymentMarshallingDetailsHeading">Prepayment Marshalling</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{prepaymentMarshallingEntity.id}</dd>
          <dt>
            <span id="inactive">Inactive</span>
          </dt>
          <dd>{prepaymentMarshallingEntity.inactive ? 'true' : 'false'}</dd>
          <dt>
            <span id="amortizationCommencementDate">Amortization Commencement Date</span>
          </dt>
          <dd>
            {prepaymentMarshallingEntity.amortizationCommencementDate ? (
              <TextFormat value={prepaymentMarshallingEntity.amortizationCommencementDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="amortizationPeriods">Amortization Periods</span>
          </dt>
          <dd>{prepaymentMarshallingEntity.amortizationPeriods}</dd>
          <dt>Prepayment Account</dt>
          <dd>{prepaymentMarshallingEntity.prepaymentAccount ? prepaymentMarshallingEntity.prepaymentAccount.catalogueNumber : ''}</dd>
          <dt>Placeholder</dt>
          <dd>
            {prepaymentMarshallingEntity.placeholders
              ? prepaymentMarshallingEntity.placeholders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.description}</a>
                    {prepaymentMarshallingEntity.placeholders && i === prepaymentMarshallingEntity.placeholders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/prepayment-marshalling" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prepayment-marshalling/${prepaymentMarshallingEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PrepaymentMarshallingDetail;
