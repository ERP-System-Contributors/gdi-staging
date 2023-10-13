import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExchangeRate } from 'app/shared/model/gdi-data/exchange-rate.model';
import { searchEntities, getEntities } from './exchange-rate.reducer';

export const ExchangeRate = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const exchangeRateList = useAppSelector(state => state.exchangeRate.entities);
  const loading = useAppSelector(state => state.exchangeRate.loading);
  const totalItems = useAppSelector(state => state.exchangeRate.totalItems);

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
      <h2 id="exchange-rate-heading" data-cy="ExchangeRateHeading">
        Exchange Rates
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/exchange-rate/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Exchange Rate
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
        {exchangeRateList && exchangeRateList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('businessReportingDay')}>
                  Business Reporting Day <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('buyingRate')}>
                  Buying Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sellingRate')}>
                  Selling Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('meanRate')}>
                  Mean Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('closingBidRate')}>
                  Closing Bid Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('closingOfferRate')}>
                  Closing Offer Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('usdCrossRate')}>
                  Usd Cross Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Institution Code <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Currency Code <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {exchangeRateList.map((exchangeRate, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/exchange-rate/${exchangeRate.id}`} color="link" size="sm">
                      {exchangeRate.id}
                    </Button>
                  </td>
                  <td>
                    {exchangeRate.businessReportingDay ? (
                      <TextFormat type="date" value={exchangeRate.businessReportingDay} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{exchangeRate.buyingRate}</td>
                  <td>{exchangeRate.sellingRate}</td>
                  <td>{exchangeRate.meanRate}</td>
                  <td>{exchangeRate.closingBidRate}</td>
                  <td>{exchangeRate.closingOfferRate}</td>
                  <td>{exchangeRate.usdCrossRate}</td>
                  <td>
                    {exchangeRate.institutionCode ? (
                      <Link to={`/institution-code/${exchangeRate.institutionCode.id}`}>
                        {exchangeRate.institutionCode.institutionName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {exchangeRate.currencyCode ? (
                      <Link to={`/iso-currency-code/${exchangeRate.currencyCode.id}`}>{exchangeRate.currencyCode.alphabeticCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/exchange-rate/${exchangeRate.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/exchange-rate/${exchangeRate.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/exchange-rate/${exchangeRate.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Exchange Rates found</div>
        )}
      </div>
      {totalItems ? (
        <div className={exchangeRateList && exchangeRateList.length > 0 ? '' : 'd-none'}>
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

export default ExchangeRate;
