import {HomeLayout} from '@/layouts/home.layout';
import {Route, Routes} from 'react-router-dom';

export function RootRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<HomeLayout />}></Route>
    </Routes>
  );
}
