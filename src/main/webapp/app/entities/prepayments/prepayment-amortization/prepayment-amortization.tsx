import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPrepaymentAmortization } from 'app/shared/model/prepayments/prepayment-amortization.model';
import { searchEntities, getEntities } from './prepayment-amortization.reducer';

export const PrepaymentAmortization = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const prepaymentAmortizationList = useAppSelector(state => state.prepaymentAmortization.entities);
  const loading = useAppSelector(state => state.prepaymentAmortization.loading);
  const totalItems = useAppSelector(state => state.prepaymentAmortization.totalItems);

  const getAllEntities = () => {
    if (search) {
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    } else {
      dispatch(
        getEntities({
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
  };

  const startSearching = e => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      dispatch(
        searchEntities({
          query: search,
          page: paginationState.activePage - 1,
          size: paginationState.itemsPerPage,
          sort: `${paginationState.sort},${paginationState.order}`,
        })
      );
    }
    e.preventDefault();
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    sortEntities();
  };

  return (
    <div>
      <h2 id="prepayment-amortization-heading" data-cy="PrepaymentAmortizationHeading">
        Prepayment Amortizations
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/prepayment-amortization/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Prepayment Amortization
          </Link>
        </div>
      </h2>
      <Row>
        <Col sm="12">
          <Form onSubmit={startSearching}>
            <FormGroup>
              <InputGroup>
                <Input type="text" name="search" defaultValue={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <div className="table-responsive">
        {prepaymentAmortizationList && prepaymentAmortizationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prepaymentPeriod')}>
                  Prepayment Period <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('prepaymentAmount')}>
                  Prepayment Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('inactive')}>
                  Inactive <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Prepayment Account <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Settlement Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Debit Account <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Credit Account <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {prepaymentAmortizationList.map((prepaymentAmortization, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/prepayment-amortization/${prepaymentAmortization.id}`} color="link" size="sm">
                      {prepaymentAmortization.id}
                    </Button>
                  </td>
                  <td>{prepaymentAmortization.description}</td>
                  <td>
                    {prepaymentAmortization.prepaymentPeriod ? (
                      <TextFormat type="date" value={prepaymentAmortization.prepaymentPeriod} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{prepaymentAmortization.prepaymentAmount}</td>
                  <td>{prepaymentAmortization.inactive ? 'true' : 'false'}</td>
                  <td>
                    {prepaymentAmortization.prepaymentAccount ? (
                      <Link to={`/prepayment-account/${prepaymentAmortization.prepaymentAccount.id}`}>
                        {prepaymentAmortization.prepaymentAccount.catalogueNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prepaymentAmortization.settlementCurrency ? (
                      <Link to={`/settlement-currency/${prepaymentAmortization.settlementCurrency.id}`}>
                        {prepaymentAmortization.settlementCurrency.iso4217CurrencyCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prepaymentAmortization.debitAccount ? (
                      <Link to={`/transaction-account/${prepaymentAmortization.debitAccount.id}`}>
                        {prepaymentAmortization.debitAccount.accountNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {prepaymentAmortization.creditAccount ? (
                      <Link to={`/transaction-account/${prepaymentAmortization.creditAccount.id}`}>
                        {prepaymentAmortization.creditAccount.accountNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/prepayment-amortization/${prepaymentAmortization.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/prepayment-amortization/${prepaymentAmortization.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/prepayment-amortization/${prepaymentAmortization.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Prepayment Amortizations found</div>
        )}
      </div>
      {totalItems ? (
        <div className={prepaymentAmortizationList && prepaymentAmortizationList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default PrepaymentAmortization;
