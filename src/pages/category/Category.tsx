import CommonTab from '../../components/common/CommonTab'
import { categoryConfig } from './categoryConfig'

const Category = () => {
  return (
   <CommonTab tabs={categoryConfig.tabs} moduleConfig={categoryConfig}/>
   
  )
}

export default Category