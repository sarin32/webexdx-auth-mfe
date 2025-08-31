import Apps from '@/pages/apps';
import {Login} from '@/pages/login';
import {Signup} from '@/pages/signup';
import {Route, Routes} from 'react-router-dom';

export function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/apps" element={<Apps />}></Route>
    </Routes>
  );
}
