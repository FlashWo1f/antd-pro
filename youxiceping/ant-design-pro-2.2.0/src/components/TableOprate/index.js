import React from 'react';
import {
  Button,
  Upload
} from 'antd';
// import Upload from '@/components/Upload' // 测试完改回
import styles from './index.less';
import { showMessage, isArr } from '@/utils/utils';
// import IsAuthorized from '@/components/IsAuthorized';

const TableOprate = (props) => {
  const { addCallBack, importIn, exportOut, children, importArr, style = {}, auths = {} } = props;
  let { operate } = props;
  const { add } = auths;
  if (!operate) {
    operate = { add: true }
  }
  return (
    <div className={styles.tableListOperator} style={style || {}}>
      {/* <IsAuthorized auth={add}> */}
      {addCallBack ? <Button icon="plus" type="primary" onClick={addCallBack} style={{ marginLeft: '15px' }}>新增</Button> : null}
      {/* </IsAuthorized> */}
      {importIn ?
        <Upload listType='text' outDisplay='inline' accept='.xlsx,.ms-excel,.sheet' value='' showUploadList={false} actionPath={importIn.url} successDo={() => { importIn.successDo() }} fail={(reponse) => { const { error } = reponse; showMessage('error', error || '文件导入失败') }}>
          <Button type='primary' icon='cloud-upload' style={{ marginLeft: '15px' }}>{importIn.text || '导入'}</Button>
        </Upload>
        :
        null
      }
      {importArr && isArr(importArr) ?
        importArr.map((ele, i) => (
          <Upload listType='text' outDisplay='inline' key={-i} accept='.xlsx,.ms-excel,.sheet' value='' showUploadList={false} actionPath={ele.url} successDo={() => { ele.successDo(showMessage) }} fail={(reponse) => { const { error } = reponse; showMessage('error', error || '文件导入失败') }}>
            <Button type='primary' icon='cloud-upload' style={{ marginLeft: '15px' }}>{ele.text || '导入'}</Button>
          </Upload>))
        :
        null
      }
      {/* {exportOut? <Button icon='download' type="primary" style={{marginLeft: '15px'}} onClick={() => {exportOut()}}>{exportOut.text || '导出'}</Button> : null} */}
      {children}
    </div>
  )
}

TableOprate.defalutProps = {
  addCallBack: null,
  importIn: null,
  exportOut: null,
}

export default TableOprate;
