import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Input, InputGroup, FormGroup, Form, Row, Col, Table } from 'reactstrap';
import { translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDepreciationEntry } from 'app/shared/model/assets/depreciation-entry.model';
import { searchEntities, getEntities } from './depreciation-entry.reducer';

export const DepreciationEntry = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const depreciationEntryList = useAppSelector(state => state.depreciationEntry.entities);
  const loading = useAppSelector(state => state.depreciationEntry.loading);
  const totalItems = useAppSelector(state => state.depreciationEntry.totalItems);

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
      <h2 id="depreciation-entry-heading" data-cy="DepreciationEntryHeading">
        Depreciation Entries
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link
            to="/depreciation-entry/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Depreciation Entry
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
        {depreciationEntryList && depreciationEntryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('postedAt')}>
                  Posted At <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('depreciationAmount')}>
                  Depreciation Amount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('assetNumber')}>
                  Asset Number <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Service Outlet <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Asset Category <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Depreciation Method <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Asset Registration <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Depreciation Period <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Fiscal Month <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Fiscal Quarter <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Fiscal Year <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {depreciationEntryList.map((depreciationEntry, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/depreciation-entry/${depreciationEntry.id}`} color="link" size="sm">
                      {depreciationEntry.id}
                    </Button>
                  </td>
                  <td>
                    {depreciationEntry.postedAt ? (
                      <TextFormat type="date" value={depreciationEntry.postedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{depreciationEntry.depreciationAmount}</td>
                  <td>{depreciationEntry.assetNumber}</td>
                  <td>
                    {depreciationEntry.serviceOutlet ? (
                      <Link to={`/service-outlet/${depreciationEntry.serviceOutlet.id}`}>{depreciationEntry.serviceOutlet.outletCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationEntry.assetCategory ? (
                      <Link to={`/asset-category/${depreciationEntry.assetCategory.id}`}>
                        {depreciationEntry.assetCategory.assetCategoryName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationEntry.depreciationMethod ? (
                      <Link to={`/depreciation-method/${depreciationEntry.depreciationMethod.id}`}>
                        {depreciationEntry.depreciationMethod.depreciationMethodName}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationEntry.assetRegistration ? (
                      <Link to={`/asset-registration/${depreciationEntry.assetRegistration.id}`}>
                        {depreciationEntry.assetRegistration.assetNumber}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationEntry.depreciationPeriod ? (
                      <Link to={`/depreciation-period/${depreciationEntry.depreciationPeriod.id}`}>
                        {depreciationEntry.depreciationPeriod.endDate}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationEntry.fiscalMonth ? (
                      <Link to={`/fiscal-month/${depreciationEntry.fiscalMonth.id}`}>{depreciationEntry.fiscalMonth.fiscalMonthCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationEntry.fiscalQuarter ? (
                      <Link to={`/fiscal-quarter/${depreciationEntry.fiscalQuarter.id}`}>
                        {depreciationEntry.fiscalQuarter.fiscalQuarterCode}
                      </Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {depreciationEntry.fiscalYear ? (
                      <Link to={`/fiscal-year/${depreciationEntry.fiscalYear.id}`}>{depreciationEntry.fiscalYear.fiscalYearCode}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/depreciation-entry/${depreciationEntry.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/depreciation-entry/${depreciationEntry.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/depreciation-entry/${depreciationEntry.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Depreciation Entries found</div>
        )}
      </div>
      {totalItems ? (
        <div className={depreciationEntryList && depreciationEntryList.length > 0 ? '' : 'd-none'}>
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

export default DepreciationEntry;
