import CommonTab from '../../components/common/CommonTab'
import { subCategoryConfig } from './subCategoryConfig'

const SubCategory = () => {
  return (
    <CommonTab tabs={subCategoryConfig.tabs} moduleConfig={subCategoryConfig}/>
  )
}

export default SubCategory