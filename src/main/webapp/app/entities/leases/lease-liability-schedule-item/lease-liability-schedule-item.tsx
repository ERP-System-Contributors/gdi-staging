import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILeaseLiabilityScheduleItem } from 'app/shared/model/leases/lease-liability-schedule-item.model';
import { searchEntities, getEntities } from './lease-liability-schedule-item.reducer';

export const LeaseLiabilityScheduleItem = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const leaseLiabilityScheduleItemList = useAppSelector(state => state.leaseLiabilityScheduleItem.entities);
  const loading = useAppSelector(state => state.leaseLiabilityScheduleItem.loading);
  const totalItems = useAppSelector(state => state.leaseLiabilityScheduleItem.totalItems);

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
      <h2 id="lease-liability-schedule-item-heading" data-cy="LeaseLiabilityScheduleItemHeading">
        Lease Liability Schedule Items
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/lease-liability-schedule-item/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Lease Liability Schedule Item
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
        {leaseLiabilityScheduleItemList && leaseLiabilityScheduleItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('sequenceNumber')}>
                  Sequence Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('periodIncluded')}>
                  Period Included <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('periodStartDate')}>
                  Period Start Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('periodEndDate')}>
                  Period End Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('openingBalance')}>
                  Opening Balance <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cashPayment')}>
                  Cash Payment <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('principalPayment')}>
                  Principal Payment <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('interestPayment')}>
                  Interest Payment <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('outstandingBalance')}>
                  Outstanding Balance <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('interestPayableOpening')}>
                  Interest Payable Opening <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('interestExpenseAccrued')}>
                  Interest Expense Accrued <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('interestPayableBalance')}>
                  Interest Payable Balance <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Lease Contract <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Lease Model Metadata <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {leaseLiabilityScheduleItemList.map((leaseLiabilityScheduleItem, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/lease-liability-schedule-item/${leaseLiabilityScheduleItem.id}`} color="link" size="sm">
                      {leaseLiabilityScheduleItem.id}
                    </Button>
                  </td>
                  <td>{leaseLiabilityScheduleItem.sequenceNumber}</td>
                  <td>{leaseLiabilityScheduleItem.periodIncluded ? 'true' : 'false'}</td>
                  <td>
                    {leaseLiabilityScheduleItem.periodStartDate ? (
                      <TextFormat type="date" value={leaseLiabilityScheduleItem.periodStartDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {leaseLiabilityScheduleItem.periodEndDate ? (
                      <TextFormat type="date" value={leaseLiabilityScheduleItem.periodEndDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{leaseLiabilityScheduleItem.openingBalance}</td>
                  <td>{leaseLiabilityScheduleItem.cashPayment}</td>
                  <td>{leaseLiabilityScheduleItem.principalPayment}</td>
                  <td>{leaseLiabilityScheduleItem.interestPayment}</td>
                  <td>{leaseLiabilityScheduleItem.outstandingBalance}</td>
                  <td>{leaseLiabilityScheduleItem.interestPayableOpening}</td>
                  <td>{leaseLiabilityScheduleItem.interestExpenseAccrued}</td>
                  <td>{leaseLiabilityScheduleItem.interestPayableBalance}</td>
                  <td>
                    {leaseLiabilityScheduleItem.leaseContract ? (
                      <Link to={`/lease-contract/${leaseLiabilityScheduleItem.leaseContract.id}`}>
                        {leaseLiabilityScheduleItem.leaseContract.bookingId}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {leaseLiabilityScheduleItem.leaseModelMetadata ? (
                      <Link to={`/lease-model-metadata/${leaseLiabilityScheduleItem.leaseModelMetadata.id}`}>
                        {leaseLiabilityScheduleItem.leaseModelMetadata.modelTitle}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/lease-liability-schedule-item/${leaseLiabilityScheduleItem.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/lease-liability-schedule-item/${leaseLiabilityScheduleItem.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/lease-liability-schedule-item/${leaseLiabilityScheduleItem.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Lease Liability Schedule Items found</div>
        )}
      </div>
      {totalItems ? (
        <div className={leaseLiabilityScheduleItemList && leaseLiabilityScheduleItemList.length > 0 ? '' : 'd-none'}>
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

export default LeaseLiabilityScheduleItem;
