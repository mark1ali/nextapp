

import EditCompanyForm from '@/components/EditCompanyForm';
import { getCompany } from '@/lib/allRoutes';

export default async function EditCompany({ params}) {
  const { companyId } = await params;
  console.log("companyId....")
  console.log(companyId)
  const company = await getCompany(companyId);
  const companyData = company[0];
  console.log(companyData)

  

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <EditCompanyForm companyData = {companyData} companyId={companyId}/>
    </div>
  );
}
