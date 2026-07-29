import { useParams, Navigate } from 'react-router-dom';
import { getModule } from '@/lib/unp/modules';
import ModuleCrud from '@/components/unp/ModuleCrud';
import SEO from '@/components/seo/SEO';

const UnpModulePage = () => {
  const { moduleId } = useParams();
  const module = getModule(moduleId);

  if (!module) return <Navigate to="/unp" replace />;

  return (
    <>
      <SEO
        title={`${module.label} | Ubuntu NGO Platform`}
        description={module.description}
        path={`/unp/m/${module.id}`}
        noindex
      />
      <ModuleCrud key={module.id} module={module} />
    </>
  );
};

export default UnpModulePage;
