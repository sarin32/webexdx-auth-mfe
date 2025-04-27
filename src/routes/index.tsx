import {HomeLayout} from '@/layouts/home.layout';
import {Route, Routes} from 'react-router-dom';

export function RootRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<HomeLayout />}></Route>
    </Routes>
  );
}
