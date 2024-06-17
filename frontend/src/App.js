import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Admin/Login/Login';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import RoomList from './pages/Admin/Room/RoomList/RoomList';
import RoomPage from './pages/Admin/Room/RoomPage/RoomPage';
import SessionDetail from './pages/Admin/Session/SessionDetail/SessionDetail';
import MovieList from './pages/Admin/Movie/MovieList/MovieList';
import PrivateRoute from './components/PrivateRoute';
import { Navigate } from 'react-router-dom';
import SessionList from './pages/Admin/Session/SessionList/SessionList';
import BookingProcess from './pages/Book/BookingProcess/BookingProcess';

const App = () => {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/room/:roomID" element={<Home />} />
                <Route exact path="/admin/login" element={<Login setAuth={setIsAuth} />} />
                <Route
                    exact
                    path="/admin/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/rooms"
                    element={
                        <PrivateRoute>
                            <RoomList />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/movies"
                    element={
                        <PrivateRoute>
                            <MovieList />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/room/:roomID"
                    element={
                        <PrivateRoute>
                            <RoomPage />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/session"
                    element={
                        <PrivateRoute>
                            <SessionList />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/admin/session/:sessionID"
                    element={
                        <PrivateRoute>
                            <SessionDetail />
                        </PrivateRoute>
                    }
                />
                <Route
                    exact
                    path="/admin"
                    element={<Navigate to="/admin/login" replace />}
                />
                <Route exact path="/book" element={<BookingProcess />} />

            </Routes>
        </Router>
    );
};

export default App;
