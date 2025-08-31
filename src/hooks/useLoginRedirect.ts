import {useNavigate, useSearchParams} from 'react-router-dom';
import {navigateToUrl} from 'single-spa';

export function useLoginRedirect() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = () => {
    const app = searchParams.get('app');
    if (app) navigateToUrl(`/${app}`);
    else navigate('/apps');
  };

  return redirect;
}
