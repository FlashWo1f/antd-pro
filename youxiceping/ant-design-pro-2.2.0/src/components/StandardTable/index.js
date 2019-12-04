import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';
import { mapToObject, isArr, isObj } from '@/utils/utils'

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  /* eslint-disable */
  constructor(props) {

    super(props);

    const { columns, defaultValue = {}, hasSequenceNum } = props;
    const { selectedRowKeys = [], selectedRows = [] } = defaultValue || {};
    if (hasSequenceNum) {
      this.unshiftColumns();
    }
    const needTotalList = initTotalList(columns, props);
    this.IsTosearch = true;
    this.state = {
      selectedRowKeys: selectedRowKeys || [],
      selectedRows: selectedRows || [],
      needTotalList,
      localPaginationData: {
        current: 1,
        pageSize: 10
      },
    };
  }

  storeRows = {}

  realTimeParams = {}

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    this.triggerPropsSelectRow(selectedRowKeys, selectedRows);
    this.setState({ selectedRowKeys, needTotalList, selectedRows });

  };

  getSelectedRowsByKeys = (selectedRowKeys, selectedRows) => {
    const { defaultValue = {}, keyName } = this.props;
    if (selectedRowKeys.length === selectedRows.length) return selectedRows;
    const selectedRowMap = mapToObject(selectedRows, keyName) || {};
    const defalutSelectedRowMap = mapToObject(defaultValue.selectedRows, keyName) || {};
    return selectedRowKeys.map(ele => selectedRowMap[ele] || this.storeRows[ele] || defalutSelectedRowMap[ele])
  }

  triggerPropsSelectRow = (selectedRowKeys, selectedRows) => {
    const { onSelectRow } = this.props;
    const data = this.getSelectedRowsByKeys(selectedRowKeys, selectedRows);
    if (onSelectRow) {
      onSelectRow(selectedRowKeys, data);
    }
  }

  getSorterMap = (sorter) => {
    const { sorterMap } = this.props;
    const { field, order } = sorter;
    if (!isObj(sorterMap) || !sorterMap.name || !sorterMap[field]) {
      return { [field]: order };
    }

    const { name } = sorterMap;
    return { [name]: sorterMap[field][order] }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { realTimeParams } = this;
    const { localPagination, toSearch, sorterMap } = this.props;
    const { current, pageSize } = pagination;
    const { field } = sorter;

    let extend = {};
    if (field) {
      const data = this.getSorterMap(sorter);
      extend = { ...extend, ...data }
    }
    // 默认传个空字符串给后台，不会有影响
    if (!field && isObj(sorterMap)) {
      const { name, defaultValue } = sorterMap;
      extend = name ? { [name]: defaultValue || '' } : {}
    }

    toSearch({ pageNo: current, pageSize, ...realTimeParams, ...extend })
    window.scrollTo({ top: 100 })
    if (localPagination) {
      this.setState({ localPaginationData: { pageSize, current } });
    }
  };

  cleanSelectedKeys = () => {
    const { defaultValue = {}, disabledKey, keyName } = this.props;
    const { selectedRows = [] } = defaultValue;
    const disabledRow = selectedRows.filter(ele => ele[disabledKey || 'disabled']);
    const keys = disabledRow.map(ele => ele[keyName || 'id']);

    this.handleRowSelectChange(keys, []);
  };

  unshiftColumns = () => {
    const { columns, ordinalWidth = 70 } = this.props;
    if (columns[0].key === 'id' && columns[0].title === '序号') {
      columns.shift();
    }
    columns.unshift({
      title: '序号',
      width: ordinalWidth,
      key: 'id',
      render: this.renderColumns()
    });
    return columns;
  }

  cancelSelectedOne = (removeId) => {
    const { keyName } = this.props;
    const { selectedRowKeys, selectedRows } = this.state;
    const rowkeys = selectedRowKeys.filter(ele => `${ele}` !== `${removeId}`)
    const rows = selectedRows.filter(ele => `${ele[keyName]}` !== `${removeId}`)
    this.setState({ selectedRowKeys: rowkeys, selectedRows: rows });
    this.triggerPropsSelectRow(rowkeys, rows);
  }

  renderColumns() {
    return (col, record, index) => {
      let { data: { pagination = {} } } = this.props;
      const { localPagination } = this.props;
      const { localPaginationData } = this.state;
      if (localPagination) {
        pagination = localPaginationData
      }
      const { current = 1, pageSize = 10 } = pagination || {};
      return (current - 1) * pageSize + index + 1;
    }
  }

  // 对加载数据的保存 
  refreshStoreRows = (list, keyName) => {
    if (!keyName) return;
    const store = this.storeRows;
    if (!isArr(list)) return;
    list.forEach(ele => {
      store[ele[keyName]] = ele;
    })
  }

  render() {
    const { selectedRowKeys, needTotalList, selectedRows } = this.state;
    const { renderSelectedRows } = this.props;
    const { data = {}, rowKey, numberDes, noClear, keyName, disabledKey, disabledKeys = [], hideTotal, showAlert, myPagination, toSearch, localPagination, hasSequenceNum, showSelectedRows, ...rest } = this.props;
    const { list = [], pagination = {} } = data;
    this.refreshStoreRows(list, keyName);
    const other = {};
    if (hasSequenceNum) {
      other.columns = this.unshiftColumns();
    }
    let paginationProps = {
      pageSizeOptions: ['10', '20', '50', '100'],
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: (pageNo, pageSize) => {
        this.realTimeParams = { pageNo, pageSize };
      },
      onShowSizeChange: (current, pageSize) => {
        this.realTimeParams = { pageNo: 1, pageSize };
      },
      showTotal: (total) => `共 ${total} 条`,
      ...pagination,
      ...myPagination,// 自定义 比如不需要显示当前pageSize showSizeChanger=false
    };

    if (localPagination) {
      paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: (total) => `共 ${total} 条`,
      }
    }

    if (hideTotal) {
      delete paginationProps.showTotal
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record[disabledKey || 'disabled'] || disabledKeys.indexOf(record[keyName]) !== -1,
      }),
    };
    return (
      <div className={styles.standardTable}>
        <div className={showAlert ? styles.tableAlert : 'dn'}>
          <Alert
            style={{ backgroundColor: 'rgba(111, 0, 255, 0.1)' }}
            message={
              <Fragment>
                已选择 {numberDes || ''} <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                {noClear ? '' : <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}> 清空</a>}
              </Fragment>
            }
            type="info"
            showIcon
          />
          <div className={selectedRowKeys && selectedRowKeys.length ? 'showSelected' : 'dn'} style={{ padding: '0px 15px' }}>
            {
              renderSelectedRows && renderSelectedRows(selectedRows, (rowData) => { this.cancelSelectedOne(rowData) })
            }
          </div>
        </div>
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={showSelectedRows ? rowSelection : null}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
          {...other}
        />
      </div>
    );
  }
}

StandardTable.defaultProps = {
  keyName: 'id',
  disabledKeys: [],
  sorterMap: {},
}

export default StandardTable;